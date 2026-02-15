import React from 'react';
import { ArtifactDetailProps } from '@/types/artifact';

export const ArtifactDetailView: React.FC<ArtifactDetailProps> = ({ artifact, onClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl bg-stone-950 border border-gold-500/30 rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gold-500/20 bg-stone-900/50">
          <h2 className="text-2xl font-serif text-gold-400 tracking-wider uppercase">{artifact.title}</h2>
          <button 
            onClick={onClose}
            className="text-gold-500/50 hover:text-gold-400 transition-colors"
          >
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-[70vh] overflow-y-auto">
          {/* Visual Container */}
          <div className="w-full md:w-1/2 bg-black flex items-center justify-center border-r border-gold-500/10">
            {artifact.imageUrl ? (
              <img src={artifact.imageUrl} alt={artifact.title} className="max-w-full max-h-full object-contain" />
            ) : (
              <div className="text-gold-900/20 italic font-serif">No visual record found</div>
            )}
          </div>

          {/* Data/Lore Container */}
          <div className="w-full md:w-1/2 p-8 space-y-8 font-serif leading-relaxed text-stone-300">
            <section>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold-500/60 mb-2">Description</h3>
              <p className="text-lg">{artifact.description}</p>
            </section>

            <section>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold-500/60 mb-2">Sacred Lore</h3>
              <div className="space-y-4">
                {artifact.lore.map((line, idx) => (
                  <p key={idx} className="italic border-l border-gold-500/20 pl-4">{line}</p>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4 pt-4 border-t border-gold-500/10">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-gold-600/50">Rarity</h4>
                <p className="text-gold-400/80">{artifact.rarity}</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-gold-600/50">Origin</h4>
                <p className="text-stone-400">{artifact.metadata.origin}</p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer/System Info */}
        <div className="p-3 bg-black/40 border-t border-gold-500/10 flex justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-gold-900/40">
          <span>ID: {artifact.id}</span>
          <span>SYMBIONT_PROTOCOL_ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
