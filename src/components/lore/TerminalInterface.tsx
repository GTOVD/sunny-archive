'use client';

/**
 * TERMINAL INTERFACE COMPONENT
 * A high-fidelity, interactive terminal for exploring Sacred Lore.
 * Features: Real-time command history, automatic scrolling, and a luxury aesthetic.
 */

import React, { useState, useEffect, useRef } from 'react';
import { TerminalCommand } from './LoreTypes';
import { INITIAL_GREETING, processCommand } from '../../lib/lore/terminal-logic';
import Typewriter from './Typewriter';

export const TerminalInterface: React.FC = () => {
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [input, setInput] = useState('');
  const [isBooted, setIsBooted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Boot sequence simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsBooted(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom on history change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);
    const output = processCommand(input);
    const newCommand: TerminalCommand = {
      input,
      output,
      timestamp: Date.now(),
    };

    setHistory((prev) => [...prev, newCommand]);
    setInput('');

    // Handle command-specific client-side side effects
    if (input.trim().toUpperCase() === 'CLEAR') {
      setTimeout(() => setHistory([]), 500);
    }
  };

  if (!isBooted) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-black text-amber-500 font-mono border border-amber-900/30 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="animate-pulse tracking-[0.2em] text-xs">ESTABLISHING UPLINK...</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full max-w-4xl mx-auto bg-black border border-amber-900/50 rounded-lg shadow-2xl p-6 font-mono text-amber-500 relative overflow-hidden"
      style={{ boxShadow: '0 0 40px rgba(120, 50, 0, 0.15)' }}
    >
      {/* Aesthetic scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
      
      <div 
        ref={terminalRef}
        className="h-[450px] overflow-y-auto mb-4 scrollbar-hide space-y-4 relative z-0"
      >
        <div className="space-y-1 opacity-50">
          {INITIAL_GREETING.map((line, i) => (
            <div key={`boot-${i}`} className="text-[10px] text-amber-700/70">{line}</div>
          ))}
        </div>
        
        {history.map((cmd, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-amber-900/50 text-xs">RESEARCHER@ARCHIVE:~$</span>
              <span className="text-amber-200">{cmd.input}</span>
            </div>
            <div className="whitespace-pre-wrap text-amber-400/90 pl-4 border-l border-amber-900/30 text-sm leading-relaxed">
              <Typewriter 
                text={cmd.output} 
                speed={10} 
                onComplete={() => i === history.length - 1 && setIsProcessing(false)}
              />
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="flex items-center space-x-2 border-t border-amber-900/20 pt-4 relative z-0">
        <span className="text-amber-700 text-xs">RESEARCHER@ARCHIVE:~$</span>
        <input 
          autoFocus
          type="text"
          value={input}
          disabled={isProcessing}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isProcessing ? "PROCESSING..." : "ENTER COMMAND (e.g., 'HELP')"}
          className="flex-1 bg-transparent border-none outline-none text-amber-500 placeholder-amber-900/30 text-sm focus:ring-0"
        />
      </form>
    </div>
  );
};

export default TerminalInterface;
