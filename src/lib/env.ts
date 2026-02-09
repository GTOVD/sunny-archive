import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: z.string().min(1, "Shopify Store Domain is required"),
  NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN: z.string().min(1, "Shopify Storefront API Token is required"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid environment variables:", JSON.stringify(env.error.format(), null, 2));
  throw new Error("Invalid environment variables");
}

export const envVars = env.data;
