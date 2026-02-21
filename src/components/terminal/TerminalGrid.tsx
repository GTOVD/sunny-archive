import React from 'react';

export const TerminalGrid: React.FC = () => {
  return (
    <div className="terminal-grid p-4 font-mono bg-black text-[#d4af37] border border-[#d4af37]/20 rounded-lg shadow-2xl glassmorphism">
      <div className="terminal-header mb-4 border-b border-[#d4af37]/20 pb-2">
        <h2 className="text-xl uppercase tracking-widest">Vault Access Terminal</h2>
      </div>
      <div className="terminal-body flex gap-4 h-[400px]">
        <div className="hex-sidebar w-24 text-sm opacity-50">
          {/* Hex addresses will go here */}
          0xF92A
          <br />
          0xF936
        </div>
        <div className="matrix-content flex-1 overflow-hidden">
          {/* Matrix noise and words will go here */}
          SCYTHE... #@%^ ... VAULT
        </div>
        <div className="output-log w-64 border-l border-[#d4af37]/20 pl-4 text-xs overflow-y-auto">
          {/* Game feedback will go here */}
          ROBOCO INDUSTRIES (TM)
        </div>
      </div>
    </div>
  );
};
