import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-slate-950">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/10 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-800/30 blur-[140px] rounded-full"></div>
      </div>

      <div className="max-w-5xl w-full text-center space-y-16 py-20">
        <header className="space-y-6">
          <div className="font-cinzel text-xs tracking-[0.6em] text-gold/80 animate-pulse uppercase">
            The Digital Legacy
          </div>
          <h1 className="text-8xl md:text-[10rem] font-serif font-bold tracking-tighter text-white lowercase leading-none">
            Sunny <span className="gold-text-shimmer italic">Archive</span>
          </h1>
          <div className="h-px w-32 bg-gold/40 mx-auto mt-12"></div>
        </header>

        <p className="max-w-2xl mx-auto text-slate-400 font-light leading-relaxed tracking-widest text-lg uppercase text-[10px]">
          A high-fidelity vault for artifacts of the new age. Curated lore, 
          artistic credits, and an exclusive treasury.
        </p>

        <nav className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-16">
          <Link href="/archive" className="luxury-card p-12 space-y-6 group">
            <span className="font-cinzel text-[10px] tracking-[0.4em] text-gold/40 group-hover:text-gold/80 transition-colors">01</span>
            <h3 className="text-3xl font-serif text-white group-hover:text-gold transition-colors">Lore</h3>
            <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
              Sacred manuscripts and historical records.
            </p>
            <div className="pt-6 flex justify-center">
              <span className="editorial-link">Enter Vault</span>
            </div>
          </Link>

          <Link href="/gallery" className="luxury-card p-12 space-y-6 group">
            <span className="font-cinzel text-[10px] tracking-[0.4em] text-gold/40 group-hover:text-gold/80 transition-colors">02</span>
            <h3 className="text-3xl font-serif text-white group-hover:text-gold transition-colors">Gallery</h3>
            <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
              Artistic credits and visual artifacts.
            </p>
            <div className="pt-6 flex justify-center">
              <span className="editorial-link">View Gallery</span>
            </div>
          </Link>

          <Link href="/treasury" className="luxury-card p-12 space-y-6 group">
            <span className="font-cinzel text-[10px] tracking-[0.4em] text-gold/40 group-hover:text-gold/80 transition-colors">03</span>
            <h3 className="text-3xl font-serif text-white group-hover:text-gold transition-colors">Treasury</h3>
            <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
              Exclusive goods and artifacts.
            </p>
            <div className="pt-6 flex justify-center">
              <span className="editorial-link">Open Treasury</span>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
}
