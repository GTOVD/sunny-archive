import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 1.5rem',
      overflow: 'hidden',
      backgroundColor: '#020617',
      color: '#e2e8f0'
    }}>
      {/* Background Ambience */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -10 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', backgroundColor: 'rgba(212, 175, 55, 0.1)', filter: 'blur(140px)', borderRadius: '9999px' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', backgroundColor: 'rgba(30, 41, 59, 0.3)', filter: 'blur(140px)', borderRadius: '9999px' }}></div>
      </div>

      <div style={{ maxWidth: '80rem', width: '100%', textAlign: 'center', margin: '5rem 0' }}>
        <header style={{ marginBottom: '4rem' }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.6em', color: 'rgba(212, 175, 55, 0.8)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            The Digital Legacy
          </div>
          <h1 style={{ fontSize: 'min(15vw, 10rem)', fontFamily: 'Playfair Display, serif', fontWeight: 'bold', letterSpacing: '-0.05em', color: 'white', textTransform: 'lowercase', lineHeight: 1, margin: 0 }}>
            Sunny <span style={{ fontStyle: 'italic', color: '#d4af37' }}>Archive</span>
          </h1>
          <div style={{ height: '1px', width: '8rem', backgroundColor: 'rgba(212, 175, 55, 0.4)', margin: '3rem auto 0' }}></div>
        </header>

        <p style={{ maxWidth: '42rem', margin: '0 auto', color: '#94a3b8', fontWeight: 300, lineHeight: 1.6, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.625rem' }}>
          A high-fidelity vault for artifacts of the new age. Curated lore, 
          artistic credits, and an exclusive treasury.
        </p>

        <nav style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', paddingTop: '4rem' }}>
          <Link href="/archive" style={{ textDecoration: 'none' }}>
            <div style={{ 
              position: 'relative', 
              overflow: 'hidden', 
              backgroundColor: 'rgba(15, 23, 42, 0.5)', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              backdropFilter: 'blur(12px)', 
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              transition: 'all 0.5s ease'
            }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.625rem', letterSpacing: '0.4em', color: 'rgba(212, 175, 55, 0.4)' }}>01</span>
              <h3 style={{ fontSize: '1.875rem', fontFamily: 'Playfair Display, serif', color: 'white', margin: 0 }}>Lore</h3>
              <p style={{ fontSize: '0.56rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.2em', lineHeight: 1.6, margin: 0 }}>
                Sacred manuscripts and historical records.
              </p>
              <div style={{ paddingTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <span style={{ color: 'rgba(212, 175, 55, 0.6)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.625rem' }}>Enter Vault</span>
              </div>
            </div>
          </Link>

          <Link href="/gallery" style={{ textDecoration: 'none' }}>
            <div style={{ 
              position: 'relative', 
              overflow: 'hidden', 
              backgroundColor: 'rgba(15, 23, 42, 0.5)', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              backdropFilter: 'blur(12px)', 
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              transition: 'all 0.5s ease'
            }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.625rem', letterSpacing: '0.4em', color: 'rgba(212, 175, 55, 0.4)' }}>02</span>
              <h3 style={{ fontSize: '1.875rem', fontFamily: 'Playfair Display, serif', color: 'white', margin: 0 }}>Gallery</h3>
              <p style={{ fontSize: '0.56rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.2em', lineHeight: 1.6, margin: 0 }}>
                Artistic credits and visual artifacts.
              </p>
              <div style={{ paddingTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <span style={{ color: 'rgba(212, 175, 55, 0.6)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.625rem' }}>View Gallery</span>
              </div>
            </div>
          </Link>

          <Link href="/treasury" style={{ textDecoration: 'none' }}>
            <div style={{ 
              position: 'relative', 
              overflow: 'hidden', 
              backgroundColor: 'rgba(15, 23, 42, 0.5)', 
              border: '1px solid rgba(212, 175, 55, 0.1)', 
              backdropFilter: 'blur(12px)', 
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              transition: 'all 0.5s ease'
            }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.625rem', letterSpacing: '0.4em', color: 'rgba(212, 175, 55, 0.4)' }}>03</span>
              <h3 style={{ fontSize: '1.875rem', fontFamily: 'Playfair Display, serif', color: 'white', margin: 0 }}>Treasury</h3>
              <p style={{ fontSize: '0.56rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.2em', lineHeight: 1.6, margin: 0 }}>
                Exclusive goods and artifacts.
              </p>
              <div style={{ paddingTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <span style={{ color: 'rgba(212, 175, 55, 0.6)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.625rem' }}>Open Treasury</span>
              </div>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
}
