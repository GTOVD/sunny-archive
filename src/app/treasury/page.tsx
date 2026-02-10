import { ShopifyProduct } from '@/lib/schema';
import { getProducts, createCheckout } from '@/lib/shopify';
import { redirect } from 'next/navigation';

export default async function TreasuryPage() {
  const products: ShopifyProduct[] = await getProducts(24);

  async function handleAcquire(formData: FormData) {
    'use server';
    const variantId = formData.get('variantId') as string;
    if (!variantId) return;
    
    const checkoutUrl = await createCheckout(variantId);
    if (checkoutUrl) {
      redirect(checkoutUrl);
    }
  }

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 md:px-12">
      {/* Background Ornament */}
      <div className="absolute top-0 right-0 w-1/2 h-screen bg-gold/[0.02] -z-10 blur-3xl"></div>

      <header className="max-w-7xl mx-auto mb-20 space-y-4">
        <div className="font-cinzel text-[10px] tracking-[0.6em] text-gold uppercase animate-pulse">
          Department of Acquisitions
        </div>
        <h1 className="text-6xl md:text-8xl font-serif text-white lowercase tracking-tighter">
          The <span className="gold-text-shimmer italic">Treasury</span>
        </h1>
        <div className="h-px w-32 bg-gold/30 mt-8"></div>
        <p className="max-w-xl text-slate-500 text-sm uppercase tracking-widest leading-relaxed pt-4">
          A selection of unique, specialized artifacts sourced from independent 
          American artisans. Hand-crafted legacy items for the modern explorer.
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col">
            <div className="luxury-card aspect-[4/5] mb-8">
              {product.images.nodes[0] ? (
                <img 
                  src={product.images.nodes[0].url} 
                  alt={product.images.nodes[0].altText || product.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-navy-dark border border-gold/10">
                  <span className="font-cinzel text-[10px] text-gold/20 uppercase tracking-widest">Image Pending</span>
                </div>
              )}
              
              {/* Card Hover Overlay */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                 <form action={handleAcquire}>
                  <input type="hidden" name="variantId" value={product.variants.nodes[0]?.id} />
                  <button type="submit" className="px-8 py-3 bg-gold text-navy font-cinzel text-[10px] tracking-[0.2em] uppercase hover:bg-gold-bright transition-colors shadow-2xl">
                    Acquire Artifact
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                <h2 className="font-serif text-2xl text-white uppercase group-hover:text-gold transition-colors duration-500">
                  {product.title}
                </h2>
                <span className="font-mono text-xs text-gold/60">
                  {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.15em] leading-relaxed line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-40 border border-dashed border-white/5">
          <p className="font-cinzel text-xs text-gold/30 uppercase tracking-[0.4em]">
            The vault is currently awaiting replenishment...
          </p>
        </div>
      )}
    </div>
  );
}
