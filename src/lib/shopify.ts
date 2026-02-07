import { createStorefrontClient } from "@shopify/hydrogen-react";

const client = createStorefrontClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'sunny-archive.myshopify.com',
  publicStorefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN || 'placeholder',
  storefrontApiVersion: "2024-01",
});

export const getStorefrontApiUrl = client.getStorefrontApiUrl;
export const getPublicTokenHeaders = client.getPublicTokenHeaders;

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

  const response = await fetch(getStorefrontApiUrl(), {
    method: "POST",
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query,
      variables: {
        input: {
          lineItems: [{ variantId, quantity: 1 }],
        },
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors || data?.checkoutCreate?.checkoutUserErrors?.length > 0) {
    console.error("Shopify Checkout Error:", errors || data.checkoutCreate.checkoutUserErrors);
    throw new Error("Failed to create checkout");
  }

  return data.checkoutCreate.checkout.webUrl;
}
