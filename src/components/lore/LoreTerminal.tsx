'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine } from '@/types/terminal';

export const LoreTerminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newLine: TerminalLine = {
      id: Math.random().toString(36).substring(7),
      text: input,
      type: 'input',
      timestamp: Date.now(),
    };

    setHistory((prev) => [...prev, newLine]);
    setInput('');
    
    // Simulate system response
    setTimeout(() => {
      setHistory((prev) => [...prev, {
        id: Math.random().toString(36).substring(7),
        text: `Command not recognized: ${input}. Accessing Sacred Lore...`,
        type: 'system',
        timestamp: Date.now(),
      }]);
    }, 500);
  };

  return (
    <div className="bg-black text-green-500 font-mono p-4 rounded-lg border border-green-900 h-[600px] flex flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4 space-y-2">
        {history.map((line) => (
          <div key={line.id} className={`${line.type === 'input' ? 'text-white' : ''}`}>
            {line.type === 'input' && <span className="mr-2">$</span>}
            {line.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="flex">
        <span className="mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none flex-1 border-none focus:ring-0 p-0"
          autoFocus
        />
      </form>
    </div>
  );
};
