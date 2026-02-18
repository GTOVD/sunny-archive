import React from 'react';
import { ArtifactDetail } from '@/types/artifact';
import { ProvenanceMetadata } from './ProvenanceMetadata';

interface ArtifactLoreProps {
  artifact: ArtifactDetail;
  className?: string;
}

/**
 * ArtifactLore Component - V12 implementation (Active Cycle 40)
 * 
 * High-fidelity narrative component for the Luxury Boutique Artifact Substrate.
 * Handles primary analysis, deep lore decryption, and provenance verification.
 * 
 * V12 Updates:
 * - Refined glassmorphism layers (nested backdrops)
 * - Enhanced transition states for subsystem reports
 * - Signature bump to v2.2.0-PROD
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
        <div className="relative p-8 bg-stone-900/60 border border-white/10 rounded-sm backdrop-blur-md shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />
          <span className="absolute -left-2 -top-4 text-7xl font-serif text-gold-500/10 leading-none select-none">“</span>
          <p className="relative z-10 text-xl md:text-3xl font-serif leading-relaxed text-stone-100 italic font-extralight tracking-tight">
            {artifact.description}
          </p>
          <span className="absolute -right-2 -bottom-8 text-7xl font-serif text-gold-500/10 leading-none select-none">”</span>
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
        <div className="space-y-10 relative">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
          
          {artifact.lore && artifact.lore.length > 0 ? (
            artifact.lore.map((line, idx) => (
              <div key={idx} className="group relative pl-10 py-3">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-gold-500/0 group-hover:bg-gold-500/60 transition-all duration-700 ease-out" />
                <p className="text-stone-400 font-serif text-xl leading-relaxed group-hover:text-stone-100 transition-colors duration-700 font-light">
                  {line}
                </p>
              </div>
            ))
          ) : (
            <p className="text-stone-600 font-serif italic pl-10 py-2 text-lg">
              No additional data found in secondary archives.
            </p>
          )}
        </div>
      </section>

      {/* Provenance Record - Technical Substrate */}
      <section className="lore-provenance animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(212,175,55,1)]" />
          <h3 className="text-[9px] uppercase tracking-[0.5em] text-gold-600 font-mono">
            Provenance Verification
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        <section className="lore-subsystems animate-in fade-in slide-in-from-bottom-6 duration-1000 pt-12 border-t border-white/10">
          <h3 className="text-[9px] uppercase tracking-[0.5em] text-stone-500 mb-10 font-mono">
            Subsystem Integrity Report
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {artifact.components.map((comp) => (
              <div 
                key={comp.id} 
                className="flex flex-col gap-3 p-5 border border-white/5 rounded-sm bg-stone-950/40 hover:border-gold-500/40 hover:bg-stone-900/40 transition-all duration-500 group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[7px] uppercase tracking-[0.2em] text-stone-500 font-mono">{comp.type}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    comp.status === 'Functional' ? 'bg-emerald-500/70 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500/70 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                  }`} />
                </div>
                <span className="text-stone-300 font-serif text-base group-hover:text-gold-200 transition-colors duration-500 tracking-tight">{comp.name}</span>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1 h-[1px] bg-stone-800 group-hover:bg-stone-700 transition-colors" />
                  <span className={`text-[8px] uppercase font-mono tracking-widest ${
                    comp.status === 'Functional' ? 'text-emerald-500/90' : 'text-amber-500/90'
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
      <footer className="mt-20 pt-10 border-t border-white/10 text-center">
        <div className="inline-block relative">
           <div className="absolute inset-0 blur-lg bg-gold-500/5" />
           <span className="relative text-[10px] text-stone-500 font-mono uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-all duration-1000">
             Symbiote Protocol // Artifact Substrate v2.2.0-PROD
           </span>
        </div>
      </footer>
    </div>
  );
};