import React from 'react';
import TerminalInterface from '@/components/lore/TerminalInterface';

/**
 * Lore Page - The Sacred Vault
 * A high-fidelity, interactive terminal for exploring the Sunny Archive lore.
 * Implementation follows 'Luxury Boutique' aesthetic: minimal, gold-accented, immersive.
 */
export default function LorePage() {
  return (
    <div className="min-h-screen bg-black text-amber-500 p-8 pt-20">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-light tracking-[0.5em] text-amber-600 mb-2 uppercase">Sacred Lore</h1>
          <div className="h-px w-24 bg-amber-900/50 mx-auto mb-4" />
          <p className="text-[10px] text-amber-900 uppercase tracking-widest">
            Accessing Encrypted Fragments // GTOVD Protocol
          </p>
        </header>
        
        <main className="relative">
          {/* Ambient glow effect for high-fidelity immersion */}
          <div className="absolute -inset-4 bg-amber-500/5 rounded-2xl blur-3xl pointer-events-none" />
          <TerminalInterface />
        </main>
        
        <footer className="mt-16 text-center">
          <div className="flex justify-center space-x-8 text-[9px] text-amber-900/40 uppercase tracking-[0.3em]">
            <span>Secure Connection</span>
            <span>Neural Link Stable</span>
            <span>Archive Version 2.0.26</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
