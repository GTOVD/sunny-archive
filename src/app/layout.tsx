import type { Metadata } from "next";
import "./globals.css";
import GlobalErrorBoundary from "@/components/GlobalErrorBoundary";

export const metadata: Metadata = {
  title: "The Sunny Archive | Curated Luxury Artifacts",
  description: "A digital repository of high-fidelity lore and exclusive goods.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ 
        margin: 0, 
        backgroundColor: '#020617', 
        color: 'white', 
        fontFamily: 'Inter, sans-serif',
        WebkitFontSmoothing: 'antialiased'
      }}>
        {/* Cinematic Noise Overlay */}
        <div style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 100,
          opacity: 0.03,
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          filter: 'contrast(150%) brightness(100%)'
        }}></div>
        
        {/* Luxury Border Frame */}
        <div style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 50,
          border: '12px solid rgba(2, 6, 23, 0.5)'
        }}></div>
        
        <main style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <GlobalErrorBoundary>
            <nav style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '2rem 3rem',
              zIndex: 40
            }}>
              <a href="/" style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.4em', color: '#d4af37', textDecoration: 'none', fontWeight: 'bold' }}>
                SUNNY ARCHIVE
              </a>
              <div style={{ display: 'flex', gap: '3rem' }}>
                <a href="/archive" style={{ color: 'white', fontSize: '0.625rem', letterSpacing: '0.2em', textDecoration: 'none', textTransform: 'uppercase' }}>Lore</a>
                <a href="/gallery" style={{ color: 'white', fontSize: '0.625rem', letterSpacing: '0.2em', textDecoration: 'none', textTransform: 'uppercase' }}>Credits</a>
                <a href="/treasury" style={{ color: 'white', fontSize: '0.625rem', letterSpacing: '0.2em', textDecoration: 'none', textTransform: 'uppercase' }}>Treasury</a>
              </div>
            </nav>

            {children}
          </GlobalErrorBoundary>
          
          <footer style={{ marginTop: 'auto', padding: '4rem 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: 'rgba(2, 6, 23, 0.8)' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.625rem', letterSpacing: '0.3em', color: 'rgba(212, 175, 55, 0.4)', textTransform: 'uppercase', fontStyle: 'italic' }}>
                EST. 2026 — BEYOND THE HORIZON
              </div>
              <div style={{ display: 'flex', gap: '3rem' }}>
                <a href="/" style={{ color: 'rgba(212, 175, 55, 0.6)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.625rem', textDecoration: 'none' }}>Home</a>
                <a href="/archive" style={{ color: 'rgba(212, 175, 55, 0.6)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.625rem', textDecoration: 'none' }}>Lore</a>
                <a href="/gallery" style={{ color: 'rgba(212, 175, 55, 0.6)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.625rem', textDecoration: 'none' }}>Credits</a>
                <a href="/treasury" style={{ color: 'rgba(212, 175, 55, 0.6)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.625rem', textDecoration: 'none' }}>Treasury</a>
              </div>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
