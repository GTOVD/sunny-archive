'use client';

/**
 * TERMINAL INTERFACE COMPONENT
 * A high-fidelity, interactive terminal for exploring Sacred Lore.
 * Features: Real-time command history, automatic scrolling, and a luxury aesthetic.
 */

import React, { useState, useEffect, useRef } from 'react';
import { TerminalCommand, LoreNode } from './LoreTypes';
import { INITIAL_GREETING, processCommand, injectLore } from '../../lib/lore/terminal-logic';
import Typewriter from './Typewriter';

interface TerminalInterfaceProps {
  initialLore?: LoreNode[];
}

export const TerminalInterface: React.FC<TerminalInterfaceProps> = ({ initialLore }) => {
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [input, setInput] = useState('');
  const [isBooted, setIsBooted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Inject dynamic lore on mount
  useEffect(() => {
    if (initialLore && initialLore.length > 0) {
      injectLore(initialLore);
      // Optional: Add a system log about the sync without cluttering the initial view
      // This will appear if the user scrolls up or after they type a command, technically it's just in state
      // Better to just let the STATUS command reflect it.
    }
  }, [initialLore]);

  // Boot sequence simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooted(true);
      if (initialLore && initialLore.length > 0) {
        setHistory(prev => [
          ...prev, 
          { 
            input: 'SYS_EVENT', 
            output: `> REMOTE UPLINK ESTABLISHED.\n> DOWNLOADED ${initialLore.length} FRAGMENTS FROM ARCHIVE CORE.`, 
            timestamp: Date.now() 
          }
        ]);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [initialLore]);

  // Auto-scroll to bottom on history change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const currentInput = input;
    setIsProcessing(true);
    setInput('');

    // Small delay to simulate processing and wait for state update
    setTimeout(() => {
      const output = processCommand(currentInput);
      const newCommand: TerminalCommand = {
        input: currentInput,
        output,
        timestamp: Date.now(),
      };

      setHistory((prev) => [...prev, newCommand]);

      // Handle command-specific client-side side effects
      if (currentInput.trim().toUpperCase() === 'CLEAR') {
        setTimeout(() => setHistory([]), 500);
      }
    }, 100);
  };

  if (!isBooted) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-black text-[#397789] font-mono border border-[#397789]/30 rounded-sm">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 border-t-2 border-[#397789] rounded-full animate-spin" />
          <div className="flex flex-col items-center gap-1">
            <span className="animate-pulse tracking-[0.4em] text-[10px] uppercase">Establishing Neural Link</span>
            <span className="text-[9px] text-[#397789]/40 tracking-widest uppercase">Protocol: GTOVD-V2</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full bg-black/80 p-6 md:p-10 font-mono text-[#397789] relative overflow-hidden min-h-[600px] flex flex-col"
    >
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto mb-6 scrollbar-hide space-y-6 relative z-0"
      >
        <div className="space-y-1 opacity-40 text-[10px] uppercase tracking-wider mb-8">
          {INITIAL_GREETING.map((line, i) => (
            <div key={`boot-${i}`}>{line}</div>
          ))}
        </div>
        
        {history.map((cmd, i) => (
          <div key={i} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[#397789]/40 text-[10px] tracking-widest uppercase">GTOVD@VAULT:~$</span>
              <span className="text-[#e2e8f0] tracking-wider">{cmd.input}</span>
            </div>
            <div className="whitespace-pre-wrap text-[#397789] pl-6 border-l border-[#397789]/20 text-sm leading-relaxed tracking-wide font-medium">
              <Typewriter 
                text={cmd.output} 
                speed={8} 
                onComplete={() => i === history.length - 1 && setIsProcessing(false)}
              />
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-4 border-t border-[#397789]/20 pt-6 relative z-0">
        <span className="text-[#397789]/60 text-[10px] tracking-widest uppercase shrink-0">GTOVD@VAULT:~$</span>
        <input 
          autoFocus
          type="text"
          value={input}
          disabled={isProcessing}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isProcessing ? "SYNCHRONIZING..." : "AWAITING INPUT (HELP/LIST/SYSTEM)"}
          className="flex-1 bg-transparent border-none outline-none text-[#e2e8f0] placeholder-[#397789]/20 text-sm focus:ring-0 tracking-wider"
        />
      </form>
    </div>
  );
};

export default TerminalInterface;
