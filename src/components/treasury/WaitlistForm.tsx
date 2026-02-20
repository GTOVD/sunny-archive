'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('LOADING');
    setMessage('');

    try {
      const res = await fetch('/api/treasury/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      setStatus('SUCCESS');
      setMessage('Access Request Acknowledged. Stand by for Uplink.');
      setEmail('');
    } catch (error: any) {
      setStatus('ERROR');
      setMessage(error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative group">
      {/* Visual Ornamental Border */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/20 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
      
      <div className="relative bg-[#020617]/80 backdrop-blur-xl border border-[#d4af37]/10 p-8 md:p-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {status === 'SUCCESS' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center space-y-4"
            >
              <div className="text-[#d4af37] text-4xl mb-2">✦</div>
              <h3 className="font-['Playfair_Display'] text-2xl text-white italic">
                Request Received
              </h3>
              <p className="text-[10px] text-[#94a3b8] uppercase tracking-[0.2em] leading-relaxed">
                Your coordinates have been logged in the secure register.
                <br/>Wait for the signal.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="text-center space-y-2 mb-8">
                <span className="font-['Cinzel'] text-[9px] text-[#d4af37] uppercase tracking-[0.3em] block mb-2">
                  Restricted Access
                </span>
                <h2 className="font-['Playfair_Display'] text-3xl text-white">
                  Join the <span className="italic text-[#d4af37]">Waitlist</span>
                </h2>
                <p className="text-[10px] text-[#64748b] uppercase tracking-[0.1em] max-w-xs mx-auto">
                  Secure your position for the next artifact drop.
                </p>
              </div>

              <div className="relative group/input">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'LOADING'}
                  placeholder="ENTER SECURE EMAIL"
                  className="w-full bg-[#0f172a]/50 border-b border-white/10 text-white px-0 py-4 text-center text-xs tracking-[0.2em] font-mono focus:outline-none focus:border-[#d4af37]/50 transition-all placeholder:text-white/10 disabled:opacity-50"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4af37] group-focus-within/input:w-full transition-all duration-500" />
              </div>

              {status === 'ERROR' && (
                <div className="text-[9px] text-red-400 bg-red-900/10 border border-red-900/20 p-2 text-center uppercase tracking-widest animate-pulse">
                  ⚠ {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'LOADING'}
                className="w-full bg-[#d4af37] text-[#020617] py-4 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-white transition-all duration-500 disabled:opacity-50 disabled:cursor-wait relative overflow-hidden group/btn"
              >
                <span className="relative z-10">
                  {status === 'LOADING' ? 'Uplinking...' : 'Request Access'}
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
