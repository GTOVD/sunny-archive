import { MetadataSchema, ArchiveItemSchema, type ArchiveItem } from "./schema";
import crypto from "crypto";

export class ArchiveLoader {
  static generateChecksum(data: string): string {
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  static parse(rawData: string, source: string): ArchiveItem {
    const json = JSON.parse(rawData);
    const checksum = this.generateChecksum(rawData);

    const metadata = {
      id: json.id || crypto.randomUUID(),
      source,
      date: new Date().toISOString(),
      tags: json.tags || [],
      checksum,
    };

    return ArchiveItemSchema.parse({
      metadata,
      content: json,
    });
  }
}
