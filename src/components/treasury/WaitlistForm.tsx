import React, { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Treasury Waitlist Component - "Acquisition Authorization Request"
 * A high-fidelity glassmorphism card for collectors to request access to out-of-stock artifacts.
 * Aligned with v2.3.0 Luxury Boutique standards.
 */
export const WaitlistForm: React.FC<{ productId: string }> = ({ productId }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/treasury/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, productId }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="relative overflow-hidden bg-black/40 backdrop-blur-xl border border-[#d4af37]/20 p-8 rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.05)] max-w-md mx-auto">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
      
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-[#d4af37] font-cinzel text-xl tracking-[0.15em] uppercase">Acquisition Authorization</h3>
          <p className="text-[#397789] text-xs leading-relaxed opacity-80 italic">
            This artifact is currently secured in the primary vault. Submit your credentials to be notified when replenishment protocols are initiated.
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-4 border border-[#d4af37]/40 bg-[#d4af37]/5 animate-pulse">
            <p className="text-[#d4af37] text-sm text-center uppercase tracking-widest font-mono">Authorization Logged. Standing by.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="group relative">
              <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/60 mb-2">Identifier (Email)</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="collector@nexus.gtovd"
                className="w-full bg-[#020617] border border-[#d4af37]/20 p-3 text-[#d4af37] font-mono text-sm focus:outline-none focus:border-[#d4af37]/60 transition-all placeholder:text-[#397789]/30"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-500 group-focus-within:w-full" />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full border border-[#d4af37]/40 p-4 text-[#d4af37] text-xs uppercase tracking-[0.4em] hover:bg-[#d4af37] hover:text-[#020617] transition-all duration-300 disabled:opacity-50 font-mono"
            >
              {status === 'submitting' ? 'Transmitting...' : 'Request Authorization'}
            </button>
            
            {status === 'error' && (
              <p className="text-red-500 text-[10px] uppercase text-center tracking-widest font-mono animate-pulse">Transmission Error: Retry Connection</p>
            )}
          </form>
        )}
        
        <div className="pt-4 border-t border-[#d4af37]/10">
          <p className="text-[8px] text-[#397789]/40 uppercase tracking-widest text-center font-mono">GTOVD Secure Protocol // Archive v2.3.0</p>
        </div>
      </div>
    </div>
  );
};
