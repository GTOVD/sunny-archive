import Link from 'next/link';
import TerminalInterface from '../../components/lore/TerminalInterface';

export default function ArchivePage() {
  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 bg-slate-950 text-slate-200">
      <header className="max-w-4xl mx-auto mb-20">
        <div className="font-serif text-[10px] tracking-[0.6em] text-amber-500/60 uppercase">
          Historical Records
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-white lowercase tracking-tighter my-4">
          Sacred <span className="italic text-amber-500">Lore</span>
        </h1>
        <div className="h-px w-32 bg-amber-500/20 mt-8"></div>
      </header>

      <main className="max-w-4xl mx-auto relative group">
        {/* Luxury terminal container decoration */}
        <div className="absolute -inset-1 bg-gradient-to-b from-amber-500/10 to-transparent rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
        
        <TerminalInterface />
        
        <div className="mt-12 text-center opacity-40 hover:opacity-100 transition-opacity">
          <p className="text-[10px] uppercase tracking-[0.4em] text-amber-500 mb-2">
            Warning: Unauthorized access to Restricted Data is a breach of the Symbiote Protocol.
          </p>
        </div>
      </main>

      <div className="text-center mt-32">
        <Link 
          href="/" 
          className="text-amber-500/40 uppercase tracking-[0.4em] text-[10px] no-underline hover:text-amber-500 transition-colors"
        >
          ← Return to Vault
        </Link>
      </div>
    </div>
  );
}
