import React from 'react';

interface TerminalGridProps {
  words: string[];
  onWordClick: (word: string) => void;
  attemptsRemaining: number;
}

/**
 * TerminalGrid Component
 * High-fidelity Hex Matrix UI for the Fallout-style hacking game.
 * Uses Luxury Boutique design tokens (#020617, #d4af37).
 */
const TerminalGrid: React.FC<TerminalGridProps> = ({ words, onWordClick, attemptsRemaining }) => {
  // Generate random hex addresses for the sidebar
  const hexAddresses = React.useMemo(() => {
    return Array.from({ length: 16 }, () => 
      `0x${Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0')}`
    );
  }, []);

  return (
    <div className="terminal-grid-container grid grid-cols-12 gap-4 font-mono text-[#d4af37] bg-[#020617] p-6 border border-[#d4af37]/20 rounded-lg backdrop-blur-xl shadow-2xl">
      {/* Header Info */}
      <div className="col-span-12 mb-6 border-b border-[#d4af37]/10 pb-4 flex justify-between items-center">
        <div className="system-status text-[10px] uppercase tracking-[0.3em]">
          Resonance Matrix | V2.3.0
        </div>
        <div className="attempts-remaining flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full ${i < attemptsRemaining ? 'bg-[#d4af37] shadow-[0_0_8px_#d4af37]' : 'bg-[#d4af37]/10'}`}
            />
          ))}
          <span className="text-[10px] uppercase tracking-widest ml-2">Attempts Left</span>
        </div>
      </div>

      {/* Hex Matrix Layout */}
      <div className="col-span-12 md:col-span-8 grid grid-cols-2 gap-8 overflow-hidden h-96">
        <div className="matrix-column space-y-1">
          {hexAddresses.slice(0, 16).map((addr, i) => (
            <div key={i} className="flex gap-4 items-center opacity-60 hover:opacity-100 transition-opacity">
              <span className="text-[#d4af37]/40 text-xs">{addr}</span>
              <span className="text-xs tracking-widest break-all">
                {/* Symbol noise & word placeholder */}
                {i < words.length / 2 ? (
                  <button 
                    onClick={() => onWordClick(words[i])}
                    className="hover:bg-[#d4af37] hover:text-[#020617] px-1 transition-all"
                  >
                    {words[i]}
                  </button>
                ) : (
                  "!@#$%^&*()_+{}[]:;<>?,./".slice(0, 12)
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="matrix-column space-y-1 border-l border-[#d4af37]/5 pl-8">
           {hexAddresses.slice(0, 16).map((addr, i) => (
            <div key={i+16} className="flex gap-4 items-center opacity-60 hover:opacity-100 transition-opacity">
              <span className="text-[#d4af37]/40 text-xs">{addr}</span>
              <span className="text-xs tracking-widest break-all">
                {i + 8 < words.length ? (
                  <button 
                    onClick={() => onWordClick(words[i+8])}
                    className="hover:bg-[#d4af37] hover:text-[#020617] px-1 transition-all"
                  >
                    {words[i+8]}
                  </button>
                ) : (
                  "|~`-=+[]{}()<>?!@#$%^&*".slice(0, 12)
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Log Output */}
      <div className="col-span-12 md:col-span-4 border-l border-[#d4af37]/10 pl-4 h-96 flex flex-col">
        <div className="text-[10px] uppercase tracking-widest text-[#d4af37]/40 mb-4">
          Session Log
        </div>
        <div className="log-output flex-grow overflow-y-auto space-y-2 text-[10px] scrollbar-thin scrollbar-thumb-[#d4af37]/20">
          <div className="text-[#d4af37]/60">{">"} INITIALIZING OVERRIDE...</div>
          <div className="text-[#d4af37]/60">{">"} BUFFER ATTACHED.</div>
        </div>
      </div>
    </div>
  );
};

export default TerminalGrid;
