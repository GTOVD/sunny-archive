'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Treasury Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-12">
      <div className="max-w-md w-full border border-gold/20 p-12 text-center bg-navy-light/10">
        <h2 className="font-serif text-3xl text-gold uppercase mb-6 tracking-tighter">Connection Lost</h2>
        <p className="text-gold/60 uppercase tracking-widest text-xs mb-8 leading-relaxed">
          The archive's link to the treasury has been disrupted.
        </p>
        <button
          onClick={() => reset()}
          className="px-8 py-3 border border-gold text-gold uppercase text-xs tracking-[0.2em] hover:bg-gold hover:text-navy transition-all duration-500"
        >
          Re-establish Link
        </button>
      </div>
    </div>
  );
}
