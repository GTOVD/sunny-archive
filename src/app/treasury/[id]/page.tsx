import { getProductByHandle, createCheckout } from "@/lib/shopify";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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

  /**
   * Acquisition Action Handler
   * Triggers the Shopify Checkout flow for the selected artifact.
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
            <div className="aspect-[4/5] relative bg-stone-100 overflow-hidden rounded-sm group">
              {product.images.nodes[0] ? (
                <Image
                  src={product.images.nodes[0].url}
                  alt={product.images.nodes[0].altText || product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-stone-300 italic">
                  Image Unavailable
                </div>
              )}
            </div>
            
            {/* Secondary Views */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.nodes.slice(1, 5).map((image: any, index: number) => (
                <div key={index} className="aspect-square relative bg-stone-100 rounded-sm overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.altText || `${product.title} - view ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Narrative Content (Details) */}
          <div className="flex flex-col pt-4">
            <div className="border-b border-stone-200 pb-8 mb-8">
              <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-2xl font-light text-stone-600 tracking-tight">
                  {price}
                </p>
                {product.variants.nodes[0]?.availableForSale === false && (
                  <span className="text-[10px] tracking-[0.2em] uppercase bg-stone-200 text-stone-500 px-2 py-1 rounded-sm">
                    Archived
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-8 mb-12">
              <div className="prose prose-stone prose-lg max-w-none">
                <p className="text-stone-700 leading-relaxed font-light whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {product.descriptionHtml && (
                <div 
                  className="prose prose-stone max-w-none text-stone-600 font-light text-sm border-t border-stone-100 pt-8"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              )}
            </div>

            {/* Action Tier */}
            <div className="mt-auto space-y-6">
              <form action={acquireArtifact}>
                <button 
                  disabled={product.variants.nodes[0]?.availableForSale === false}
                  className="w-full bg-stone-900 text-white py-5 px-8 rounded-sm text-sm tracking-[0.2em] uppercase font-medium hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-all duration-300 shadow-sm active:scale-[0.98]"
                >
                  {product.variants.nodes[0]?.availableForSale === false ? "Artifact Archived" : "Acquire Artifact"}
                </button>
              </form>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-stone-400 border-t border-stone-100 pt-6">
                  <span>Authenticity Guaranteed</span>
                  <span>Secure Transmission</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
