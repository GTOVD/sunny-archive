'use client';

/**
 * TERMINAL INTERFACE COMPONENT
 * A high-fidelity, interactive terminal for exploring Sacred Lore.
 * Features: Real-time command history, automatic scrolling, and a luxury aesthetic.
 */

import React, { useState, useEffect, useRef } from 'react';
import { TerminalCommand } from './LoreTypes';
import { INITIAL_GREETING, processCommand } from '../../lib/lore/terminal-logic';

export const TerminalInterface: React.FC = () => {
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [input, setInput] = useState('');
  const [isBooted, setIsBooted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Boot sequence simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsBooted(true), 1000);
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
    if (!input.trim()) return;

    const output = processCommand(input);
    const newCommand: TerminalCommand = {
      input,
      output,
      timestamp: Date.now(),
    };

    setHistory((prev) => [...prev, newCommand]);
    setInput('');

    if (input.toUpperCase().trim() === 'CLEAR') {
      setHistory([]);
    }
  };

  if (!isBooted) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-black text-amber-500 font-mono">
        <span className="animate-pulse">BOOTING...</span>
      </div>
    );
  }

  return (
    <div 
      className="w-full max-w-4xl mx-auto bg-black border border-amber-900/50 rounded-lg shadow-2xl p-6 font-mono text-amber-500"
      style={{ boxShadow: '0 0 20px rgba(120, 50, 0, 0.2)' }}
    >
      <div 
        ref={terminalRef}
        className="h-[400px] overflow-y-auto mb-4 scrollbar-hide space-y-2"
      >
        {INITIAL_GREETING.map((line, i) => (
          <div key={`boot-${i}`} className="text-amber-700/70">{line}</div>
        ))}
        
        {history.map((cmd, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-amber-900">{'>'}</span>
              <span>{cmd.input}</span>
            </div>
            <div className="whitespace-pre-wrap text-amber-400 pl-4 border-l border-amber-900/30">
              {cmd.output}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="flex items-center space-x-2 border-t border-amber-900/20 pt-4">
        <span className="text-amber-900 animate-pulse">{'>'}</span>
        <input 
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER COMMAND..."
          className="flex-1 bg-transparent border-none outline-none text-amber-500 placeholder-amber-900/30"
        />
      </form>
    </div>
  );
};

export default TerminalInterface;
