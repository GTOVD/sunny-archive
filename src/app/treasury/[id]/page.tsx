import { getProductByHandle, getProducts, createCheckout } from "@/lib/shopify";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SacredProvenance from "@/components/artifact/SacredProvenance";

/**
 * Generate Static Params for optimized SSG on Vercel.
 */
export async function generateStaticParams() {
  const products = await getProducts(100);
  return products.map((product: any) => ({
    id: product.handle || product.id,
  }));
}

/**
 * Artifact Detail View - Sacred Provenance Edition
 */
export default async function ArtifactPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await getProductByHandle(id);

  if (!product) {
    notFound();
  }

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(parseFloat(product.priceRange.minVariantPrice.amount));

  // Extraction of High-Fidelity Provenance Data from tags or meta
  const provenanceData = {
    birthDate: product.tags?.find((t: string) => t.startsWith("Born:"))?.split(":")[1] || "Era_Unknown",
    craftsman: product.tags?.find((t: string) => t.startsWith("Agent:"))?.split(":")[1] || "The Architect",
    loreHash: product.tags?.find((t: string) => t.startsWith("Hash:"))?.split(":")[1] || "0x" + Math.random().toString(16).slice(2, 42).toUpperCase(),
    originNode: product.tags?.find((t: string) => t.startsWith("Node:"))?.split(":")[1] || "ROOT_SUBSYSTEM"
  };

  /**
   * Acquisition Action Handler
   */
  async function acquireArtifact() {
    "use server";
    const variantId = product?.variants.nodes[0]?.id;
    if (!variantId) return;

    const checkoutUrl = await createCheckout(variantId);
    if (checkoutUrl) {
      redirect(checkoutUrl);
    }
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-[#e2e8f0] pt-32 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#d4af37]/[0.02] -z-10 blur-[120px]" />
      <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-[#397789]/[0.01] -z-10 blur-[100px]" />
      
      <div className="max-w-7xl mx-auto">
        <nav className="mb-16">
          <Link 
            href="/treasury" 
            className="text-[#d4af37]/40 hover:text-[#d4af37] transition-all duration-500 text-[10px] tracking-[0.4em] uppercase flex items-center gap-3 no-underline"
          >
            <span className="text-lg">←</span> Return to Vault
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          <div className="space-y-10">
            <div className="aspect-[4/5] relative bg-[#0f172a] overflow-hidden border border-[#d4af37]/10 shadow-2xl">
              {product.images.nodes[0] ? (
                <Image
                  src={product.images.nodes[0].url}
                  alt={product.images.nodes[0].altText || product.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-['Cinzel'] text-[10px] text-[#d4af37]/20 uppercase tracking-widest">
                  Visual Link Severed
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.nodes.slice(1, 5).map((image: any, index: number) => (
                <div key={index} className="aspect-square relative bg-[#0f172a] overflow-hidden border border-white/5 transition-transform hover:scale-105 duration-500">
                  <Image
                    src={image.url}
                    alt={image.altText || `${product.title} - fragment ${index + 2}`}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              ))}
            </div>

            {/* Sacred Provenance Gating Section */}
            <div className="mt-12">
              <SacredProvenance artifactName={product.title} provenance={provenanceData} />
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="border-b border-white/5 pb-10 mb-12">
              <div className="font-['Cinzel'] text-[10px] tracking-[0.6em] text-[#d4af37] uppercase mb-4">
                Artifact Specification
              </div>
              <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] text-white mb-8 leading-tight tracking-tighter lowercase">
                {product.title}
              </h1>
              <div className="flex items-center gap-8">
                <p className="text-2xl font-light text-[#e2e8f0]/80 tracking-tight font-mono">
                  {price}
                </p>
                <div className="h-px w-12 bg-[#d4af37]/20"></div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#64748b]">
                  NODE_ID: {product.id.split('/').pop()?.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="space-y-12 mb-20">
              <div className="prose prose-invert max-w-none">
                <p className="text-[#94a3b8] leading-relaxed font-light text-lg first-letter:text-5xl first-letter:font-['Playfair_Display'] first-letter:text-[#d4af37] first-letter:mr-4 first-letter:float-left first-letter:mt-1 whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {product.descriptionHtml && (
                <div 
                  className="prose prose-invert max-w-none text-[#64748b] font-light text-xs leading-loose border-t border-white/5 pt-12 italic"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              )}
            </div>

            <div className="mt-auto space-y-10">
              <form action={acquireArtifact}>
                <button 
                  disabled={product.variants.nodes[0]?.availableForSale === false}
                  className="group relative w-full bg-[#d4af37] text-[#020617] py-6 px-10 text-[10px] tracking-[0.4em] uppercase font-bold transition-all duration-700 hover:bg-white hover:tracking-[0.6em] disabled:bg-[#1e293b] disabled:text-[#475569] disabled:cursor-not-allowed overflow-hidden"
                >
                  <span className="relative z-10">
                    {product.variants.nodes[0]?.availableForSale === false ? "Access Restricted" : "Initiate Acquisition"}
                  </span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </form>
              
              <div className="flex items-center justify-between text-[9px] tracking-[0.3em] uppercase text-[#475569] border-t border-white/5 pt-10 font-mono">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/40 shadow-[0_0_8px_#d4af37]"></div>
                  <span>Secure Handshake Verified</span>
                </div>
                <span>Substrate_v2.3.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
