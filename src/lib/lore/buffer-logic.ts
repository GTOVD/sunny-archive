import { getProducts } from './shopify';

/**
 * Metadata Extraction Logic
 * Extracts 'High-Entropy' words from current Shopify artifact titles and descriptions.
 * Cleans and filters for relevant gameplay lengths (4-12 characters).
 */
export async function getLoreBufferWords(): Promise<string[]> {
  const products = await getProducts(50);
  
  if (!products || products.length === 0) {
    return [];
  }

  const wordSet = new Set<string>();
  const wordRegex = /[A-Z]{4,12}/gi; // Match words 4-12 characters long

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

  // Convert to array and shuffle
  return Array.from(wordSet).sort(() => Math.random() - 0.5);
}
