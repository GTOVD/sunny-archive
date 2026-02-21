import React, { useState, useEffect } from 'react';
import { useHackingGame } from '../../hooks/useHackingGame';
import { cn } from '../../lib/utils'; // Assuming cn utility exists for tailwind classes

interface TerminalGridProps {
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const TerminalGrid: React.FC<TerminalGridProps> = ({ difficulty = 'easy' }) => {
  const {
    status,
    attemptsRemaining,
    words,
    outputLog,
    startGame,
    guessWord,
    triggerDudRemoval,
    triggerAttemptReset
  } = useHackingGame({ difficulty });

  // Internal state for the visual noise/hex matrix
  const [matrixLines, setMatrixLines] = useState<{ address: string; content: string }[]>([]);

  useEffect(() => {
    // Initialization: Start game with some dummy words for now
    // In a real scenario, these would come from artifact metadata
    startGame(['SCYTHE', 'VAULT', 'ARCHIVE', 'SACRED', 'PROVENANCE', 'HISTORY', 'ARTIFACT', 'ANCIENT']);
  }, [startGame]);

  return (
    <div className="terminal-container min-h-[600px] w-full bg-[#020617] p-8 font-mono text-[#d4af37] selection:bg-[#d4af37] selection:text-[#020617]">
      {/* Phosphor Effect Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      <div className="relative z-10 grid grid-cols-12 gap-8 border border-[#d4af37]/20 bg-black/40 p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.1)] rounded-sm">
        
        {/* Header Area */}
        <div className="col-span-12 mb-6 border-b border-[#d4af37]/20 pb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl tracking-[0.2em] uppercase font-bold animate-pulse">ROBOCO INDUSTRIES UNIFIED OPERATING SYSTEM</h1>
            <div className="text-right">
              <p>COPYRIGHT 2075-2077 ROBOCO INDUSTRIES</p>
              <p>- SERVER 4 -</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-lg">{attemptsRemaining} ATTEMPT(S) LEFT: {Array(attemptsRemaining).fill('█').join(' ')}</p>
          </div>
        </div>

        {/* Matrix Area */}
        <div className="col-span-8 grid grid-cols-2 gap-4">
          <div className="space-y-1 opacity-90 leading-tight cursor-default">
             {/* Hex + Symbols/Words will be mapped here in Stage 3 */}
             <p className="hover:bg-[#d4af37] hover:text-[#020617] transition-colors duration-75">0xF92A  $!&^%VAULT*()_</p>
             <p>0xF936  []{}|;:'",.<>?/</p>
             <p>0xF942  `~@#%^&*()-_=+[]</p>
          </div>
        </div>

        {/* Output Log / Status Panel */}
        <div className="col-span-4 border-l border-[#d4af37]/20 pl-6 flex flex-col h-full min-h-[400px]">
          <div className="flex-1 overflow-y-auto space-y-2 text-sm">
            {outputLog.map((line, i) => (
              <p key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                {line}
              </p>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#d4af37]/20">
            <div className="h-4 bg-[#d4af37]/10 w-full animate-pulse" />
          </div>
        </div>

      </div>
    </div>
  );
};
