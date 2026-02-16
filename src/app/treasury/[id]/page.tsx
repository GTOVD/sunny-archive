import { getProductByHandle } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MetadataChip } from "@/components/artifact/MetadataChip";

/**
 * Artifact Detail View
 * 
 * An immersive, "Luxury Boutique" style detail page for high-fidelity artifact examination.
 * Implements aesthetic spacing, serif typography, and graceful layout transitions.
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

  // Extract metadata from Shopify tags or metafields if available, fallback to defaults
  const rarity = product.tags?.find((t: string) => t.startsWith("Rarity:"))?.split(":")[1] || "Relic";
  const origin = product.tags?.find((t: string) => t.startsWith("Origin:"))?.split(":")[1] || "Ancient Archive";

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <nav className="mb-12">
          <Link 
            href="/treasury" 
            className="text-stone-400 hover:text-stone-900 transition-colors duration-300 text-sm tracking-widest uppercase flex items-center gap-2"
          >
            <span>←</span> Back to Treasury
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Visual Canvas (Image Gallery) */}
          <div className="space-y-8">
            <div className="aspect-[4/5] relative bg-stone-100 overflow-hidden rounded-sm group shadow-sm">
              {product.images.nodes[0] ? (
                <Image
                  src={product.images.nodes[0].url}
                  alt={product.images.nodes[0].altText || product.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-stone-300 italic">
                  Image Unavailable
                </div>
              )}
              {/* Etched Glass Glow Overlay */}
              <div className="absolute inset-0 pointer-events-none border border-white/20 rounded-sm"></div>
            </div>
            
            {/* Secondary Views */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.nodes.slice(1, 5).map((image: any, index: number) => (
                <div key={index} className="aspect-square relative bg-stone-100 rounded-sm overflow-hidden border border-stone-200/40">
                  <Image
                    src={image.url}
                    alt={image.altText || `${product.title} - view ${index + 2}`}
                    fill
                    className="object-cover transition-opacity duration-500 hover:opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Narrative Content (Details) */}
          <div className="flex flex-col pt-4">
            <div className="border-b border-stone-200 pb-8 mb-10">
              <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6 leading-[1.1] tracking-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-6">
                <p className="text-2xl font-light text-stone-600 tracking-tight">
                  {price}
                </p>
                <div className="h-px w-8 bg-stone-300"></div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium">
                  Reference: #{product.id.split('/').pop()}
                </span>
              </div>
            </div>

            {/* Substrate Metadata Tier */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              <MetadataChip label="Provenance" value={origin} />
              <MetadataChip label="Classification" value={rarity} />
            </div>

            <div className="space-y-10 mb-16">
              <div className="prose prose-stone prose-lg max-w-none">
                <p className="text-stone-700 leading-relaxed font-light first-letter:text-4xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                  {product.description}
                </p>
              </div>

              {product.descriptionHtml && (
                <div 
                  className="prose prose-stone max-w-none text-stone-500 font-light text-sm leading-loose border-t border-stone-100 pt-10"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              )}
            </div>

            {/* Action Tier */}
            <div className="mt-auto space-y-8">
              <button className="w-full bg-stone-900 text-white py-6 px-10 rounded-sm text-xs tracking-[0.3em] uppercase font-semibold hover:bg-stone-800 transition-all duration-500 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-stone-300/50 active:scale-[0.99]">
                Acquire Artifact
              </button>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-stone-400 border-t border-stone-100 pt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-stone-300"></div>
                    <span>Hand-curated Selection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-stone-300"></div>
                    <span>Artifact Registry Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

