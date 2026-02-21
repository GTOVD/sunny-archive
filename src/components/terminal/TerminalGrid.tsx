import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useHackingGame } from '../../hooks/useHackingGame';

const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?/';
const HEX_START = 0xF92A;

interface TerminalGridProps {
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const TerminalGrid: React.FC<TerminalGridProps> = ({ difficulty = 'easy' }) => {
  // Mock word list for the terminal
  const wordList = useMemo(() => [
    'VAULT', 'SCYTHE', 'SACRED', 'PROVENANCE', 'HISTORY', 'ARTIFACT', 
    'ANCIENT', 'RESONANCE', 'GILDED', 'ARCHIVE', 'SHADOW', 'FORGED',
    'LEGACY', 'CRYPTIC', 'CHAMBER', 'OBELISK', 'MANTLE', 'RELIQUARY'
  ], []);

  const {
    displayWords,
    attemptsRemaining,
    status,
    logs,
    initGame,
    selectWord,
    removeDud,
    resetAttempts
  } = useHackingGame({ difficulty, wordList });

  const [matrixLines, setMatrixLines] = useState<{ address: string; content: (string | { word: string })[] }[]>([]);

  // Generate the matrix data
  const generateMatrix = useCallback(() => {
    if (displayWords.length === 0) return;

    const lines: { address: string; content: (string | { word: string })[] }[] = [];
    let wordIndex = 0;
    const lineLength = 12;
    const totalLines = 32; // 16 per side

    for (let i = 0; i < totalLines; i++) {
      const address = (HEX_START + i * 12).toString(16).toUpperCase().padStart(4, '0');
      const content: (string | { word: string })[] = [];
      let currentLength = 0;

      while (currentLength < lineLength) {
        // Decide whether to place a word or symbols
        if (wordIndex < displayWords.length && Math.random() > 0.7 && (lineLength - currentLength) >= displayWords[wordIndex].length) {
          const word = displayWords[wordIndex];
          content.push({ word });
          currentLength += word.length;
          wordIndex++;
        } else {
          const symbolCount = Math.min(1, lineLength - currentLength);
          const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          content.push(randomSymbol);
          currentLength += symbolCount;
        }
      }
      lines.push({ address: `0x${address}`, content });
    }
    setMatrixLines(lines);
  }, [displayWords]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    generateMatrix();
  }, [generateMatrix]);

  const handleSymbolClick = () => {
    // Basic symbol sequence interaction (chance to trigger hints)
    const rand = Math.random();
    if (rand > 0.9) resetAttempts();
    else if (rand > 0.7) removeDud();
  };

  return (
    <div className="terminal-container min-h-[600px] w-full bg-[#020617] p-8 font-mono text-[#d4af37] selection:bg-[#d4af37] selection:text-[#020617] overflow-hidden">
      {/* Phosphor Effect Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-30" />
      
      <div className="relative z-10 grid grid-cols-12 gap-8 border border-[#d4af37]/20 bg-black/40 p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.1)] rounded-sm h-[700px]">
        
        {/* Header Area */}
        <div className="col-span-12 mb-4 border-b border-[#d4af37]/20 pb-4">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <h1 className="tracking-[0.2em] uppercase font-bold animate-pulse">ROBOCO INDUSTRIES (TM) TERMLINK</h1>
            <div className="text-right hidden sm:block">
              <p>PORT 80 ACTIVE</p>
              <p>USER: ADMIN</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm uppercase tracking-widest">{attemptsRemaining} ATTEMPT(S) LEFT:</span>
            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-4 border border-[#d4af37]/40 ${i < attemptsRemaining ? 'bg-[#d4af37]' : 'bg-transparent'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Matrix Area */}
        <div className="col-span-8 grid grid-cols-2 gap-x-12 overflow-hidden h-[500px] leading-none text-sm sm:text-base">
          {[0, 1].map((side) => (
            <div key={side} className="space-y-1">
              {matrixLines.slice(side * 16, (side + 1) * 16).map((line, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <span className="opacity-40">{line.address}</span>
                  <div className="flex">
                    {line.content.map((part, j) => (
                      typeof part === 'string' ? (
                        <span 
                          key={j} 
                          onClick={handleSymbolClick}
                          className="hover:bg-[#d4af37] hover:text-[#020617] cursor-pointer transition-colors"
                        >
                          {part}
                        </span>
                      ) : (
                        <span 
                          key={j} 
                          onClick={() => selectWord(part.word)}
                          className="font-bold cursor-pointer hover:bg-[#d4af37] hover:text-[#020617] transition-colors decoration-dotted underline-offset-4"
                        >
                          {part.word}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Output Log / Status Panel */}
        <div className="col-span-4 border-l border-[#d4af37]/20 pl-6 flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto space-y-2 text-xs font-bold scrollbar-hide">
            {logs.map((line, i) => (
              <p key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                {line}
              </p>
            ))}
            {status === 'success' && (
              <div className="mt-4 p-2 bg-[#d4af37]/10 border border-[#d4af37] animate-pulse">
                SYNC COMPLETE. ACCESS GRANTED.
              </div>
            )}
            {status === 'locked' && (
              <div className="mt-4 p-2 bg-red-900/20 border border-red-500 text-red-500 animate-pulse">
                FATAL ERROR: SYSTEM LOCKED.
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-[#d4af37]/20">
            <p className="text-[10px] opacity-40">MEM_DUMP: {Math.random().toString(16).slice(2, 10).toUpperCase()}</p>
          </div>
        </div>

      </div>
    </div>
  );
};
