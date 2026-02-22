'use client';

import React, { useState, useEffect } from 'react';
import TerminalInterface from '@/components/lore/TerminalInterface';
import TerminalGrid from '@/components/lore/TerminalGrid';
import AccessDenied from '@/components/lore/AccessDenied';
import { useHackingGame } from '@/hooks/useHackingGame';
import { LoreNode } from '@/components/lore/LoreTypes';

interface InteractiveTerminalProps {
  dynamicLore: LoreNode[];
}

/**
 * Interactive Terminal Wrapper
 * Handles the game state and renders the terminal UI.
 */
export default function InteractiveTerminal({ dynamicLore }: InteractiveTerminalProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // Mock word list for the hacking game - will be expanded in Cycle 58
  const wordList = [
    'VAULT', 'LORE', 'NEXUS', 'VOID', 'GTOVD', 'SUNNY', 'SYNC', 'ARCH',
    'SYMBIO', 'PROTO', 'CORE', 'BOND', 'PULSE', 'GRID', 'LINK', 'GATED'
  ];

  const {
    displayWords,
    attemptsRemaining,
    status,
    logs,
    initGame,
    selectWord
  } = useHackingGame({ 
    difficulty: 'medium', 
    wordList 
  });

  // Initialize game on mount
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Sync unlock state
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => setIsUnlocked(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleReset = () => {
    setIsUnlocked(false);
    initGame();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-end border-b border-[#397789]/20 pb-4">
        <div>
          <div className="text-[10px] tracking-[0.5em] text-[#397789]/60 uppercase mb-2">Secure Uplink Established</div>
          <h1 className="text-3xl md:text-5xl font-['Playfair_Display'] text-[#e2e8f0] lowercase tracking-tighter">
            The <span className="italic text-[#397789]">Terminal</span>
          </h1>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <div className="text-[9px] tracking-[0.2em] text-[#397789]/40 uppercase">GTOVD Protocol // V2.0.26</div>
          <div className="text-[9px] tracking-[0.2em] text-[#d4af37]/60 uppercase">
            Clearance: {isUnlocked ? 'Level 4 [Granted]' : 'Level 4 [Restricted]'}
          </div>
        </div>
      </header>
      
      <main className="relative group min-h-[500px]">
        {status === 'locked' ? (
          <AccessDenied onRetry={handleReset} />
        ) : isUnlocked ? (
          <div className="relative z-0 bg-black/40 backdrop-blur-sm border border-[#397789]/30 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(57,119,137,0.1)]">
            {/* Scanline & CRT Effects */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_3px,3px_100%]" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] z-10" />
            <div className="p-1">
               <TerminalInterface initialLore={dynamicLore} />
            </div>
          </div>
        ) : (
          <TerminalGrid 
            words={displayWords} 
            onWordClick={selectWord} 
            attemptsRemaining={attemptsRemaining} 
            logs={logs}
          />
        )}
      </main>
      
      <footer className="mt-8 flex justify-between items-center text-[9px] text-[#397789]/30 uppercase tracking-[0.3em]">
        <div className="flex gap-6">
          <span className="animate-pulse">● Neural Link Active</span>
          <span>Bitstream: Synchronized</span>
        </div>
        <div className="hidden md:block text-[#d4af37]/40">
          {status === 'active' ? 'AUTHORIZATION_REQUIRED' : status === 'success' ? 'ACCESS_GRANTED' : 'TERMINAL_LOCKED'}
        </div>
      </footer>
    </div>
  );
}
