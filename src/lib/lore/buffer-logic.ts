import { getProducts } from '@/lib/shopify';

/**
 * Dynamic Lore Buffer Utility
 * Synchronizes the hacking game word-buffer with actual Archive artifact metadata.
 */
export async function getLoreBuffer(): Promise<string[]> {
  try {
    const products = await getProducts(50);
    
    // Extract words from titles and tags, focusing on lore-heavy identifiers
    const words = products.flatMap(p => {
      const titleWords = p.title.toUpperCase().split(/\s+/).filter(w => w.length >= 4 && w.length <= 8);
      const loreTags = p.tags
        ?.filter(t => !t.includes(':')) // Skip structured provenance tags
        .map(t => t.toUpperCase())
        .filter(t => t.length >= 4 && t.length <= 8) || [];
      
      return [...titleWords, ...loreTags];
    });

    // Deduplicate and filter for alphanumeric consistency
    const cleanBuffer = Array.from(new Set(words))
      .filter(w => /^[A-Z0-9]+$/.test(w))
      .sort();

    return cleanBuffer.length >= 20 ? cleanBuffer : FALLBACK_BUFFER;
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
