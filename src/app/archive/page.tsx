export default function ArchivePage() {
  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 md:px-12">
      <header className="max-w-4xl mx-auto mb-20 space-y-4">
        <div className="font-cinzel text-[10px] tracking-[0.6em] text-gold uppercase animate-pulse">
          Historical Records
        </div>
        <h1 className="text-6xl md:text-8xl font-serif text-white lowercase tracking-tighter">
          Sacred <span className="gold-text-shimmer italic">Lore</span>
        </h1>
        <div className="h-px w-32 bg-gold/30 mt-8"></div>
      </header>

      <article className="max-w-4xl mx-auto space-y-12 luxury-card p-12 md:p-24 bg-slate-900/30">
        <section className="space-y-6">
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed first-letter:text-7xl first-letter:font-serif first-letter:text-gold first-letter:mr-3 first-letter:float-left">
            The origin remains a mystery, woven into the digital fabric of the new age. 
            Information regarding the VTuber's characteristics and personality is being 
            curated for this terminal.
          </p>
          <div className="h-px w-full bg-white/5"></div>
          <p className="text-slate-400 uppercase tracking-widest text-xs leading-loose">
            [DATA PENDING USER UPLOAD]
          </p>
        </section>
      </article>
    </div>
  );
}
