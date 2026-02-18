import React from 'react';
import { ArtifactDetail } from '@/types/artifact';
import { ProvenanceMetadata } from './ProvenanceMetadata';

interface ArtifactLoreProps {
  artifact: ArtifactDetail;
  className?: string;
}

/**
 * ArtifactLore Component - V10 implementation (Active Cycle 36/37)
 * 
 * High-fidelity narrative component for the Luxury Boutique Artifact Substrate.
 * Handles primary analysis, deep lore decryption, and provenance verification.
 * 
 * Implements luxury aesthetic via:
 * - Refined typography (serif/mono contrast)
 * - Glassmorphism backgrounds
 * - Strategic animation delays
 * - Precision-aligned provenance markers
 */
export const ArtifactLore: React.FC<ArtifactLoreProps> = ({ artifact, className = '' }) => {
  return (
    <div className={`artifact-lore-substrate space-y-12 ${className}`}>
      {/* Narrative Section - Analysis */}
      <section className="lore-analysis animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-6 bg-gold-500/30" />
          <h3 className="text-[9px] uppercase tracking-[0.5em] text-gold-600 font-mono">
            Primary Analysis
          </h3>
        </div>
        <div className="relative p-6 bg-stone-900/40 border border-white/5 rounded-sm backdrop-blur-sm">
          <span className="absolute -left-2 -top-4 text-6xl font-serif text-gold-500/10 leading-none">“</span>
          <p className="text-xl md:text-2xl font-serif leading-relaxed text-stone-200 italic font-light">
            {artifact.description}
          </p>
          <span className="absolute -right-2 -bottom-8 text-6xl font-serif text-gold-500/10 leading-none">”</span>
        </div>
      </section>

      {/* Deep Lore Section - Decrypted Archives */}
      <section className="lore-archives animate-in fade-in slide-in-from-right-6 duration-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-6 bg-gold-500/30" />
          <h3 className="text-[9px] uppercase tracking-[0.5em] text-gold-600 font-mono">
            Decrypted Archives
          </h3>
        </div>
        <div className="space-y-8 relative">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
          
          {artifact.lore && artifact.lore.length > 0 ? (
            artifact.lore.map((line, idx) => (
              <div key={idx} className="group relative pl-8 py-2">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-px bg-gold-500/0 group-hover:bg-gold-500/50 transition-all duration-500" />
                <p className="text-stone-400 font-serif text-lg leading-loose group-hover:text-stone-200 transition-colors duration-500">
                  {line}
                </p>
              </div>
            ))
          ) : (
            <p className="text-stone-600 font-serif italic pl-8 py-2">
              No additional data found in secondary archives.
            </p>
          )}
        </div>
      </section>

      {/* Provenance Record - Technical Substrate */}
      <section className="lore-provenance animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
          <h3 className="text-[9px] uppercase tracking-[0.5em] text-gold-600 font-mono">
            Provenance Verification
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProvenanceMetadata 
            label="Origin" 
            value={artifact.metadata.origin} 
            rarity={artifact.rarity}
          />
          <ProvenanceMetadata 
            label="Temporal Era" 
            value={artifact.metadata.era} 
          />
          {artifact.rarity && (
            <ProvenanceMetadata 
              label="Boutique Classification" 
              value={artifact.rarity} 
            />
          )}
          {artifact.metadata.discoveredAt && (
            <ProvenanceMetadata 
              label="Registry Timestamp" 
              value={artifact.metadata.discoveredAt} 
            />
          )}
        </div>
      </section>

      {/* Subsystem Integrity - Technical Specs */}
      {artifact.components && artifact.components.length > 0 && (
        <section className="lore-subsystems animate-in fade-in slide-in-from-bottom-6 duration-1000 pt-8 border-t border-white/5">
          <h3 className="text-[9px] uppercase tracking-[0.5em] text-stone-500 mb-8 font-mono">
            Subsystem Integrity Report
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {artifact.components.map((comp) => (
              <div 
                key={comp.id} 
                className="flex flex-col gap-2 p-4 border border-stone-800/30 rounded-sm bg-stone-950/20 hover:border-gold-500/20 transition-colors group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[7px] uppercase tracking-widest text-stone-500 font-mono">{comp.type}</span>
                  <div className={`w-1 h-1 rounded-full ${
                    comp.status === 'Functional' ? 'bg-emerald-500/50' : 'bg-amber-500/50'
                  }`} />
                </div>
                <span className="text-stone-300 font-serif text-sm group-hover:text-gold-200 transition-colors">{comp.name}</span>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-[1px] bg-stone-800" />
                  <span className={`text-[8px] uppercase font-mono ${
                    comp.status === 'Functional' ? 'text-emerald-500/70' : 'text-amber-500/70'
                  }`}>
                    {comp.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Substrate Signature */}
      <footer className="mt-16 pt-8 border-t border-white/5 text-center">
        <span className="text-[10px] text-stone-600 font-mono uppercase tracking-[0.3em] opacity-50 hover:opacity-100 transition-opacity">
          Symbiote Protocol // Artifact Substrate v2.1.0-STABLE
        </span>
      </footer>
    </div>
  );
};
