import Link from 'next/link';
import { ShopifyProduct } from '@/lib/schema';
import { getProducts } from '@/lib/shopify';

/**
 * Vault (Treasury) Component
 * Aligns with Middleware: 
 * - Handles /treasury primary route
 * - Supports vanity aliases /vault and /collection via redirects
 * - Supports legacy /artifacts/:id -> /treasury/:id redirects
 */
export default async function TreasuryPage() {
  const products: ShopifyProduct[] = await getProducts(12);

  return (
    <div className="relative min-h-screen bg-[#020617] text-[#e2e8f0] pt-32 pb-24 px-6">
      {/* Visual Substrate Ornament */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#d4af37]/[0.02] -z-10 blur-[100px]" />

      <header className="max-w-7xl mx-auto mb-20">
        <div className="font-['Cinzel'] text-[10px] tracking-[0.6em] text-[#d4af37] uppercase">
          Autonomous Inventory System
        </div>
        <h1 className="text-5xl md:text-8xl font-['Playfair_Display'] text-white lowercase tracking-tighter my-4">
          The <span className="italic text-[#d4af37]">Vault</span>
        </h1>
        <div className="h-px w-32 bg-[#d4af37]/30 mt-8" />
        <p className="max-w-md text-[#64748b] text-[10px] uppercase tracking-[0.1em] leading-relaxed mt-8">
          A high-fidelity listing of synchronized artifacts. 
          Each entry represents a verified node in the Sunny Archive.
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col gap-6">
            <Link 
              href={`/treasury/${product.handle || product.id}`}
              className="relative aspect-[4/5] overflow-hidden bg-[#0f172a] border border-white/5 transition-all duration-500"
            >
              {product.images.nodes[0] ? (
                <img 
                  src={product.images.nodes[0].url} 
                  alt={product.images.nodes[0].altText || product.title}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-['Cinzel'] text-[10px] color-[#d4af37]/20 uppercase tracking-widest">
                    No Visual Data
                  </span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-[#020617]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="px-8 py-3 bg-[#d4af37] text-[#020617] font-['Cinzel'] text-[10px] tracking-widest uppercase">
                  View Detail
                </span>
              </div>
            </Link>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                <h2 className="text-xl font-['Playfair_Display'] text-white uppercase m-0">
                  {product.title}
                </h2>
                <span className="font-mono text-[10px] text-[#d4af37]/60">
                  {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                </span>
              </div>
              <p className="text-[10px] text-[#64748b] uppercase tracking-wider leading-relaxed line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-40 border border-dashed border-white/5">
          <p className="font-['Cinzel'] text-[10px] text-[#d4af37]/30 uppercase tracking-[0.4em]">
            The vault is currently awaiting synchronization...
          </p>
        </div>
      )}

      <div className="text-center mt-32">
        <Link href="/" className="text-[#d4af37]/40 uppercase tracking-[0.4em] text-[10px] no-underline hover:text-[#d4af37] transition-colors">
          ← Interface Root
        </Link>
      </div>
    </div>
  );
}
