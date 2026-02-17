import React from 'react';
import { Artifact } from '@/types/artifact';

interface ArtifactLoreProps {
  artifact: Artifact;
  className?: string;
}

/**
 * ArtifactLore Component - V5 Initialization
 * 
 * Handles high-fidelity narrative metadata and "Sacred Lore" display
 * for the Artifact Detail View. Integrates with the Artifact Substrate.
 */
export const ArtifactLore: React.FC<ArtifactLoreProps> = ({ artifact, className = '' }) => {
  return (
    <div className={`space-y-8 ${className}`}>
      <section className="animate-in fade-in slide-in-from-right-4 duration-500">
        <h3 className="text-[9px] uppercase tracking-[0.5em] text-gold-600 mb-4 font-mono">
          Analysis
        </h3>
        <p className="text-xl font-serif leading-relaxed text-stone-200 italic">
          "{artifact.description}"
        </p>
      </section>

      <section className="animate-in fade-in slide-in-from-right-6 duration-700">
        <h3 className="text-[9px] uppercase tracking-[0.5em] text-gold-600 mb-4 font-mono">
          Decrypted Archives
        </h3>
        <div className="space-y-6">
          {artifact.lore && artifact.lore.length > 0 ? (
            artifact.lore.map((line, idx) => (
              <p 
                key={idx} 
                className="text-stone-400 font-serif leading-loose border-l border-gold-500/20 pl-6 py-1 hover:border-gold-500/50 transition-colors"
              >
                {line}
              </p>
            ))
          ) : (
            <p className="text-stone-600 font-serif italic pl-6 border-l border-gold-500/10">
              No additional data found in secondary archives.
            </p>
          )}
        </div>
      </section>

      {/* Artifact Substrate Metadata Hook */}
      <section className="pt-8 mt-8 border-t border-gold-500/10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
          <h3 className="text-[9px] uppercase tracking-[0.5em] text-gold-600 font-mono">
            Provenance Record
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-stone-500 uppercase tracking-widest">
          <div className="flex flex-col gap-1">
            <span className="text-stone-700 text-[8px]">Origin</span>
            <span className="text-gold-500/60">{artifact.metadata.origin}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-stone-700 text-[8px]">Era</span>
            <span className="text-gold-500/60">{artifact.metadata.era}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
