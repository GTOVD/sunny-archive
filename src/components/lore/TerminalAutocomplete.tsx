import React from 'react';

interface TerminalAutocompleteProps {
  suggestions: string[];
  activeIndex: number;
  onSelect: (value: string) => void;
}

/**
 * TerminalAutocomplete Component
 * High-fidelity 'Suggested Commands' overlay for the Lore Terminal.
 * Part of the 'Luxury Boutique' UX refinement.
 */
const TerminalAutocomplete: React.FC<TerminalAutocompleteProps> = ({ suggestions, activeIndex, onSelect }) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="terminal-autocomplete-overlay absolute bottom-full left-0 mb-2 w-64 bg-[#020617]/90 backdrop-blur-xl border border-[#397789]/30 rounded-sm shadow-[0_0_30px_rgba(57,119,137,0.2)] z-50">
      <div className="px-3 py-2 border-b border-[#397789]/10">
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#397789]/40">Suggested_Directives</span>
      </div>
      <ul className="py-1">
        {suggestions.map((suggestion, index) => (
          <li key={suggestion}>
            <button
              onClick={() => onSelect(suggestion)}
              className={`w-full text-left px-3 py-2 text-xs font-mono transition-colors flex justify-between items-center ${
                index === activeIndex 
                  ? 'bg-[#397789]/20 text-[#397789]' 
                  : 'text-[#397789]/60 hover:bg-[#397789]/10 hover:text-[#397789]'
              }`}
            >
              <span>{suggestion}</span>
              {index === activeIndex && <span className="text-[10px] opacity-40">[ENTER]</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TerminalAutocomplete;
