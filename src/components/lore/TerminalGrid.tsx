import React from 'react';

interface TerminalGridProps {
  words: string[];
  onWordClick: (word: string) => void;
  attemptsRemaining: number;
  logs: string[];
  onHintClick?: (kind: 'dud' | 'reset') => void;
}

/**
 * TerminalGrid Component
 * High-fidelity Hex Matrix UI for the Fallout-style hacking game.
 * Uses Luxury Boutique design tokens (#020617, #d4af37).
 * V2: Supports symbol-sequence hints.
 */
const TerminalGrid: React.FC<TerminalGridProps> = ({ words, onWordClick, attemptsRemaining, logs, onHintClick }) => {
  const rows = 16;
  const cols = 12;

  const hexAddresses = React.useMemo(() => {
    return Array.from({ length: rows * 2 }, () => 
      `0x${Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0')}`
    );
  }, []);

  const noiseChars = "!@#$%^&*()_+{}[]:;<>?,./|~`-=".split('');

  const generateNoise = (length: number) => {
    return Array.from({ length }, () => noiseChars[Math.floor(Math.random() * noiseChars.length)]).join('');
  };

  /**
   * Render a matrix row with noise, potential words, and hints
   */
  const renderMatrixRow = (index: number, columnWords: string[]) => {
    const address = hexAddresses[index];
    const wordIndex = Math.floor(index / 2);
    const word = columnWords[wordIndex];

    // Simple hint trigger logic for specific rows
    const hasHint = index === 5 || index === 22;
    const hintKind = index === 5 ? 'dud' : 'reset';

    return (
      <div key={index} className="flex gap-4 items-center group/row opacity-70 hover:opacity-100 transition-all duration-300">
        <span className="text-[#d4af37]/40 text-[10px] font-mono w-12">{address}</span>
        <div className="flex font-mono text-xs tracking-widest break-all">
          {word && index % 2 === 0 ? (
            <>
              <span className="text-[#d4af37]/60">{generateNoise(2)}</span>
              <button 
                onClick={() => onWordClick(word)}
                className="text-[#d4af37] hover:bg-[#d4af37] hover:text-[#020617] px-1 transition-all duration-150 font-bold"
              >
                {word}
              </button>
              <span className="text-[#d4af37]/60">{generateNoise(cols - 2 - word.length)}</span>
            </>
          ) : hasHint ? (
            <button 
              onClick={() => onHintClick?.(hintKind)}
              className="text-[#397789] hover:bg-[#397789] hover:text-[#020617] px-1 transition-all"
            >
              {"[.,!;]".slice(0, 6)}
            </button>
          ) : (
            <span className="text-[#d4af37]/60">{generateNoise(cols)}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="terminal-grid-container grid grid-cols-12 gap-6 font-mono text-[#d4af37] bg-[#020617] p-8 border border-[#d4af37]/30 rounded-lg backdrop-blur-2xl shadow-[0_0_50px_rgba(212,175,55,0.1)]">
      <div className="col-span-12 mb-8 border-b border-[#d4af37]/20 pb-6 flex justify-between items-end">
        <div className="system-identity">
          <div className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37]/40 mb-1">Secure Uplink</div>
          <h2 className="text-xl font-['Cinzel'] tracking-[0.2em] text-[#d4af37]">Resonance Matrix</h2>
        </div>
        <div className="attempts-hud flex flex-col items-end gap-3">
          <div className="text-[9px] uppercase tracking-widest text-[#d4af37]/60">Attempts Remaining</div>
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-sm transform rotate-45 border border-[#d4af37]/50 transition-all duration-500 ${
                  i < attemptsRemaining 
                    ? 'bg-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.6)]' 
                    : 'bg-transparent opacity-20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 h-[450px] overflow-hidden select-none">
        <div className="matrix-column flex flex-col gap-1">
          {[...Array(rows)].map((_, i) => renderMatrixRow(i, words.slice(0, 8)))}
        </div>
        <div className="matrix-column flex flex-col gap-1 border-l border-[#d4af37]/10 pl-12">
          {[...Array(rows)].map((_, i) => renderMatrixRow(i + rows, words.slice(8, 16)))}
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 flex flex-col h-[450px] border-l border-[#d4af37]/20 pl-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-1 bg-[#d4af37] rounded-full animate-ping" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/40">Monitor_Active</span>
        </div>
        
        <div className="log-scroll flex-grow overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {logs.map((log, i) => (
            <div 
              key={i} 
              className={`text-[11px] leading-relaxed transition-all duration-500 animate-in fade-in slide-in-from-left-2 ${
                log.includes('GRANTED') ? 'text-green-500 font-bold' : 
                log.includes('DENIED') ? 'text-red-500' : 
                log.includes('HINT') ? 'text-[#397789] italic' : 'text-[#d4af37]/80'
              }`}
            >
              <span className="opacity-40 mr-2">[{new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}]</span>
              {log}
            </div>
          ))}
          <div className="cursor-blink w-2 h-3 bg-[#d4af37]/40 inline-block animate-pulse ml-1" />
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(212, 175, 55, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.2);
        }
      `}</style>
    </div>
  );
};

export default TerminalGrid;
