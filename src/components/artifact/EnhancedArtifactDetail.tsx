import React from 'react';
import Image from 'next/image';
import { MetadataChip } from './MetadataChip';

export interface EnhancedArtifactDetailProps {
  artifact: {
    id: string;
    title: string;
    description: string;
    descriptionHtml?: string;
    images: {
      nodes: Array<{
        url: string;
        altText?: string;
        width?: number;
        height?: number;
      }>;
    };
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    variants: {
      nodes: Array<{
        id: string;
        availableForSale: boolean;
      }>;
    };
    tags?: string[];
  };
  onClose: () => void;
  isOpen: boolean;
  onAcquire: () => Promise<void>;
}

/**
 * Enhanced Artifact Detail View (Stage 4 Core Implementation)
 * 
 * Implements a high-fidelity "Luxury Boutique" interface for deep artifact immersion.
 * Features a split-pane layout with refined typography, cinematic imagery, 
 * and persistent lore substrates.
 */
export const EnhancedArtifactDetail: React.FC<EnhancedArtifactDetailProps> = ({ 
  artifact, 
  onClose, 
  isOpen,
  onAcquire 
}) => {
  if (!isOpen) return null;

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: artifact.priceRange.minVariantPrice.currencyCode,
  }).format(parseFloat(artifact.priceRange.minVariantPrice.amount));

  const rarity = artifact.tags?.find((t: string) => t.startsWith("Rarity:"))?.split(":")[1] || "Relic";
  const origin = artifact.tags?.find((t: string) => t.startsWith("Origin:"))?.split(":")[1] || "Ancient Archive";
  const isArchived = artifact.variants.nodes[0]?.availableForSale === false;

  return (
    <div className="fixed inset-0 z-[100] bg-stone-950/98 backdrop-blur-2xl flex items-center justify-center animate-in fade-in duration-700">
      <div className="w-full h-full max-w-[100vw] lg:max-w-[1600px] bg-stone-50 lg:h-[90vh] lg:rounded-sm overflow-hidden flex flex-col lg:flex-row relative shadow-2xl ring-1 ring-white/10">
        
        {/* Close Action */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-[110] text-stone-400 hover:text-stone-900 transition-colors duration-500 group"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity mr-4">Close View</span>
          <span className="text-2xl font-light">✕</span>
        </button>

        {/* Visual Canvas (Left Pane) */}
        <div className="w-full lg:w-3/5 h-[50vh] lg:h-full bg-stone-200 relative overflow-hidden group">
          {artifact.images.nodes[0] ? (
            <Image
              src={artifact.images.nodes[0].url}
              alt={artifact.images.nodes[0].altText || artifact.title}
              fill
              className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-stone-400 italic font-serif">
              Image Unmanifested
            </div>
          )}
          {/* Vignette Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-950/20 to-transparent"></div>
          
          {/* Scrollable Gallery Thumbnails (Overlay) */}
          <div className="absolute bottom-12 left-12 right-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {artifact.images.nodes.slice(1).map((image, i) => (
              <div key={i} className="flex-shrink-0 w-24 h-24 relative rounded-sm overflow-hidden border border-white/20 shadow-lg hover:border-white/60 transition-colors cursor-pointer">
                <Image src={image.url} alt="Gallery view" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Content (Right Pane) */}
        <div className="w-full lg:w-2/5 h-full overflow-y-auto bg-stone-50 px-8 py-12 lg:p-20 flex flex-col">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] tracking-[0.5em] uppercase text-stone-400 font-bold">Artifact Registry</span>
              <div className="h-px w-8 bg-stone-200"></div>
              <span className="text-[10px] tracking-[0.5em] uppercase text-stone-500">#{artifact.id.split('/').pop()}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif text-stone-900 leading-[1.1] mb-8 tracking-tight">
              {artifact.title}
            </h1>
            
            <div className="flex items-baseline gap-4">
              <span className="text-2xl font-light text-stone-600 italic font-serif">{price}</span>
              {isArchived && (
                <span className="text-[9px] tracking-[0.2em] uppercase bg-stone-200 text-stone-500 px-3 py-1 rounded-full">
                  Fully Commuted
                </span>
              )}
            </div>
          </header>

          <section className="grid grid-cols-2 gap-px bg-stone-200 border border-stone-200 mb-12 rounded-sm overflow-hidden">
            <div className="bg-stone-50 p-6">
              <MetadataChip label="Provenance" value={origin} />
            </div>
            <div className="bg-stone-50 p-6">
              <MetadataChip label="Classification" value={rarity} />
            </div>
          </section>

          <article className="prose prose-stone prose-lg max-w-none flex-1">
            <p className="text-stone-800 leading-relaxed font-light first-letter:text-6xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:mt-2 text-justify">
              {artifact.description}
            </p>
            
            {artifact.descriptionHtml && (
              <div 
                className="mt-12 pt-12 border-t border-stone-100 text-stone-500 font-light text-sm leading-relaxed italic"
                dangerouslySetInnerHTML={{ __html: artifact.descriptionHtml }}
              />
            )}
          </article>

          <footer className="mt-20 pt-12 border-t border-stone-200">
            <button 
              onClick={onAcquire}
              disabled={isArchived}
              className="w-full group relative bg-stone-900 text-white py-8 px-12 rounded-sm overflow-hidden transition-all duration-700 hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed"
            >
              <div className="relative z-10 flex items-center justify-center gap-4">
                <span className="text-[11px] tracking-[0.4em] uppercase font-bold">
                  {isArchived ? "Artifact Archived" : "Initiate Acquisition"}
                </span>
                {!isArchived && <span className="text-xl transition-transform duration-500 group-hover:translate-x-2">→</span>}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-stone-800 to-stone-900 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </button>
            
            <p className="mt-8 text-[9px] tracking-[0.3em] uppercase text-stone-400 text-center font-medium">
              Secure authentication via Shopify Storefront Protocol
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
