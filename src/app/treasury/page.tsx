import Link from 'next/link';
import { ShopifyProduct } from '@/lib/schema';
import { getProducts } from '@/lib/shopify';
import BoutiqueCard from '@/components/ui/BoutiqueCard';
import TreasuryWaitlist from '@/components/artifact/TreasuryWaitlist';

/**
 * Vault (Treasury) Component - Boutique Edition
 * A high-fidelity showcase for synchronized artifacts.
 * Part of the 'Luxury Boutique' V2.3.0 substrate.
 */
export default async function TreasuryPage() {
  const products: ShopifyProduct[] = await getProducts(12);

  return (
    <div className="relative min-h-screen bg-[#020617] text-[#e2e8f0] pt-32 pb-24 px-6 overflow-x-hidden">
      {/* Visual Substrate Ornament */}
      <div className="fixed top-0 right-0 w-2/3 h-full bg-[#d4af37]/[0.015] -z-10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-1/2 h-2/3 bg-[#397789]/[0.01] -z-10 blur-[100px] pointer-events-none" />

      <header className="max-w-7xl mx-auto mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="text-center md:text-left">
          <div className="font-mono text-[10px] tracking-[0.6em] text-[#d4af37] uppercase mb-4 opacity-60">
            System.Inventory_Module // GTOVD_PRIMARY
          </div>
          <h1 className="text-5xl md:text-8xl font-['Playfair_Display'] text-white lowercase tracking-tighter mb-4">
            The <span className="italic text-[#d4af37]">Archive</span> Boutique
          </h1>
          <div className="h-px w-32 bg-[#d4af37]/20 mt-6 mx-auto md:mx-0" />
        </div>
        
        <div className="md:max-w-xs text-right hidden md:block">
           <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500 leading-relaxed italic">
             "Every synchronized node carries a unique signature. Acquisition requires authorization from the Lead Architect."
           </p>
        </div>
      </header>

      {products.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 mb-40">
          {products.map((product) => (
            <BoutiqueCard 
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.priceRange.minVariantPrice.amount}
              currency={product.priceRange.minVariantPrice.currencyCode}
              imageUrl={product.images.nodes[0]?.url}
              handle={product.handle}
              provenanceSnippet={product.tags?.includes('Provenance') ? "Immutable record detected in lore substrate." : undefined}
              status={product.availableForSale ? 'AVAILABLE' : 'ACQUIRED'}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto py-32 mb-40 flex flex-col items-center justify-center border-y border-[#d4af37]/5">
          <div className="text-center mb-16">
            <p className="font-['Cinzel'] text-[10px] text-[#d4af37]/40 uppercase tracking-[0.5em] mb-4">
              Vault_Status: [ SEALED ]
            </p>
            <h2 className="text-2xl font-['Playfair_Display'] italic text-white/80">
              Awaiting Node Synchronization
            </h2>
          </div>
          <TreasuryWaitlist />
        </div>
      )}

      {/* Engagement Substrate */}
      {products.length > 0 && (
        <div className="max-w-7xl mx-auto py-24 border-t border-[#d4af37]/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="font-['Playfair_Display'] text-3xl text-white italic">
                Acquisition Authorization
              </h3>
              <p className="text-sm text-stone-400 font-mono leading-relaxed uppercase tracking-tight">
                To request re-acquisition clearance for restricted artifacts, submit your agent identifier to the priority uplink.
              </p>
            </div>
            <TreasuryWaitlist />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex justify-between items-center text-[9px] uppercase tracking-[0.4em] text-stone-700">
        <Link href="/" className="hover:text-[#d4af37] transition-colors no-underline">
          ← Interface Root
        </Link>
        <Link href="/lore" className="hover:text-[#397789] transition-colors no-underline">
          Authorize via Terminal →
        </Link>
      </div>
    </div>
  );
}
