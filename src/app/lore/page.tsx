import React from 'react';

export default function LorePage() {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8">
      <div className="max-w-4xl mx-auto border border-green-900 p-4 shadow-[0_0_20px_rgba(0,255,0,0.1)]">
        <header className="mb-8 border-b border-green-900 pb-4">
          <h1 className="text-2xl font-bold tracking-tighter">SUNNY ARCHIVE // SACRED LORE TERMINAL</h1>
          <p className="text-xs text-green-700">VERSION 2.0.26 // CLEARANCE: UNRESTRICTED</p>
        </header>
        
        <main>
          {/* Terminal Component will go here */}
          <div className="animate-pulse">_ INITIALIZING NEURAL LINK...</div>
        </main>
      </div>
    </div>
  );
}
