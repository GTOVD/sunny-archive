import React from 'react';
import { Artifact } from '@/types/artifact';

interface ArtifactDetailOverlayProps {
  artifact: Artifact;
  isOpen: boolean;
  onClose: () => void;
}

export const ArtifactDetailOverlay: React.FC<ArtifactDetailOverlayProps> = ({
  artifact,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity duration-700 animate-in fade-in"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-7xl h-full max-h-[90vh] bg-stone-950 border border-gold-500/20 rounded-sm shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 fade-in duration-500">
        
        {/* Visual Engine (Left/Top) */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-black flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] animate-pulse" />
          
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-20 bg-[length:100%_4px,3px_100%]" />
          
          {artifact.imageUrl ? (
            <img 
              src={artifact.imageUrl} 
              alt={artifact.title}
              className="relative z-10 max-w-[80%] max-h-[80%] object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-transform duration-1000 group-hover:scale-110"
            />
          ) : (
            <div className="text-gold-900/10 font-serif text-4xl uppercase tracking-tighter italic">Data Redacted</div>
          )}

          {/* Corner Accents */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-gold-500/20" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-gold-500/20" />
        </div>

        {/* Intelligence Tier (Right/Bottom) */}
        <div className="flex-1 flex flex-col h-full bg-stone-950 border-l border-gold-500/10">
          
          {/* Header */}
          <div className="px-8 pt-10 pb-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold-500/40" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold-500/60 font-mono">Archive Record // {artifact.id}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-gold-400 uppercase tracking-tighter leading-none">
              {artifact.title}
            </h2>
            <div className="flex gap-4">
               <span className="px-3 py-1 border border-gold-500/20 rounded-full text-[9px] uppercase tracking-widest text-gold-500/80 font-mono bg-gold-500/5">
                {artifact.rarity}
               </span>
               <span className="px-3 py-1 border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-stone-400 font-mono">
                {artifact.metadata.origin}
               </span>
            </div>
          </div>

          {/* Scrolled Content */}
          <div className="flex-1 overflow-y-auto px-8 pb-10 space-y-12 scrollbar-thin scrollbar-thumb-gold-500/20">
            
            {/* Analysis */}
            <section className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-gold-600 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                Strategic Analysis
              </h3>
              <p className="text-xl md:text-2xl font-serif text-stone-200 leading-relaxed italic opacity-90">
                "{artifact.description}"
              </p>
            </section>

            {/* Lore */}
            <section className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-gold-600 font-mono">Decrypted Narrative</h3>
              <div className="space-y-6">
                {artifact.lore.map((line, i) => (
                  <p key={i} className="text-stone-400 font-serif leading-loose border-l-2 border-gold-500/10 pl-8 transition-colors hover:border-gold-500/30">
                    {line}
                  </p>
                ))}
              </div>
            </section>

            {/* Attributes Grid */}
            <section className="pt-8 border-t border-gold-500/10">
              <div className="grid grid-cols-2 gap-8">
                {artifact.stats && Object.entries(artifact.stats).map(([key, val]) => (
                  <div key={key} className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-gold-500/40 font-mono">{key}</span>
                    <p className="text-stone-300 font-mono tracking-tight text-lg">{val}</p>
                  </div>
                ))}
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-gold-500/40 font-mono">Temporal Era</span>
                  <p className="text-stone-300 font-serif text-lg">{artifact.metadata.era}</p>
                </div>
              </div>
            </section>

          </div>

          {/* Close Trigger */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-gold-500/40 hover:text-gold-400 transition-colors p-2"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Status Bar */}
          <div className="px-8 py-4 bg-black/40 border-t border-gold-500/10 flex justify-between items-center">
            <div className="flex items-center gap-4 text-[9px] font-mono text-gold-900/60 uppercase tracking-[0.2em]">
              <span>Status: Synchronized</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500/40" />
              <span>Symbiote Protocol // V4.0</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
