'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TYPOGRAPHY } from '@/styles/typography';

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
      {/* Ambient Background Glows */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -10 }}>
        <motion.div 
          animate={{ opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', backgroundColor: 'rgba(212, 175, 55, 0.1)', filter: 'blur(140px)', borderRadius: '9999px' }} 
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', backgroundColor: 'rgba(30, 41, 59, 0.3)', filter: 'blur(140px)', borderRadius: '9999px' }} 
        />
      </div>

      <div style={{ maxWidth: '80rem', width: '100%', textAlign: 'center', margin: '5rem 0' }}>
        <header style={{ marginBottom: '4rem' }}>
          <motion.div 
            initial={{ opacity: 0, letterSpacing: '1em' }}
            animate={{ opacity: 0.8, letterSpacing: '0.6em' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', color: 'rgba(212, 175, 55, 0.8)', textTransform: 'uppercase', marginBottom: '1.5rem' }}
          >
            The Digital Legacy
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'min(15vw, 10rem)', fontFamily: TYPOGRAPHY.fonts.serif, fontWeight: 'bold', letterSpacing: '-0.05em', color: 'white', textTransform: 'lowercase', lineHeight: 1, margin: 0 }}
          >
            Sunny <span style={{ fontStyle: 'italic', color: '#d4af37' }}>Archive</span>
          </motion.h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ height: '1px', backgroundColor: 'rgba(212, 175, 55, 0.4)', margin: '3rem auto 0' }} 
          />
        </header>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ maxWidth: '42rem', margin: '0 auto', color: '#94a3b8', fontWeight: 300, lineHeight: 1.6, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.625rem' }}
        >
          A high-fidelity vault for artifacts of the new age. Curated lore, 
          artistic credits, and an exclusive treasury.
        </motion.p>

        <nav style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', paddingTop: '4rem' }}>
          <div className="group relative p-8 border border-[#d4af37]/10 bg-black/40 backdrop-blur-md rounded-sm transition-all duration-500 hover:border-[#d4af37]/30">
            <span className="text-[10px] text-[#d4af37]/40 uppercase tracking-widest block mb-4">01</span>
            <h2 className="text-2xl font-['Playfair_Display'] text-white uppercase mb-4">Lore</h2>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider mb-8">Sacred manuscripts and historical records.</p>
            <Link href="/archive" className="inline-block px-6 py-2 border border-[#d4af37]/20 text-[#d4af37] text-[10px] uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all">Enter Vault</Link>
          </div>
          <div className="group relative p-8 border border-[#d4af37]/10 bg-black/40 backdrop-blur-md rounded-sm transition-all duration-500 hover:border-[#d4af37]/30">
            <span className="text-[10px] text-[#d4af37]/40 uppercase tracking-widest block mb-4">02</span>
            <h2 className="text-2xl font-['Playfair_Display'] text-white uppercase mb-4">Gallery</h2>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider mb-8">Artistic credits and visual artifacts.</p>
            <Link href="/gallery" className="inline-block px-6 py-2 border border-[#d4af37]/20 text-[#d4af37] text-[10px] uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all">View Gallery</Link>
          </div>
          <div className="group relative p-8 border border-[#d4af37]/10 bg-black/40 backdrop-blur-md rounded-sm transition-all duration-500 hover:border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
            <span className="text-[10px] text-[#d4af37]/40 uppercase tracking-widest block mb-4">03</span>
            <h2 className="text-2xl font-['Playfair_Display'] text-[#d4af37] uppercase mb-4 italic">Treasury</h2>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider mb-8">Exclusive goods and artifacts.</p>
            <Link href="/treasury" className="inline-block px-6 py-3 bg-[#d4af37] text-black text-[10px] uppercase tracking-widest font-bold hover:bg-[#d4af37]/80 transition-all">Open Treasury</Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
