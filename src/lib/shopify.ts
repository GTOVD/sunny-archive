import { createStorefrontClient } from "@shopify/hydrogen-react";
import { ShopifyCheckoutSchema, ShopifyProductSchema } from "./schema";
import { envVars } from "./env";
import { CircuitBreaker } from "./recovery";

const client = createStorefrontClient({
  storeDomain: envVars.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "placeholder.myshopify.com",
  publicStorefrontToken: envVars.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN || "placeholder",
  storefrontApiVersion: "2024-01",
});

export const getStorefrontApiUrl = client.getStorefrontApiUrl;
export const getPublicTokenHeaders = client.getPublicTokenHeaders;

// Initialize Circuit Breaker for Shopify Storefront API
const shopifyCircuitBreaker = new CircuitBreaker(5, 30000); // 5 failures, 30s cooldown

/**
 * Type-safe result wrapper for API responses.
 * Follows the "Luxury Boutique" standard for structured error handling.
 */
export type FetchResult<T> = 
  | { data: T; error: null; ok: true }
  | { data: null; error: string; ok: false };

/**
 * Core Shopify Storefront API Fetch Wrapper
 * Implements architectural resilience (timeouts, retries, circuit breakers) for distributed edge environments.
 */
export async function storefrontFetch<T>(
  query: string,
  variables = {},
  options: { timeout?: number; retries?: number } = { timeout: 10000, retries: 3 }
): Promise<FetchResult<T>> {
  // Guard against missing environment variables during build phase
  if (!envVars.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || !envVars.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN) {
    console.warn("⚠️ Shopify environment variables missing. Returning empty data for build.");
    return { data: null, error: "Missing environment variables", ok: false };
  }

  const { timeout = 10000, retries = 3 } = options;

  try {
    return await shopifyCircuitBreaker.execute(async () => {
      for (let attempt = 0; attempt <= retries; attempt++) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
          const response = await fetch(getStorefrontApiUrl(), {
            method: "POST",
            headers: getPublicTokenHeaders(),
            body: JSON.stringify({ query, variables }),
            signal: controller.signal,
          });

          clearTimeout(id);

          if (!response.ok) {
            const status = response.status;
            // Retry on 5xx errors or 429 Rate Limits
            if ((status >= 500 || status === 429) && attempt < retries) {
              const delay = 1000 * Math.pow(2, attempt);
              console.warn(`⚠️ Shopify API status ${status}. Retrying in ${delay}ms (${attempt + 1}/${retries})...`);
              await new Promise((resolve) => setTimeout(resolve, delay));
              continue;
            }
            // Non-retryable error
            throw new Error(`Shopify API status ${status}`);
          }

          const json = await response.json();
          
          if (json.errors) {
            throw new Error(json.errors[0]?.message || "GraphQL Error");
          }

          return { data: json.data as T, error: null, ok: true };

        } catch (error: any) {
          clearTimeout(id);
          
          const isTimeout = error.name === 'AbortError';
          const errorMessage = isTimeout ? 'Request timeout' : (error.message || 'Unknown network error');
          
          if (attempt < retries) {
            const delay = 1000 * Math.pow(2, attempt);
            console.warn(`⚠️ Shopify Fetch ${isTimeout ? 'Timeout' : 'Error'}. Retrying in ${delay}ms (${attempt + 1}/${retries})...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            continue;
          }

          // If we exhausted retries, throw to trigger circuit breaker handleFailure
          throw new Error(errorMessage);
        }
      }

      throw new Error("Exceeded maximum retry attempts");
    });
  } catch (error: any) {
    console.error("❌ Shopify Fetch Failure:", error.message);
    return { data: null, error: error.message, ok: false };
  }
}

export async function getProducts(limit: number = 10) {
  const query = `
    query getProducts($limit: Int!) {
      products(first: $limit) {
        nodes {
          id
          title
          handle
          description
          images(first: 1) {
            nodes {
              url
              altText
              width
              height
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            nodes {
              id
            }
          }
        }
      }
    }
  `;

  const { data, error, ok } = await storefrontFetch<{ products: { nodes: any[] } }>(query, { limit });

  if (!ok) {
    console.warn(`⚠️ Shopify API Errors: ${error}`);
    return [];
  }

  if (!data?.products?.nodes) {
    return [];
  }

  return data.products.nodes.map((product: any) => ShopifyProductSchema.parse(product));
}

export async function createCheckout(variantId: string) {
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          webUrl
        }
        checkoutUserErrors {
          message
          field
        }
      }
    }
  `;

  const { data, error, ok } = await storefrontFetch<any>(query, {
    input: {
      lineItems: [{ variantId, quantity: 1 }],
    },
  });

  if (!ok) {
    console.error("Shopify Fetch Error:", error);
    return null;
  }

  if (data?.checkoutCreate?.checkoutUserErrors?.length > 0) {
    console.error("Shopify Checkout User Error:", data.checkoutCreate.checkoutUserErrors);
    return null;
  }

  if (!data?.checkoutCreate?.checkout) {
    return null;
  }

  const validated = ShopifyCheckoutSchema.parse(data.checkoutCreate.checkout);
  return validated.webUrl;
}

export async function createWaitlistCustomer(email: string) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
        }
        customerUserErrors {
          message
          field
        }
      }
    }
  `;

  // We create a customer with a specific tag to mark them as waitlisted
  // Note: Storefront API customerCreate requires a password. 
  // We'll generate a random secure password as they are just signing up for a waitlist
  // and will likely reset it or use a different flow later.
  // Alternatively, we could use a metaobject if defined.
  // For now, we'll use customer creation with a tag.
  const password = Math.random().toString(36).slice(-8) + "Aa1!";

  const { data, error, ok } = await storefrontFetch<any>(query, {
    input: {
      email,
      password,
      tags: ["WAITLIST", "TREASURY_WAITLIST"],
      acceptsMarketing: true
    },
  });

  if (!ok) {
    console.error("Shopify Waitlist Error:", error);
    return { success: false, error: error };
  }

  if (data?.customerCreate?.customerUserErrors?.length > 0) {
    const errors = data.customerCreate.customerUserErrors.map((e: any) => e.message).join(", ");
    console.error("Shopify Waitlist User Error:", errors);
    return { success: false, error: errors };
  }

  if (!data?.customerCreate?.customer) {
    return { success: false, error: "Unknown error" };
  }

  return { success: true, customer: data.customerCreate.customer };
}

export async function getProductByHandle(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        images(first: 5) {
          nodes {
            url
            altText
            width
            height
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 5) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const { data, error, ok } = await storefrontFetch<{ product: any }>(query, { handle });

  if (!ok) {
    console.warn(`⚠️ Shopify API Errors: ${error}`);
    return null;
  }

  if (!data?.product) {
    return null;
  }

  // Note: We might need to adjust ShopifyProductSchema if it doesn't include descriptionHtml or multiple images
  return data.product;
}
