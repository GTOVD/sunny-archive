export default function GalleryPage() {
  const artists = [
    {
      name: "Placeholder Artist",
      work: "Main VTuber Model",
      link: "https://twitter.com",
      image: "https://grainy-gradients.vercel.app/noise.svg"
    }
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 md:px-12">
      <header className="max-w-7xl mx-auto mb-20 space-y-4">
        <div className="font-cinzel text-[10px] tracking-[0.6em] text-gold uppercase animate-pulse">
          Exhibition of Creators
        </div>
        <h1 className="text-6xl md:text-8xl font-serif text-white lowercase tracking-tighter">
          Artistic <span className="gold-text-shimmer italic">Credits</span>
        </h1>
        <div className="h-px w-32 bg-gold/30 mt-8"></div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {artists.map((artist, i) => (
          <div key={i} className="luxury-card flex flex-col md:flex-row gap-8 p-8 items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border border-gold/20 flex-shrink-0 bg-slate-800">
               <img src={artist.image} alt={artist.name} className="w-full h-full object-cover opacity-20" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h2 className="font-serif text-3xl text-white uppercase">{artist.name}</h2>
              <p className="text-gold/60 font-cinzel text-[10px] tracking-widest uppercase">{artist.work}</p>
              <a href={artist.link} target="_blank" className="editorial-link inline-block">Visit Portfolio</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
