import { getProducts } from './shopify';

/**
 * High-Entropy Word Extraction Utility
 * Extracts and cleans words from Shopify artifact metadata for the hacking terminal.
 */
export async function getLoreBufferWords(): Promise<string[]> {
  // Fetch a significant sample of artifacts to ensure enough word variety
  const products = await getProducts(100);
  
  if (!products || products.length === 0) {
    console.warn("⚠️ No products found for lore buffer. Falling back to default list.");
    return [];
  }

  const wordSet = new Set<string>();
  
  // Regex to match strictly alphabetical high-entropy words (4-12 characters)
  const wordRegex = /[a-zA-Z]{4,12}/g;

  products.forEach(product => {
    // Combine title and description for max entropy
    const corpus = `${product.title} ${product.description}`;
    const matches = corpus.match(wordRegex);
    
    if (matches) {
      matches.forEach(word => {
        const cleaned = word.toUpperCase();
        // Filter out common small words or non-thematic strings if needed
        // For now, length filtering is our primary quality gate
        if (cleaned.length >= 4 && cleaned.length <= 12) {
          wordSet.add(cleaned);
        }
      });
    }
  });

  const finalWords = Array.from(wordSet);
  console.log(`📡 Lore Buffer: Extracted ${finalWords.length} unique words from ${products.length} artifacts.`);
  
  return finalWords.sort(() => Math.random() - 0.5);
}
