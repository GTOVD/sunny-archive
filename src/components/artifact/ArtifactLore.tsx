import React from 'react';
import { ArtifactDetail } from '@/types/artifact';
import { ProvenanceMetadata } from './ProvenanceMetadata';

interface ArtifactLoreProps {
  artifact: ArtifactDetail;
  className?: string;
}

/**
 * ArtifactLore Component - V13 implementation (Active Cycle 42)
 * 
 * High-fidelity narrative component for the Luxury Boutique Artifact Substrate.
 * Handles primary analysis, deep lore decryption, and provenance verification.
 * 
 * V13 Updates:
 * - Introduced 'Relic Resonance' visualization (ambient motion states)
 * - Enhanced typography spacing for boutique high-fidelity
 * - Integrated 'Narrative Pulsar' logic for reactive lore delivery
 * - Signature bump to v2.3.1-PROD
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
          <div className="ml-auto flex items-center gap-2">
            <div className="w-1 h-1 bg-gold-500 rounded-full animate-ping" />
            <span className="text-[8px] uppercase tracking-[0.3em] text-gold-500/60 font-mono">Resonance Active</span>
          </div>
        </div>
        <div className="relative p-10 bg-stone-900/40 border border-white/10 rounded-sm backdrop-blur-xl shadow-2xl group overflow-hidden transition-all duration-1000 hover:border-gold-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          {/* Narrative Pulsar Decoration */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-gold-500/10 transition-colors duration-1000" />
          
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
              <div key={idx} className="group relative pl-12 py-6 border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] transition-colors duration-700">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-[1px] bg-gold-500/0 group-hover:bg-gold-500/80 transition-all duration-1000 ease-out" />
                <p className="text-stone-400 font-serif text-2xl leading-relaxed group-hover:text-stone-100 transition-colors duration-1000 font-light tracking-wide">
                  {line}
                </p>
                <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-gold-600/60 font-mono">Fragment {idx + 1}</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-gold-500/20 to-transparent" />
                </div>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="flex justify-between items-end mb-12">
            <h3 className="text-[10px] uppercase tracking-[0.6em] text-stone-500 font-mono">
              Subsystem Integrity Report
            </h3>
            <span className="text-[9px] font-mono text-gold-600/40 uppercase tracking-widest">
              Total Units: {artifact.components.length}
            </span>
          </div>
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
             Symbiote Protocol // Artifact Substrate v2.3.1-PROD
           </span>
        </div>
      </footer>
    </div>
  );
};