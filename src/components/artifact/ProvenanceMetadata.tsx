import React from 'react';

interface ProvenanceMetadataProps {
  label: string;
  value: string;
  rarity?: string;
}

/**
 * High-Fidelity Metadata Chip for Artifact Detail View
 * Implements the 'Luxury Substrate' aesthetic with soft glows and etched glass feel.
 */
export const ProvenanceMetadata: React.FC<ProvenanceMetadataProps> = ({ label, value, rarity }) => {
  return (
    <div className="relative group overflow-hidden rounded-sm border border-gold-500/10 bg-stone-900/40 backdrop-blur-sm p-4 transition-all duration-300 hover:border-gold-500/30 hover:shadow-[0_0_15px_rgba(212,175,55,0.05)]">
      {/* Soft Glow Substrate */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col gap-1">
        <span className="text-[9px] uppercase tracking-[0.4em] text-gold-600/60 font-mono">
          {label}
        </span>
        <span className="text-stone-200 font-serif text-lg tracking-wide group-hover:text-gold-100 transition-colors">
          {value}
        </span>
      </div>

      {/* Rarity Indicator Accent */}
      {rarity && (
        <div className="absolute top-0 right-0 p-1">
          <div className="h-1 w-8 bg-gold-500/20" />
        </div>
      )}
    </div>
  );
};
