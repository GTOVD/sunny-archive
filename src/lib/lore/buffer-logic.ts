import { getProducts } from '../shopify';

/**
 * Dynamic Lore Buffer Utility
 * Synchronizes the hacking game word-buffer with actual Archive artifact metadata.
 */
export async function getLoreBuffer(): Promise<string[]> {
  try {
    const products = await getProducts(50);
    
    // Extract words from titles and tags, focusing on lore-heavy identifiers
    const words = products.flatMap((p: any) => {
      const titleWords = p.title.toUpperCase().split(/\s+/).filter((w: string) => w.length >= 4 && w.length <= 8);
      // Optional: tags if available in your schema
      return titleWords;
    });

    // Deduplicate and filter for alphanumeric consistency
    const cleanBuffer = Array.from(new Set(words))
      .filter((w: unknown) => typeof w === 'string' && /^[A-Z0-9]+$/.test(w))
      .sort();

    return (cleanBuffer as string[]).length >= 20 ? (cleanBuffer as string[]) : FALLBACK_BUFFER;
  } catch (error) {
    console.error('LORE_BUFFER_SYNC_FAILURE:', error);
    return FALLBACK_BUFFER;
  }
}

const FALLBACK_BUFFER = [
  'VAULT', 'LORE', 'NEXUS', 'VOID', 'GTOVD', 'SUNNY', 'SYNC', 'ARCH',
  'SYMBIO', 'PROTO', 'CORE', 'BOND', 'PULSE', 'GRID', 'LINK', 'GATED',
  'AUTHOR', 'SIGNAL', 'RELIC', 'NODE', 'PHASE', 'TRACE', 'ULINK'
];
