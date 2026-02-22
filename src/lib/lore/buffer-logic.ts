import { getProducts } from './shopify';

let cachedBuffer: string[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

/**
 * High-Entropy Word Extraction Utility
 * Extracts and cleans words from Shopify artifact metadata for the hacking terminal.
 * Includes a simple in-memory cache layer to ensure session consistency.
 */
export async function getLoreBufferWords(forceRefresh = false): Promise<string[]> {
  const now = Date.now();
  
  if (!forceRefresh && cachedBuffer && (now - lastFetchTime < CACHE_TTL)) {
    console.log("📡 Lore Buffer: Returning cached word buffer.");
    return [...cachedBuffer];
  }

  // Fetch a significant sample of artifacts
  const products = await getProducts(100);
  
  if (!products || products.length === 0) {
    console.warn("⚠️ No products found for lore buffer. Falling back to default list.");
    return [];
  }

  const wordSet = new Set<string>();
  // Match alphabetical words only, length 4-12
  const wordRegex = /[a-zA-Z]{4,12}/g;

  products.forEach(product => {
    // Combine title and description for max entropy
    const corpus = `${product.title} ${product.description}`;
    const matches = corpus.match(wordRegex);
    
    if (matches) {
      matches.forEach(word => {
        const cleaned = word.toUpperCase();
        // Skip common English stop words if they are too simple, 
        // but for now length filtering is the primary gate.
        if (cleaned.length >= 4 && cleaned.length <= 12) {
          wordSet.add(cleaned);
        }
      });
    }
  });

  const finalWords = Array.from(wordSet);
  console.log(`📡 Lore Buffer: Extracted ${finalWords.length} unique words from ${products.length} artifacts.`);
  
  cachedBuffer = finalWords;
  lastFetchTime = now;
  
  return [...finalWords];
}

/**
 * Difficulty-aware word selection logic
 * Filters the global buffer for words matching the required length.
 */
export function getWordsForDifficulty(buffer: string[], length: number, count: number): string[] {
  const eligible = buffer.filter(w => w.length === length);
  
  if (eligible.length < count) {
    console.warn(`📡 Lore Buffer: Insufficient words for length ${length}. Requested ${count}, found ${eligible.length}.`);
    // Fallback: allow +/- 1 character if we're short
    const fallback = buffer.filter(w => Math.abs(w.length - length) <= 1);
    return fallback.sort(() => Math.random() - 0.5).slice(0, count);
  }

  return eligible.sort(() => Math.random() - 0.5).slice(0, count);
}
