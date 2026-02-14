'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine, TerminalState } from '@/lib/lore/types';
import { LoreEngine } from '@/lib/lore/engine';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';

/**
 * Interactive Lore Terminal
 * An immersive, luxury-tier console for interacting with the Sunny Archive lore.
 */
export default function Terminal() {
  const [state, setState] = useState<TerminalState>({
    history: [
      {
        type: 'system',
        content: 'ZOWN_OS v4.0.0 INITIALIZED...',
        timestamp: new Date().toISOString()
      },
      {
        type: 'system',
        content: 'CONNECTED TO SUNNY_ARCHIVE CENTRAL BUFFER.',
        timestamp: new Date().toISOString()
      },
      {
        type: 'output',
        content: "Type 'HELP' to begin exploration.",
        timestamp: new Date().toISOString()
      }
    ],
    isLocked: false,
    currentUser: null,
  });

  const engine = LoreEngine.getInstance();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.history]);

  const handleCommand = (command: string) => {
    if (command.toLowerCase() === 'clear') {
      setState(prev => ({ ...prev, history: [] }));
      return;
    }

    const inputLine: TerminalLine = {
      type: 'input',
      content: command,
      timestamp: new Date().toISOString()
    };

    const outputLines = engine.processCommand(command, state);

    setState(prev => ({
      ...prev,
      history: [...prev.history, inputLine, ...outputLines]
    }));
  };

  return (
    <div className="flex flex-col w-full max-w-4xl h-[600px] bg-black border border-stone-800 rounded-sm shadow-2xl overflow-hidden font-mono text-sm">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-stone-900 border-b border-stone-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-stone-700" />
          <div className="w-3 h-3 rounded-full bg-stone-700" />
          <div className="w-3 h-3 rounded-full bg-stone-700" />
        </div>
        <span className="text-stone-500 uppercase tracking-widest text-[10px]">Sacred Lore Interface</span>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto scrollbar-hide space-y-2 selection:bg-stone-800 selection:text-white"
      >
        <TerminalOutput history={state.history} />
      </div>

      {/* Terminal Footer / Input */}
      <div className="p-4 bg-stone-950 border-t border-stone-900">
        <TerminalInput onCommand={handleCommand} disabled={state.isLocked} />
      </div>
    </div>
  );
}
