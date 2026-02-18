import React from 'react';
import { ArtifactDetail } from '@/types/artifact';
import { ProvenanceMetadata } from './ProvenanceMetadata';

interface ArtifactLoreProps {
  artifact: ArtifactDetail;
  className?: string;
}

/**
 * ArtifactLore Component - V9 implementation (Active Cycle 34)
 * 
 * Handles high-fidelity narrative metadata and "Sacred Lore" display.
 * Implements luxury aesthetic via ProvenanceMetadata integration and 
 * refined typography for deep lore immersion.
 */
export const ArtifactLore: React.FC<ArtifactLoreProps> = ({ artifact, className = '' }) => {
  return (
    <div className={`space-y-12 ${className}`}>
      {/* Narrative Section - Analysis */}
      <section className="animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-6 bg-gold-500/30" />
          <h3 className="text-[9px] uppercase tracking-[0.5em] text-gold-600 font-mono">
            Primary Analysis
          </h3>
        </div>
        <div className="relative">
          <span className="absolute -left-6 top-0 text-4xl font-serif text-gold-500/10 leading-none">"</span>
          <p className="text-2xl font-serif leading-relaxed text-stone-200 italic font-light">
            {artifact.description}
          </p>
          <span className="absolute -right-2 bottom-0 text-4xl font-serif text-gold-500/10 leading-none">"</span>
        </div>
      </section>

      {/* Deep Lore Section - Decrypted Archives */}
      <section className="animate-in fade-in slide-in-from-right-6 duration-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-6 bg-gold-500/30" />
          <h3 className="text-[9px] uppercase tracking-[0.5em] text-gold-600 font-mono">
            Decrypted Archives
          </h3>
        </div>
        <div className="space-y-8 relative">
          {/* Vertical lore line accent */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
          
          {artifact.lore && artifact.lore.length > 0 ? (
            artifact.lore.map((line, idx) => (
              <p 
                key={idx} 
                className="text-stone-400 font-serif text-lg leading-loose pl-8 hover:text-stone-200 transition-colors duration-500"
              >
                {line}
              </p>
            ))
          ) : (
            <p className="text-stone-600 font-serif italic pl-8 py-2">
              No additional data found in secondary archives.
            </p>
          )}
        </div>
      </section>

      {/* Provenance Record - Technical Substrate */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-1 bg-gold-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
          <h3 className="text-[9px] uppercase tracking-[0.5em] text-gold-600 font-mono">
            Provenance Record
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProvenanceMetadata 
            label="Origin" 
            value={artifact.metadata.origin} 
            rarity={artifact.rarity}
          />
          <ProvenanceMetadata 
            label="Era" 
            value={artifact.metadata.era} 
          />
          {artifact.rarity && (
            <ProvenanceMetadata 
              label="Classification" 
              value={artifact.rarity} 
            />
          )}
          {artifact.metadata.discoveredAt && (
            <ProvenanceMetadata 
              label="Timestamp" 
              value={artifact.metadata.discoveredAt} 
            />
          )}
        </div>
      </section>

      {/* Internal Component Registry (Optional) */}
      {artifact.components && artifact.components.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000 pt-4">
          <h3 className="text-[9px] uppercase tracking-[0.5em] text-stone-600 mb-6 font-mono border-b border-stone-800 pb-2 inline-block">
            Subsystem Integrity
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {artifact.components.map((comp) => (
              <div key={comp.id} className="flex flex-col gap-1 border border-stone-800/50 p-3 rounded-sm bg-stone-900/20">
                <span className="text-[8px] uppercase tracking-widest text-stone-500 font-mono">{comp.type}</span>
                <span className="text-stone-300 font-serif text-sm">{comp.name}</span>
                <span className={`text-[8px] uppercase font-mono mt-1 ${
                  comp.status === 'Functional' ? 'text-emerald-500/70' : 'text-amber-500/70'
                }`}>
                  [{comp.status}]
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
