import { getProducts } from './shopify';

/**
 * Metadata Extraction logic for the Hacking Terminal
 * Extracts high-entropy words (length 4-12) from live Shopify artifact metadata.
 */

export async function getLoreBuffer(): Promise<string[]> {
  const products = await getProducts(50);
  
  if (!products || products.length === 0) {
    console.warn("⚠️ No live artifacts found for buffer extraction.");
    return [];
  }

  const wordSet = new Set<string>();
  const wordRegex = /[A-Z]{4,12}/gi;

  products.forEach(product => {
    const text = `${product.title} ${product.description}`;
    const matches = text.match(wordRegex);
    
    if (matches) {
      matches.forEach(word => {
        const cleaned = word.toUpperCase();
        if (cleaned.length >= 4 && cleaned.length <= 12) {
          wordSet.add(cleaned);
        }
      });
    }
  });

  return Array.from(wordSet);
}

/**
 * Word Selection Engine
 * Filters the buffer for words matching difficulty length constraints.
 */
export function selectWordsForGame(buffer: string[], length: number, count: number): string[] {
  const pool = buffer.filter(w => w.length === length);
  
  // Graceful fallback if not enough words of exact length
  if (pool.length < count) {
    const fallback = buffer.filter(w => Math.abs(w.length - length) <= 1);
    return fallback.sort(() => Math.random() - 0.5).slice(0, count);
  }

  return pool.sort(() => Math.random() - 0.5).slice(0, count);
}
