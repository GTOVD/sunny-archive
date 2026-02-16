import Link from 'next/link';
import { ShopifyProduct } from '@/lib/schema';
import { getProducts, createCheckout } from '@/lib/shopify';
import { redirect } from 'next/navigation';
import { ArtifactDetailOverlay } from '@/components/artifact/ArtifactDetailOverlay';

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
    <div className="relative min-h-screen pt-32 pb-24 px-6 bg-slate-950 text-slate-200">
      {/* Background Ornament */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-500/5 -z-10 blur-[100px]" />

      <header className="max-w-7xl mx-auto mb-20">
        <div className="font-serif text-[10px] uppercase tracking-[0.6em] text-gold-500">
          Department of Acquisitions
        </div>
        <h1 className="text-6xl md:text-8xl font-serif text-white lowercase tracking-tighter my-4">
          The <span className="italic text-gold-500">Treasury</span>
        </h1>
        <div className="h-px w-32 bg-gold-500/30 mt-8" />
        <p className="max-w-md text-slate-500 text-sm uppercase tracking-widest leading-relaxed mt-8">
          Unique artifacts sourced from independent American artisans. 
          Hand-crafted legacy items for the modern explorer.
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col gap-8">
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-900 border border-white/5 transition-all duration-500 group-hover:border-gold-500/30">
              {/* High-Fidelity Detail Trigger */}
              <ArtifactDetailOverlay product={product} />

              {product.images.nodes[0] ? (
                <img 
                  src={product.images.nodes[0].url} 
                  alt={product.images.nodes[0].altText || product.title}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-serif text-[10px] color-gold-500/20 uppercase tracking-[0.2em]">Image Pending</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 pointer-events-none">
                 <form action={handleAcquire} className="pointer-events-auto">
                  <input type="hidden" name="variantId" value={product.variants.nodes[0]?.id} />
                  <button type="submit" className="px-8 py-3 bg-gold-500 text-slate-950 font-serif text-[10px] tracking-[0.2em] uppercase transition-transform hover:scale-105 active:scale-95">
                    Acquire Artifact
                  </button>
                </form>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                <h2 className="text-xl font-serif text-white uppercase group-hover:text-gold-400 transition-colors">
                  {product.title}
                </h2>
                <span className="font-mono text-xs text-gold-500/60">
                  {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-40 border border-dashed border-white/5">
          <p className="font-serif text-[10px] text-gold-500/30 uppercase tracking-[0.4em]">
            The vault is currently awaiting replenishment...
          </p>
        </div>
      )}

      <div className="text-center mt-32">
        <Link href="/" className="text-gold-500/40 uppercase tracking-[0.4em] text-[10px] hover:text-gold-500 transition-colors">
          ← Return to Vault
        </Link>
      </div>
    </div>
  );
}
