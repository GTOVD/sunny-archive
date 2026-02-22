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
    return [...cachedBuffer].sort(() => Math.random() - 0.5);
  }

  // Fetch a significant sample of artifacts
  const products = await getProducts(100);
  
  if (!products || products.length === 0) {
    console.warn("⚠️ No products found for lore buffer. Falling back to default list.");
    return [];
  }

  const wordSet = new Set<string>();
  const wordRegex = /[a-zA-Z]{4,12}/g;

  products.forEach(product => {
    const corpus = `${product.title} ${product.description}`;
    const matches = corpus.match(wordRegex);
    
    if (matches) {
      matches.forEach(word => {
        const cleaned = word.toUpperCase();
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
  
  return [...finalWords].sort(() => Math.random() - 0.5);
}
