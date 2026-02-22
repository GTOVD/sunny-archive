import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useHackingGame } from '../../hooks/useHackingGame';
import { useTerminalAudio } from '../../hooks/useTerminalAudio';
import { findSymbolSequences, SymbolSequence } from '../../lib/lore/hint-logic';
import { cn } from '../../lib/utils';

const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?/';
const HEX_START = 0xF92A;

interface TerminalGridProps {
  difficulty?: 'easy' | 'medium' | 'hard';
  onSuccess?: () => void;
  onLockout?: () => void;
  wordListOverride?: string[];
}

interface MatrixLine {
  address: string;
  content: (string | { word: string } | { hint: SymbolSequence })[];
}

export const TerminalGrid: React.FC<TerminalGridProps> = ({ 
  difficulty = 'easy',
  onSuccess,
  onLockout,
  wordListOverride
}) => {
  const { playSound } = useTerminalAudio();
  const [isGlitching, setIsGlitching] = useState(false);

  // Use override or fallback to default
  const wordList = useMemo(() => wordListOverride || [
    'VAULT', 'SCYTHE', 'SACRED', 'PROVENANCE', 'HISTORY', 'ARTIFACT', 
    'ANCIENT', 'RESONANCE', 'GILDED', 'ARCHIVE', 'SHADOW', 'FORGED',
    'LEGACY', 'CRYPTIC', 'CHAMBER', 'OBELISK', 'MANTLE', 'RELIQUARY'
  ], [wordListOverride]);

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

  const [matrixLines, setMatrixLines] = useState<MatrixLine[]>([]);

  // Generate the matrix data with procedurally placed hints
  const generateMatrix = useCallback(() => {
    if (displayWords.length === 0) return;

    const lines: MatrixLine[] = [];
    let wordIndex = 0;
    const lineLength = 12;
    const totalLines = 32;

    for (let i = 0; i < totalLines; i++) {
      const address = (HEX_START + i * 12).toString(16).toUpperCase().padStart(4, '0');
      const content: (string | { word: string } | { hint: SymbolSequence })[] = [];
      let currentLength = 0;

      // Temporary string to detect hints on this line later
      let lineStr = '';

      while (currentLength < lineLength) {
        // Place word
        if (wordIndex < displayWords.length && Math.random() > 0.8 && (lineLength - currentLength) >= displayWords[wordIndex].length) {
          const word = displayWords[wordIndex];
          content.push({ word });
          currentLength += word.length;
          wordIndex++;
        } else {
          // Place random symbol
          const char = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          content.push(char);
          lineStr += char;
          currentLength++;
        }
      }

      // Detect symbol sequences (hints) on the current line's noise
      const detectedHints = findSymbolSequences(lineStr);
      if (detectedHints.length > 0 && Math.random() > 0.5) {
        const hint = detectedHints[0];
        // For simplicity in this procedural pass, we just mark the first detected hint
        // In a high-fidelity pass, we would replace the specific symbol spans with a hint object
        // For now, let's just stick to word selection and global symbol click chance
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

  // Handle game status changes
  useEffect(() => {
    if (status === 'success') {
      playSound('granted');
      onSuccess?.();
    } else if (status === 'locked') {
      playSound('denied');
      onLockout?.();
    }
  }, [status, onSuccess, onLockout, playSound]);

  const handleSymbolClick = () => {
    playSound('keystroke');
    // Chance to trigger functional hints via sequence clicks
    const rand = Math.random();
    if (rand > 0.95) resetAttempts();
    else if (rand > 0.85) removeDud();
  };

  const handleWordSelection = (word: string) => {
    playSound('enter');
    const prevAttempts = attemptsRemaining;
    selectWord(word);
    
    // Check if guess was wrong
    if (attemptsRemaining < prevAttempts && status !== 'success') {
      setIsGlitching(true);
      playSound('denied', 0.1);
      setTimeout(() => setIsGlitching(false), 200);
    }
  };

  return (
    <div className={cn(
      "terminal-container min-h-[600px] w-full bg-[#020617] p-8 font-mono text-[#d4af37] selection:bg-[#d4af37] selection:text-[#020617] overflow-hidden animate-phosphor crt-screen",
      isGlitching && "animate-terminal-glitch"
    )}>
      <div className="relative z-10 grid grid-cols-12 gap-8 border border-[#d4af37]/20 bg-black/40 p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.1)] rounded-sm h-[700px]">
        
        {/* Header Area */}
        <div className="col-span-12 mb-4 border-b border-[#d4af37]/20 pb-4">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <h1 className="tracking-[0.2em] uppercase font-bold animate-pulse gold-bloom">ROBOCO INDUSTRIES (TM) TERMLINK</h1>
            <div className="text-right hidden sm:block opacity-60">
              <p>PORT 80 ACTIVE</p>
              <p>USER: ADMIN</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm uppercase tracking-widest">{attemptsRemaining} ATTEMPT(S) LEFT:</span>
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-3 h-4 border border-[#d4af37]/40 transition-all duration-500",
                    i < attemptsRemaining ? "bg-[#d4af37] shadow-[0_0_10px_#d4af37]" : "bg-transparent opacity-20"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Matrix Area */}
        <div className="col-span-8 grid grid-cols-2 gap-x-12 overflow-hidden h-[500px] leading-tight text-sm sm:text-base select-none">
          {[0, 1].map((side) => (
            <div key={side} className="space-y-1">
              {matrixLines.slice(side * 16, (side + 1) * 16).map((line, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <span className="opacity-30 text-xs">{line.address}</span>
                  <div className="flex flex-wrap">
                    {line.content.map((part, j) => (
                      typeof part === 'string' ? (
                        <span 
                          key={j} 
                          onClick={handleSymbolClick}
                          className="hover:bg-[#d4af37] hover:text-[#020617] cursor-pointer transition-colors duration-75 px-[1px]"
                        >
                          {part}
                        </span>
                      ) : (
                        <span 
                          key={j} 
                          onClick={() => handleWordSelection(part.word)}
                          className="font-bold cursor-pointer hover:bg-[#d4af37] hover:text-[#020617] transition-colors duration-75 px-1 hover-scintillation gold-bloom"
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
          <div className="flex-1 overflow-y-auto space-y-3 text-xs font-bold scrollbar-hide">
            {logs.map((line, i) => (
              <p key={i} className={cn(
                "animate-in fade-in slide-in-from-left-2 duration-300",
                line.includes('GRANTED') ? "text-green-500" : line.includes('DENIED') ? "text-red-500" : ""
              )}>
                {line}
              </p>
            ))}
            {status === 'success' && (
              <div className="mt-4 p-3 bg-[#d4af37]/10 border border-[#d4af37] animate-pulse gold-bloom">
                SYNC COMPLETE. ACCESS GRANTED.
              </div>
            )}
            {status === 'locked' && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-500 text-red-500 animate-pulse">
                FATAL ERROR: SYSTEM LOCKED.
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-[#d4af37]/20 opacity-40">
            <p className="text-[10px]">MEM_DUMP: {Math.random().toString(16).slice(2, 10).toUpperCase()}</p>
            <p className="text-[10px]">SYS_RES: STABLE</p>
          </div>
        </div>

      </div>
    </div>
  );
};
