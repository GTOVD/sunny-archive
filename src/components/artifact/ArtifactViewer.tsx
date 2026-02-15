'use client';

import React from 'react';
import { Artifact } from '@/lib/artifact/types';

interface ArtifactViewerProps {
  artifact: Artifact;
}

/**
 * ArtifactViewer - High-fidelity Detail View for the Artifact Substrate.
 * Part of the "Luxury Boutique" UI overhaul (Issue #154).
 */
export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({ artifact }) => {
  return (
    <div className="artifact-viewer glassmorphism p-8 rounded-xl border border-gold/20">
      <h2 className="text-3xl font-serif text-gold mb-4">{artifact.name}</h2>
      <div className="artifact-meta flex gap-4 mb-6 text-sm uppercase tracking-widest text-white/60">
        <span>Category: {artifact.category}</span>
        <span>Rarity: {artifact.rarity}</span>
      </div>
      <div className="artifact-lore prose prose-invert max-w-none">
        <p className="italic text-lg text-white/80 mb-4">{artifact.description}</p>
        <div className="p-4 bg-black/40 rounded border-l-2 border-gold">
          {artifact.lore}
        </div>
      </div>
    </div>
  );
};
