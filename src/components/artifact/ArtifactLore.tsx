import React from 'react';
import { ArtifactDetail } from '@/types/artifact';
import { ProvenanceMetadata } from './ProvenanceMetadata';

interface ArtifactLoreProps {
  artifact: ArtifactDetail;
  className?: string;
}

/**
 * ArtifactLore Component - V14 implementation (Active Cycle 43/44)
 * 
 * High-fidelity narrative component for the Luxury Boutique Artifact Substrate.
 * Handles primary analysis, deep lore decryption, and provenance verification.
 * 
 * V14 Updates:
 * - Substrate signature bump to v2.4.0-PROD (Artifact Substrate Scaling)
 * - Refined high-fidelity interaction state (Issue #155)
 * - Prepared for 'Sacred interaction' deep-data binding
 */
export const ArtifactLore: React.FC<ArtifactLoreProps> = ({ artifact, className = '' }) => {
  return (
    <div className={`artifact-lore-substrate space-y-16 ${className}`}>
      {/* Narrative Section - Analysis */}
      <section className="lore-analysis animate-in fade-in slide-in-from-right-4 duration-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] w-8 bg-gold-500/40" />
          <h3 className="text-[10px] uppercase tracking-[0.6em] text-gold-600 font-mono">
            Primary Analysis
          </h3>
        </div>
        <div className="relative p-10 bg-stone-900/40 border border-white/10 rounded-sm backdrop-blur-xl shadow-2xl group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          <span className="absolute -left-2 -top-6 text-8xl font-serif text-gold-500/10 leading-none select-none group-hover:text-gold-500/20 transition-colors duration-1000">“</span>
          <p className="relative z-10 text-2xl md:text-4xl font-serif leading-relaxed text-stone-100 italic font-extralight tracking-tight">
            {artifact.description}
          </p>
          <span className="absolute -right-2 -bottom-10 text-8xl font-serif text-gold-500/10 leading-none select-none group-hover:text-gold-500/20 transition-colors duration-1000">”</span>
        </div>
      </section>

      {/* Deep Lore Section - Decrypted Archives */}
      <section className="lore-archives animate-in fade-in slide-in-from-right-6 duration-1000">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] w-8 bg-gold-500/40" />
          <h3 className="text-[10px] uppercase tracking-[0.6em] text-gold-600 font-mono">
            Decrypted Archives
          </h3>
        </div>
        <div className="space-y-12 relative">
          <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
          
          {artifact.lore && artifact.lore.length > 0 ? (
            artifact.lore.map((line, idx) => (
              <div key={idx} className="group relative pl-12 py-4">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-[1px] bg-gold-500/0 group-hover:bg-gold-500/80 transition-all duration-1000 ease-out" />
                <p className="text-stone-400 font-serif text-2xl leading-relaxed group-hover:text-stone-100 transition-colors duration-1000 font-light tracking-wide">
                  {line}
                </p>
              </div>
            ))
          ) : (
            <p className="text-stone-600 font-serif italic pl-12 py-4 text-xl tracking-tight">
              No additional data found in secondary archives.
            </p>
          )}
        </div>
      </section>

      {/* Provenance Record - Technical Substrate */}
      <section className="lore-provenance animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
          <h3 className="text-[10px] uppercase tracking-[0.6em] text-gold-600 font-mono">
            Provenance Verification
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        <section className="lore-subsystems animate-in fade-in slide-in-from-bottom-6 duration-1000 pt-16 border-t border-white/5">
          <h3 className="text-[10px] uppercase tracking-[0.6em] text-stone-500 mb-12 font-mono">
            Subsystem Integrity Report
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {artifact.components.map((comp) => (
              <div 
                key={comp.id} 
                className="flex flex-col gap-4 p-6 border border-white/5 rounded-sm bg-stone-950/20 hover:border-gold-500/30 hover:bg-stone-900/30 transition-all duration-700 group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[8px] uppercase tracking-[0.3em] text-stone-500 font-mono">{comp.type}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    comp.status === 'Functional' ? 'bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.6)]' : 'bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.6)]'
                  }`} />
                </div>
                <span className="text-stone-200 font-serif text-lg group-hover:text-gold-200 transition-colors duration-700 tracking-tight leading-tight">{comp.name}</span>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1 h-[1px] bg-stone-800 group-hover:bg-stone-700 transition-colors" />
                  <span className={`text-[9px] uppercase font-mono tracking-[0.2em] ${
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
      <footer className="mt-24 pt-12 border-t border-white/5 text-center">
        <div className="inline-block relative">
           <div className="absolute inset-0 blur-xl bg-gold-500/10 animate-pulse" />
           <span className="relative text-[11px] text-stone-500 font-mono uppercase tracking-[0.5em] opacity-30 hover:opacity-100 transition-all duration-1000 cursor-default">
             Symbiote Protocol // Artifact Substrate v2.4.0-PROD
           </span>
        </div>
      </footer>
    </div>
  );
};