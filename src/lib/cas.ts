import crypto from "crypto";

/**
 * Utility for Content-Addressable Storage (CAS) operations.
 * Implements ARCH-011: Standardizing artifact addressing via SHA-256.
 */
export class CASProvider {
  /**
   * Generates a stable hash for a given content string.
   * Standardizes on SHA-256 for archive artifacts.
   */
  static hash(content: string): string {
    return crypto.createHash("sha256").update(content).digest("hex");
  }

  /**
   * Formats a path for storage based on the hash.
   * Uses a 2-level prefixing (e.g., ab/cd/hash) to avoid directory saturation.
   */
  static getStoragePath(hash: string, extension: string = "json"): string {
    const prefix1 = hash.substring(0, 2);
    const prefix2 = hash.substring(2, 4);
    return `artifacts/${prefix1}/${prefix2}/${hash}.${extension}`;
  }

  /**
   * Validates if the content matches the provided hash.
   */
  static verify(content: string, expectedHash: string): boolean {
    return this.hash(content) === expectedHash;
  }
}
