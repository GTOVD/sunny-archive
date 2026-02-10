import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased selection:bg-gold/30 selection:text-gold-bright bg-[#020617] text-white">
        {/* Cinematic Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150 brightness-100"></div>
        
        {/* Luxury Border Frame */}
        <div className="fixed inset-0 pointer-events-none z-50 border-[12px] border-[#020617]/50"></div>
        
        <main className="relative min-h-screen flex flex-col">
          {children}
          
          <footer className="mt-auto py-12 px-8 border-t border-white/5 bg-[#020617]/80">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="font-serif text-xs tracking-[0.3em] text-[#d4af37]/40 italic uppercase">
                EST. 2026 — BEYOND THE HORIZON
              </div>
              <div className="flex gap-12">
                <a href="/" className="text-[#d4af37]/60 uppercase tracking-[0.2em] text-[10px] hover:text-[#d4af37] transition-colors">Home</a>
                <a href="/archive" className="text-[#d4af37]/60 uppercase tracking-[0.2em] text-[10px] hover:text-[#d4af37] transition-colors">Lore</a>
                <a href="/treasury" className="text-[#d4af37]/60 uppercase tracking-[0.2em] text-[10px] hover:text-[#d4af37] transition-colors">Treasury</a>
              </div>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
