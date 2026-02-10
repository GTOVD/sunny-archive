export default function GalleryPage() {
  const artists = [
    {
      name: "Artist Name",
      role: "Lead Character Design",
      contact: "https://twitter.com/artist",
      work: "Main VTuber Model & Expression Sheets",
      image: null
    },
    // Placeholder for more artists
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 md:px-12">
      <header className="max-w-7xl mx-auto mb-20 space-y-4 text-right">
        <div className="font-cinzel text-[10px] tracking-[0.6em] text-gold uppercase">
          Visual Contributions
        </div>
        <h1 className="text-6xl md:text-8xl font-serif text-white lowercase tracking-tighter">
          The <span className="gold-text-shimmer italic">Gallery</span>
        </h1>
        <div className="h-px w-32 bg-gold/30 ml-auto mt-8"></div>
        <p className="max-w-xl text-slate-500 text-sm uppercase tracking-widest leading-relaxed pt-4 ml-auto">
          A definitive index of the artisans and creators who have shaped 
          the visual identity of the Sunny Archive.
        </p>
      </header>

      <div className="max-w-7xl mx-auto space-y-32">
        {artists.map((artist, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="luxury-card aspect-video group">
              <div className="w-full h-full flex items-center justify-center bg-navy-dark border border-gold/10">
                <span className="font-cinzel text-[10px] text-gold/20 uppercase tracking-widest italic">
                  Artifact Display Pending
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              <span className="font-cinzel text-xs text-gold/60 tracking-[0.3em]">0{idx + 1} // {artist.role}</span>
              <h2 className="text-5xl font-serif text-white uppercase tracking-tight italic">
                {artist.name}
              </h2>
              <p className="text-slate-400 text-sm leading-loose tracking-wide border-l-2 border-gold/20 pl-6">
                Featured Contribution: {artist.work}
              </p>
              <div className="pt-4">
                <a href={artist.contact} target="_blank" rel="noopener noreferrer" className="editorial-link">
                  Establish Contact
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
