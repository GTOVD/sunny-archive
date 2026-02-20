'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Account Login Page - Secure Uplink
 * A high-fidelity, luxury login interface for the Sunny Archive.
 * Connects to the secure backend authentication route.
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'UPLINK' | 'SYNC' | 'ERROR'>('IDLE');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('UPLINK');
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Authentication Failed');
      }

      setStatus('SYNC');
      // Token management should be handled here (e.g., cookie/localStorage)
      // For now, we simulate sync and redirect
      setTimeout(() => {
        router.push('/'); 
      }, 1000);

    } catch (err: any) {
      setStatus('ERROR');
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 text-[#e2e8f0] relative overflow-hidden">
      {/* Background Ornament */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#d4af37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#397789]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-block border-b border-[#d4af37]/30 pb-2 mb-2">
            <span className="font-['Cinzel'] text-[10px] tracking-[0.4em] text-[#d4af37] uppercase">
              Secure Uplink
            </span>
          </div>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl text-white tracking-tight leading-none">
            Identity<br/><span className="italic text-[#d4af37]">Verification</span>
          </h1>
          <p className="text-[#94a3b8] text-[10px] uppercase tracking-[0.25em] font-light">
            Access Restricted to Verified Personnel
          </p>
        </div>

        {/* Login Form Container */}
        <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden">
          {/* Subtle Frame */}
          <div className="absolute inset-0 border border-[#d4af37]/10 pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-2 group">
              <label htmlFor="email" className="block text-[9px] uppercase tracking-[0.2em] text-[#d4af37]/60 font-medium group-focus-within:text-[#d4af37] transition-colors">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#020617]/40 border-b border-white/10 text-white px-0 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 transition-all font-mono placeholder:text-white/10"
                placeholder="operative@sunny-archive.com"
                disabled={status === 'UPLINK' || status === 'SYNC'}
              />
            </div>

            <div className="space-y-2 group">
              <label htmlFor="password" className="block text-[9px] uppercase tracking-[0.2em] text-[#d4af37]/60 font-medium group-focus-within:text-[#d4af37] transition-colors">
                Passphrase
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#020617]/40 border-b border-white/10 text-white px-0 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 transition-all font-mono placeholder:text-white/10"
                placeholder="••••••••••••"
                disabled={status === 'UPLINK' || status === 'SYNC'}
              />
            </div>

            {status === 'ERROR' && (
              <div className="text-[10px] text-red-400 bg-red-900/10 border border-red-900/20 p-3 uppercase tracking-wider text-center animate-pulse">
                ⚠ {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'UPLINK' || status === 'SYNC'}
              className="w-full bg-[#d4af37] text-[#020617] py-4 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-white transition-all duration-500 mt-6 relative overflow-hidden group disabled:opacity-50 disabled:cursor-wait"
            >
              <span className="relative z-10">
                {status === 'UPLINK' ? 'Establishing Uplink...' : status === 'SYNC' ? 'Synchronizing...' : 'Authenticate'}
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </form>
        </div>

        <div className="text-center pt-8">
          <Link href="/" className="text-[#64748b] text-[9px] uppercase tracking-[0.2em] hover:text-[#d4af37] transition-colors border-b border-transparent hover:border-[#d4af37]/30 pb-1">
            ← Return to Public Access
          </Link>
        </div>
      </div>
    </div>
  );
}
