import React, { useEffect, useState } from 'react';
import { ArtifactDetailProps } from '@/types/artifact';
import { ArtifactLore } from './ArtifactLore';

export const ArtifactDetailView: React.FC<ArtifactDetailProps> = ({ artifact, onClose, isOpen }) => {
  const [activeTab, setActiveTab] = useState<'lore' | 'stats' | 'visual'>('lore');
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-all duration-500">
      <div 
        className="relative w-full max-w-5xl bg-stone-950 border border-gold-500/30 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.1)] flex flex-col h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cinematic Header */}
        <div className="relative flex justify-between items-center px-8 py-6 border-b border-gold-500/20 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-gold-500/40" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold-500/60 font-mono">Archive Entry</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-gold-400 tracking-tight uppercase leading-none">
              {artifact.title}
            </h2>
          </div>
          
          <button 
            onClick={onClose}
            className="group relative p-2 transition-transform hover:scale-110 active:scale-95"
          >
            <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 rounded-full transition-colors" />
            <svg className="w-8 h-8 text-gold-500/40 group-hover:text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex px-8 border-b border-gold-500/10 bg-stone-950/80">
          {[
            { id: 'lore', label: 'Sacred Lore' },
            { id: 'stats', label: 'Attributes' },
            { id: 'visual', label: 'Holographic' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 text-[10px] uppercase tracking-[0.3em] font-mono transition-all duration-300 border-b-2 ${
                activeTab === tab.id 
                  ? 'border-gold-500 text-gold-400 bg-gold-500/5' 
                  : 'border-transparent text-stone-500 hover:text-gold-500/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Main Display Area */}
          <div className="w-full md:w-3/5 bg-black/40 flex items-center justify-center p-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
            
            {artifact.imageUrl ? (
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img 
                  src={artifact.imageUrl} 
                  alt={artifact.title} 
                  className="max-w-full max-h-full object-contain shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 border border-gold-500/5 pointer-events-none" />
              </div>
            ) : (
              <div className="text-gold-900/10 italic font-serif text-6xl select-none uppercase tracking-tighter opacity-20">
                Data Redacted
              </div>
            )}
            
            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold-500/20" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold-500/20" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold-500/20" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold-500/20" />
          </div>

          {/* Content Pane */}
          <div className="w-full md:w-2/5 p-10 bg-stone-950 flex flex-col gap-8 overflow-y-auto border-l border-gold-500/10">
            {activeTab === 'lore' && (
              <ArtifactLore artifact={artifact} />
            )}

            {activeTab === 'stats' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
                <section className="grid grid-cols-1 gap-8">
                  <div className="space-y-2">
                    <h4 className="text-[9px] uppercase tracking-[0.4em] text-gold-600/60 font-mono">Manifestation Rarity</h4>
                    <div className="flex items-center gap-4">
                      <div className="h-2 flex-1 bg-stone-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-gold-600 to-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
                          style={{ width: artifact.rarity === 'Legendary' || artifact.rarity === 'Artifact' ? '100%' : '60%' }}
                        />
                      </div>
                      <span className="text-gold-400 font-mono text-xs uppercase tracking-widest">{artifact.rarity}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <h4 className="text-[9px] uppercase tracking-[0.4em] text-gold-600/60 font-mono mb-1">Origin Node</h4>
                      <p className="text-stone-300 font-serif tracking-wide">{artifact.metadata.origin}</p>
                    </div>
                    <div>
                      <h4 className="text-[9px] uppercase tracking-[0.4em] text-gold-600/60 font-mono mb-1">Temporal Era</h4>
                      <p className="text-stone-300 font-serif tracking-wide">{artifact.metadata.era}</p>
                    </div>
                  </div>

                  {artifact.stats && (
                    <div className="pt-6 border-t border-gold-500/10 grid grid-cols-2 gap-6">
                      {Object.entries(artifact.stats).map(([key, value]) => (
                        <div key={key}>
                          <h4 className="text-[9px] uppercase tracking-[0.4em] text-gold-600/60 font-mono mb-1">{key}</h4>
                          <p className="text-gold-400/80 font-mono text-sm tracking-tighter">{value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}
            
            {activeTab === 'visual' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-16 h-16 border border-gold-500/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-8 h-8 bg-gold-500/10 rounded-full" />
                </div>
                <h3 className="text-[9px] uppercase tracking-[0.5em] text-gold-600 font-mono">Visual Uplink Active</h3>
                <p className="text-stone-500 font-serif text-sm max-w-[200px]">
                  Subjecting object to high-fidelity holographic projection for sensory validation.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-8 py-3 bg-stone-950 border-t border-gold-500/10 flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.3em]">
          <div className="flex gap-6">
            <span className="text-gold-900/40">UUID: {artifact.id}</span>
            <span className="text-emerald-500/40 animate-pulse">● System Stable</span>
          </div>
          <span className="text-gold-500/20">Symbiote Protocol // V3.14</span>
        </div>
      </div>
    </div>
  );
};
