import React from 'react';
import { ArtifactMetadata, ArtifactLoreEntry } from '@/types/artifact';

interface ArtifactLoreV10Props {
  artifact: ArtifactMetadata;
  lore: ArtifactLoreEntry[];
  className?: string;
}

/**
 * ArtifactLore (v10)
 * High-fidelity narrative component for the Luxury Boutique Artifact Substrate.
 * Established in Cycle 36 for production promotion.
 */
export const ArtifactLore: React.FC<ArtifactLoreV10Props> = ({
  artifact,
  lore,
  className = '',
}) => {
  return (
    <div className={`artifact-lore-substrate ${className}`}>
      <header className="lore-header mb-6">
        <h2 className="text-2xl font-display uppercase tracking-widest text-gold">
          {artifact.title} Lore
        </h2>
        <div className="lore-provenance text-sm text-gray-400 font-mono">
          PROVENANCE: {artifact.provenance || 'AUTHENTICATED'}
        </div>
      </header>
      
      <div className="lore-entries space-y-8">
        {lore.map((entry, index) => (
          <article key={index} className="lore-entry glassmorphism p-6 rounded-lg border border-white/10">
            <h3 className="text-lg font-semibold mb-2 text-white/90">
              {entry.title}
            </h3>
            <p className="text-gray-300 leading-relaxed font-serif italic">
              "{entry.content}"
            </p>
            {entry.timestamp && (
              <footer className="mt-4 text-xs text-gold/60 font-mono text-right">
                REC_ID: {entry.timestamp}
              </footer>
            )}
          </article>
        ))}
      </div>
      
      <footer className="mt-12 pt-6 border-t border-white/5 text-center">
        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em]">
          Symbiote Protocol // Artifact Substrate v2.0
        </span>
      </footer>
    </div>
  );
};
