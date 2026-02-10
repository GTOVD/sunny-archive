import Link from 'next/link';

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
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      paddingTop: '8rem',
      paddingBottom: '6rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      backgroundColor: '#020617',
      color: '#e2e8f0'
    }}>
      <header style={{ maxWidth: '80rem', margin: '0 auto 5rem auto' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.625rem', letterSpacing: '0.6em', color: '#d4af37', textTransform: 'uppercase' }}>
          Exhibition of Creators
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontFamily: 'Playfair Display, serif', color: 'white', textTransform: 'lowercase', tracking: '-0.05em', margin: '1rem 0' }}>
          Artistic <span style={{ fontStyle: 'italic', color: '#d4af37' }}>Credits</span>
        </h1>
        <div style={{ height: '1px', width: '8rem', backgroundColor: 'rgba(212, 175, 55, 0.3)', marginTop: '2rem' }}></div>
      </header>

      <div style={{ 
        maxWidth: '80rem', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '3rem' 
      }}>
        {artists.map((artist, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            gap: '2rem', 
            padding: '2rem', 
            alignItems: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)'
          }}>
            <div style={{ 
              width: '8rem', 
              height: '8rem', 
              borderRadius: '9999px', 
              overflow: 'hidden', 
              border: '1px solid rgba(212, 175, 55, 0.2)', 
              flexShrink: 0, 
              backgroundColor: '#1e293b' 
            }}>
               <img src={artist.image} alt={artist.name} style={{ width: '100%', height: '100%', objectCover: 'cover', opacity: 0.3 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.875rem', fontFamily: 'Playfair Display, serif', color: 'white', textTransform: 'uppercase', margin: 0 }}>{artist.name}</h2>
              <p style={{ color: 'rgba(212, 175, 55, 0.6)', fontFamily: 'Cinzel, serif', fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>{artist.work}</p>
              <a href={artist.link} target="_blank" style={{ color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.625rem', textDecoration: 'none', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', alignSelf: 'flex-start', paddingBottom: '2px' }}>Visit Portfolio</a>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '8rem' }}>
        <Link href="/" style={{ color: 'rgba(212, 175, 55, 0.4)', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '0.625rem', textDecoration: 'none' }}>
          ← Return to Vault
        </Link>
      </div>
    </div>
  );
}
