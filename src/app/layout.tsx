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
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-gold/30 selection:text-gold-bright">
        {/* Cinematic Noise Overlay */}
        <div className="noise-overlay"></div>
        
        {/* Luxury Border Frame */}
        <div className="fixed inset-0 pointer-events-none z-50 border-[12px] border-slate-950/50"></div>
        
        <main className="relative min-h-screen flex flex-col">
          {children}
          
          <footer className="mt-auto py-12 px-8 border-t border-white/5 bg-slate-950/80">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="font-cinzel text-xs tracking-[0.3em] text-gold/40 italic">
                EST. 2026 — BEYOND THE HORIZON
              </div>
              <div className="flex gap-12">
                <a href="/" className="editorial-link">Home</a>
                <a href="/archive" className="editorial-link">Lore</a>
                <a href="/treasury" className="editorial-link">Treasury</a>
              </div>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
