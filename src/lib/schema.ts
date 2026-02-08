import { z } from "zod";

export const MetadataSchema = z.object({
  id: z.string(),
  source: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  checksum: z.string().optional(),
  version: z.string().default("1.0.0"),
});

export type Metadata = z.infer<typeof MetadataSchema>;

export const ArchiveItemSchema = z.object({
  metadata: MetadataSchema,
  content: z.record(z.string(), z.any()),
});

export type ArchiveItem = z.infer<typeof ArchiveItemSchema>;
