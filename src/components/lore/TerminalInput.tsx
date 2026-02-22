'use client';

import React, { useState, useEffect, useRef } from 'react';
import TerminalAutocomplete from './TerminalAutocomplete';

interface TerminalInputProps {
  onCommand: (cmd: string) => void;
  disabled?: boolean;
}

/**
 * TerminalInput
 * Handles the command input line with luxury-themed styling and real-time autocomplete.
 */
export default function TerminalInput({ onCommand, disabled }: TerminalInputProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIndex, setIndex] = useState(0);
  
  // Available directives for the Lore Terminal
  const commands = ['HELP', 'LIST', 'READ', 'SEARCH', 'SYMBIO', 'VOID', 'ORIGIN', 'BYPASS'];

  /**
   * Real-time filtering for suggestions
   */
  useEffect(() => {
    const query = input.trim().toUpperCase();
    if (query.length > 0 && !disabled) {
      const filtered = commands.filter(cmd => cmd.startsWith(query) && cmd !== query);
      setSuggestions(filtered.slice(0, 5));
      setIndex(0);
    } else {
      setSuggestions([]);
    }
  }, [input, disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onCommand(input.trim());
      setInput('');
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIndex((prev) => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        setInput(suggestions[activeIndex]);
        setSuggestions([]);
      }
    }
  };

  const handleAutocompleteSelect = (value: string) => {
    setInput(value);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <TerminalAutocomplete 
        suggestions={suggestions} 
        activeIndex={activeIndex} 
        onSelect={handleAutocompleteSelect} 
      />
      
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <span className="text-[#397789] font-bold">❯</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none text-[#e2e8f0] placeholder-[#397789]/20 caret-[#397789]"
          placeholder={disabled ? "RE-AUTHORIZATION_REQUIRED" : "DIRECTIVE_INPUT_PENDING..."}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
