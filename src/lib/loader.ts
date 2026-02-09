import { MetadataSchema, ArchiveItemSchema, type ArchiveItem } from "./schema";
import { CASProvider } from "./cas";
import crypto from "crypto";

export class ArchiveLoader {
  static generateChecksum(data: string): string {
    return CASProvider.hash(data);
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
