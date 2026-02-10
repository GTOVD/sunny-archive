import { z } from "zod";
import { 
  ShopifyProductSchema, 
  ShopifyCheckoutSchema 
} from "../schema";

/**
 * Shopify Webhook Schemas (Common Topics)
 * Note: Webhook payloads slightly differ from Storefront API nodes.
 */

export const WebhookBaseSchema = z.object({
  id: z.number(),
  admin_graphql_api_id: z.string().optional(),
});

export const ProductWebhookSchema = WebhookBaseSchema.extend({
  title: z.string(),
  handle: z.string(),
  vendor: z.string(),
  product_type: z.string(),
  updated_at: z.string(),
  variants: z.array(z.object({
    id: z.number(),
    title: z.string(),
    price: z.string(),
    sku: z.string().nullable(),
  })),
  images: z.array(z.object({
    id: z.number(),
    src: z.string().url(),
  })),
});

export const InventoryWebhookSchema = WebhookBaseSchema.extend({
  inventory_item_id: z.number(),
  location_id: z.number(),
  available: z.number(),
  updated_at: z.string(),
});

export const OrderWebhookSchema = WebhookBaseSchema.extend({
  email: z.string().email().nullable(),
  total_price: z.string(),
  currency: z.string(),
  financial_status: z.string(),
  line_items: z.array(z.object({
    id: z.number(),
    title: z.string(),
    quantity: z.number(),
    price: z.string(),
  })),
  customer: z.object({
    id: z.number(),
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    email: z.string().email().nullable(),
  }).optional(),
});

export type ProductWebhook = z.infer<typeof ProductWebhookSchema>;
export type InventoryWebhook = z.infer<typeof InventoryWebhookSchema>;
export type OrderWebhook = z.infer<typeof OrderWebhookSchema>;
