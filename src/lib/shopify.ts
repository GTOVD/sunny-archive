import { createStorefrontClient } from "@shopify/hydrogen-react";
import { ShopifyCheckoutSchema, ShopifyProductSchema } from "./schema";
import { envVars } from "./env";

const client = createStorefrontClient({
  storeDomain: envVars.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "placeholder.myshopify.com",
  publicStorefrontToken: envVars.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN || "placeholder",
  storefrontApiVersion: "2024-01",
});

export const getStorefrontApiUrl = client.getStorefrontApiUrl;
export const getPublicTokenHeaders = client.getPublicTokenHeaders;

/**
 * Core Shopify Storefront API Fetch Wrapper
 * Implements architectural resilience (timeouts, retries) for distributed edge environments.
 */
async function storefrontFetch(
  query: string,
  variables = {},
  options: { timeout?: number; retries?: number } = { timeout: 10000, retries: 3 }
) {
  // Guard against missing environment variables during build phase
  if (!envVars.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || !envVars.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN) {
    console.warn("⚠️ Shopify environment variables missing. Returning empty data for build.");
    return { data: null };
  }

  const { timeout = 10000, retries = 3 } = options;

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
        // Retry on 5xx errors or 429 Rate Limits
        if ((response.status >= 500 || response.status === 429) && attempt < retries) {
          console.warn(`⚠️ Shopify API status ${response.status}. Retrying (${attempt + 1}/${retries})...`);
          await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt))); // Exponential backoff
          continue;
        }
        console.warn(`⚠️ Shopify API fetch failed with status ${response.status}. Returning empty data.`);
        return { data: null };
      }

      return await response.json();
    } catch (error: any) {
      clearTimeout(id);
      
      const isTimeout = error.name === 'AbortError';
      
      if (attempt < retries) {
        console.warn(`⚠️ Shopify Fetch ${isTimeout ? 'Timeout' : 'Error'}. Retrying (${attempt + 1}/${retries})...`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        continue;
      }

      console.error("❌ Shopify Fetch Error (Supressed for Build):", error);
      return { data: null };
    }
  }

  return { data: null };
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

  const { data, errors } = await storefrontFetch(query, { limit });

  if (errors) {
    console.warn(`⚠️ Shopify API Errors: ${JSON.stringify(errors)}`);
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

  const { data, errors } = await storefrontFetch(query, {
    input: {
      lineItems: [{ variantId, quantity: 1 }],
    },
  });

  if (errors || data?.checkoutCreate?.checkoutUserErrors?.length > 0) {
    console.error("Shopify Checkout Error:", errors || data?.checkoutCreate?.checkoutUserErrors);
    return null;
  }

  if (!data?.checkoutCreate?.checkout) {
    return null;
  }

  const validated = ShopifyCheckoutSchema.parse(data.checkoutCreate.checkout);
  return validated.webUrl;
}
