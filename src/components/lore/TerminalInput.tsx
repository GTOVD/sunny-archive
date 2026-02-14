'use client';

import React, { useState } from 'react';

interface TerminalInputProps {
  onCommand: (cmd: string) => void;
  disabled?: boolean;
}

/**
 * TerminalInput
 * Handles the command input line with luxury-themed styling.
 */
export default function TerminalInput({ onCommand, disabled }: TerminalInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onCommand(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <span className="text-stone-500 font-bold">❯</span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        className="flex-1 bg-transparent border-none outline-none text-stone-200 placeholder-stone-800 caret-stone-500"
        placeholder={disabled ? "SYSTEM LOCKED" : "Await input..."}
        autoFocus
        spellCheck={false}
        autoComplete="off"
      />
    </form>
  );
}
