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

async function storefrontFetch(query: string, variables = {}) {
  // Guard against missing environment variables during build phase
  if (!envVars.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || !envVars.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN) {
    console.warn("⚠️ Shopify environment variables missing. Returning empty data for build.");
    return { data: null };
  }

  try {
    const response = await fetch(getStorefrontApiUrl(), {
      method: "POST",
      headers: getPublicTokenHeaders(),
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      console.warn(`⚠️ Shopify API fetch failed with status ${response.status}. Returning empty data.`);
      return { data: null };
    }

    return response.json();
  } catch (error) {
    console.error("❌ Shopify Fetch Error (Supressed for Build):", error);
    return { data: null };
  }
}

export async function getProduct(handle: string) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
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
        variants(first: 1) {
          nodes {
            id
            title
          }
        }
      }
    }
  `;

  const { data, errors } = await storefrontFetch(query, { handle });

  if (errors) {
    console.warn(`⚠️ Shopify API Errors: ${JSON.stringify(errors)}`);
    return null;
  }

  if (!data?.product) {
    return null;
  }

  return ShopifyProductSchema.parse(data.product);
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
