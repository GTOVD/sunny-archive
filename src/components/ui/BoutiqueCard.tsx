import React from 'react';
import Link from 'next/link';

interface BoutiqueCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  imageUrl?: string;
  handle?: string;
  provenanceSnippet?: string;
  status?: 'AVAILABLE' | 'ACQUIRED' | 'RESTRICTED';
}

/**
 * BoutiqueCard Component
 * High-fidelity artifact card for the 'Luxury Boutique' Treasury layout.
 * Features glassmorphism, kinetic typography, and provenance snippets.
 */
const BoutiqueCard: React.FC<BoutiqueCardProps> = ({
  id,
  title,
  description,
  price,
  currency,
  imageUrl,
  handle,
  provenanceSnippet,
  status = 'AVAILABLE'
}) => {
  const detailHref = `/treasury/${handle || id}`;

  return (
    <div className="boutique-card group relative flex flex-col gap-6 p-4 border border-[#d4af37]/10 bg-black/40 backdrop-blur-md rounded-sm transition-all duration-500 hover:border-[#d4af37]/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.05)]">
      {/* Status Badge */}
      <div className="absolute top-6 right-6 z-20">
        <span className={`text-[8px] uppercase tracking-[0.4em] px-3 py-1 border rounded-full ${
          status === 'AVAILABLE' ? 'border-[#397789] text-[#397789]' : 
          status === 'ACQUIRED' ? 'border-red-900/50 text-red-900/50' : 
          'border-stone-800 text-stone-800'
        }`}>
          {status}
        </span>
      </div>

      {/* Image Substrate */}
      <Link href={detailHref} className="relative aspect-[4/5] overflow-hidden bg-[#020617] border border-white/5">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
             <span className="font-['Cinzel'] text-[10px] text-[#d4af37]/20 uppercase tracking-widest">
               No Visual Data
             </span>
          </div>
        )}
        
        {/* Interaction Overlay */}
        <div className="absolute inset-0 bg-[#020617]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
          <span className="px-8 py-3 bg-[#d4af37] text-[#020617] font-['Cinzel'] text-[10px] tracking-widest uppercase">
            Examine Artifact
          </span>
          {provenanceSnippet && (
            <p className="max-w-[80%] text-[8px] text-[#d4af37]/60 uppercase tracking-tighter text-center line-clamp-2 px-4 italic">
              "{provenanceSnippet}"
            </p>
          )}
        </div>
      </Link>

      {/* Info Block */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-baseline border-b border-[#d4af37]/10 pb-3">
          <h2 className="text-lg font-['Playfair_Display'] text-white uppercase tracking-wider group-hover:text-[#d4af37] transition-colors duration-300">
            {title}
          </h2>
          <span className="font-mono text-[10px] text-[#d4af37]/60">
            {price} {currency}
          </span>
        </div>
        
        <p className="text-[10px] text-stone-500 uppercase tracking-wider leading-relaxed line-clamp-2 min-h-[32px]">
          {description}
        </p>

        {/* Technical Footer */}
        <div className="mt-2 flex justify-between items-center text-[8px] text-stone-700 uppercase tracking-widest font-mono">
          <span>ID: {id.slice(-8).toUpperCase()}</span>
          <span>SUBSTRATE: v2.3.0</span>
        </div>
      </div>
    </div>
  );
};

export default BoutiqueCard;
