import { createStorefrontClient } from "@shopify/hydrogen-react";
import { ShopifyCheckoutSchema, ShopifyProductSchema } from "./schema";
import { envVars } from "./env";

const client = createStorefrontClient({
  storeDomain: envVars.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  publicStorefrontToken: envVars.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN,
  storefrontApiVersion: "2024-01",
});

export const getStorefrontApiUrl = client.getStorefrontApiUrl;
export const getPublicTokenHeaders = client.getPublicTokenHeaders;

async function storefrontFetch(query: string, variables = {}) {
  const response = await fetch(getStorefrontApiUrl(), {
    method: "POST",
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
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
    throw new Error(`Shopify API Errors: ${JSON.stringify(errors)}`);
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
    console.error("Shopify Checkout Error:", errors || data.checkoutCreate.checkoutUserErrors);
    throw new Error("Failed to create checkout");
  }

  const validated = ShopifyCheckoutSchema.parse(data.checkoutCreate.checkout);
  return validated.webUrl;
}
