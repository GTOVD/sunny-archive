import React from 'react';
import TerminalInterface from '@/components/lore/TerminalInterface';

/**
 * Lore Page - The Sacred Vault / Interactive Terminal
 * A high-fidelity, interactive terminal for exploring the Sunny Archive lore.
 * Implementation follows 'Luxury Boutique' aesthetic with a retro phosphor feel.
 */
export default function LorePage() {
  return (
    <div className="min-h-screen bg-[#020617] text-[#397789] p-4 md:p-8 pt-24 overflow-hidden font-mono">
      {/* Background Phosphor Glow */}
      <div className="fixed inset-0 bg-[#020617] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,119,137,0.05)_0%,transparent_100%)] -z-10 pointer-events-none" />

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
            <div className="text-[9px] tracking-[0.2em] text-[#d4af37]/60 uppercase">Clearance: Level 4 [Restricted]</div>
          </div>
        </header>
        
        <main className="relative group">
          {/* Immersive Terminal Container */}
          <div className="relative z-0 bg-black/40 backdrop-blur-sm border border-[#397789]/30 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(57,119,137,0.1)]">
            {/* Scanline & CRT Effects */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_3px,3px_100%]" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] z-10" />
            
            <div className="p-1">
               <TerminalInterface />
            </div>
          </div>
        </main>
        
        <footer className="mt-8 flex justify-between items-center text-[9px] text-[#397789]/30 uppercase tracking-[0.3em]">
          <div className="flex gap-6">
            <span className="animate-pulse">● Neural Link Active</span>
            <span>Bitstream: Synchronized</span>
          </div>
          <div className="hidden md:block">
            Vault Node: 0x397789A2
          </div>
        </footer>
      </div>
    </div>
  );
}
