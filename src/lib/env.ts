import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: z.string().default(""),
  NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN: z.string().default(""),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid environment variables:", JSON.stringify(env.error.format(), null, 2));
  // During build on Vercel, some vars might be missing. We warn instead of crashing.
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    console.warn("⚠️ Build phase detected with invalid/missing env vars. Proceeding anyway.");
  } else {
    throw new Error("Invalid environment variables");
  }
}

export const envVars = env.success ? env.data : envSchema.parse({});
