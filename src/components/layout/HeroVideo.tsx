import React from 'react';

export const HeroVideo = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-navy">
      {/* Placeholder for Video/High-res Image */}
      <div className="absolute inset-0 bg-[url('/placeholder-hero.jpg')] bg-cover bg-center opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/80" />
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <h1 className="font-serif text-5xl md:text-7xl uppercase tracking-[0.3em] text-gold-light drop-shadow-lg">
          The Sunny Archive
        </h1>
        <p className="mt-4 font-sans text-lg md:text-xl text-white/80 tracking-widest uppercase">
          Curated Lore • Artistic Credits • Treasury
        </p>
      </div>
    </section>
  );
};
