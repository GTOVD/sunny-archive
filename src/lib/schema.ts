import { z } from "zod";

/**
 * Metadata for archived artifacts.
 */
export const MetadataSchema = z.object({
  id: z.string(),
  source: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  checksum: z.string().optional(),
  version: z.string().default("1.0.0"),
});

export type Metadata = z.infer<typeof MetadataSchema>;

/**
 * Generic Archive Item
 */
export const ArchiveItemSchema = z.object({
  metadata: MetadataSchema,
  content: z.record(z.string(), z.any()),
});

export type ArchiveItem = z.infer<typeof ArchiveItemSchema>;

/**
 * Shopify Storefront API Schemas
 */

export const ShopifyImageSchema = z.object({
  url: z.string().url(),
  altText: z.string().nullable().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const ShopifyPriceSchema = z.object({
  amount: z.string(),
  currencyCode: z.string(),
});

export const ShopifyProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  handle: z.string(),
  description: z.string(),
  descriptionHtml: z.string().optional(),
  images: z.object({
    nodes: z.array(ShopifyImageSchema),
  }),
  priceRange: z.object({
    minVariantPrice: ShopifyPriceSchema,
  }),
  variants: z.object({
    nodes: z.array(z.object({
      id: z.string(),
      title: z.string(),
      availableForSale: z.boolean().optional(),
      price: ShopifyPriceSchema.optional(),
    })),
  }),
});

export type ShopifyProduct = z.infer<typeof ShopifyProductSchema>;

export const ShopifyCollectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  handle: z.string(),
  description: z.string(),
  products: z.object({
    nodes: z.array(ShopifyProductSchema),
  }),
});

export type ShopifyCollection = z.infer<typeof ShopifyCollectionSchema>;

export const ShopifyCheckoutSchema = z.object({
  webUrl: z.string().url(),
});

export type ShopifyCheckout = z.infer<typeof ShopifyCheckoutSchema>;
