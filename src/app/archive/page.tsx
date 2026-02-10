import Link from 'next/link';

export default function ArchivePage() {
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
      <header style={{ maxWidth: '64rem', margin: '0 auto 5rem auto' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.625rem', letterSpacing: '0.6em', color: '#d4af37', textTransform: 'uppercase' }}>
          Historical Records
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontFamily: 'Playfair Display, serif', color: 'white', textTransform: 'lowercase', tracking: '-0.05em', margin: '1rem 0' }}>
          Sacred <span style={{ fontStyle: 'italic', color: '#d4af37' }}>Lore</span>
        </h1>
        <div style={{ height: '1px', width: '8rem', backgroundColor: 'rgba(212, 175, 55, 0.3)', marginTop: '2rem' }}></div>
      </header>

      <article style={{ 
        maxWidth: '64rem', 
        margin: '0 auto', 
        backgroundColor: 'rgba(15, 23, 42, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        padding: 'clamp(2rem, 10vw, 6rem)'
      }}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <p style={{ 
            fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', 
            color: '#cbd5e1', 
            fontWeight: 300, 
            lineHeight: 1.8,
            letterSpacing: '0.01em'
          }}>
            <span style={{ 
              fontSize: '5rem', 
              fontFamily: 'Playfair Display, serif', 
              color: '#d4af37', 
              float: 'left', 
              lineHeight: 0.8, 
              paddingRight: '1rem', 
              paddingTop: '0.5rem' 
            }}>T</span>he origin remains a mystery, woven into the digital fabric of the new age. 
            Information regarding the VTuber's characteristics, personality, and the expanding 
            narrative of this archive is currently being curated for terminal access.
          </p>
          <div style={{ height: '1px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', margin: '2rem 0' }}></div>
          <p style={{ color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '0.625rem', textAlign: 'center' }}>
            [DATA PENDING USER UPLOAD]
          </p>
        </section>
      </article>

      <div style={{ textAlign: 'center', marginTop: '8rem' }}>
        <Link href="/" style={{ color: 'rgba(212, 175, 55, 0.4)', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '0.625rem', textDecoration: 'none' }}>
          ← Return to Vault
        </Link>
      </div>
    </div>
  );
}
