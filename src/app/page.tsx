import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-800/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-4xl w-full text-center space-y-12">
        <header className="space-y-4">
          <div className="font-cinzel text-xs tracking-[0.5em] text-gold animate-pulse">
            THE DIGITAL LEGACY
          </div>
          <h1 className="text-7xl md:text-9xl font-serif font-bold tracking-tighter text-white lowercase">
            Sunny <span className="gold-text-shimmer italic">Archive</span>
          </h1>
          <div className="h-px w-24 bg-gold/30 mx-auto mt-8"></div>
        </header>

        <p className="max-w-2xl mx-auto text-slate-400 font-light leading-relaxed tracking-wide text-lg">
          A high-fidelity vault for the artifacts of the new age. Curated lore, 
          artistic credits, and an exclusive treasury for the discerning explorer.
        </p>

        <nav className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          <Link href="/archive" className="luxury-card p-10 space-y-4">
            <span className="font-cinzel text-[10px] tracking-widest text-gold/50">01</span>
            <h3 className="text-2xl font-serif text-white">Lore</h3>
            <p className="text-xs text-slate-500 uppercase tracking-widest leading-loose">
              Access the sacred manuscripts and historical records.
            </p>
            <div className="pt-4 flex justify-center">
              <span className="editorial-link">Enter Vault</span>
            </div>
          </Link>

          <Link href="/gallery" className="luxury-card p-10 space-y-4">
            <span className="font-cinzel text-[10px] tracking-widest text-gold/50">02</span>
            <h3 className="text-2xl font-serif text-white">Gallery</h3>
            <p className="text-xs text-slate-500 uppercase tracking-widest leading-loose">
              A curated exhibition of artistic credits and visual artifacts.
            </p>
            <div className="pt-4 flex justify-center">
              <span className="editorial-link">View Gallery</span>
            </div>
          </Link>

          <Link href="/treasury" className="luxury-card p-10 space-y-4 border-gold/20">
            <span className="font-cinzel text-[10px] tracking-widest text-gold/50">03</span>
            <h3 className="text-2xl font-serif text-white">Treasury</h3>
            <p className="text-xs text-slate-500 uppercase tracking-widest leading-loose">
              Acquire exclusive goods from the archive's collection.
            </p>
            <div className="pt-4 flex justify-center">
              <span className="editorial-link">Open Treasury</span>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
}
