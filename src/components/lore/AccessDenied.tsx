import React from 'react';

interface AccessDeniedProps {
  onRetry: () => void;
}

/**
 * AccessDenied Component
 * High-fidelity 'Permanent Lockout' UI for the Lore Terminal.
 * Part of the 'Luxury Boutique' narrative security layer.
 */
const AccessDenied: React.FC<AccessDeniedProps> = ({ onRetry }) => {
  return (
    <div className="access-denied-container p-12 border border-red-900/30 bg-[#020617] backdrop-blur-2xl rounded-lg shadow-[0_0_50px_rgba(153,27,27,0.1)] max-w-2xl mx-auto text-center">
      <div className="warning-icon mb-8">
        <div className="w-20 h-20 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <span className="text-4xl text-red-500 font-bold">!</span>
        </div>
      </div>

      <h2 className="text-3xl font-['Cinzel'] tracking-[0.3em] text-red-500 uppercase mb-4">
        Access Denied
      </h2>
      
      <div className="h-px w-24 bg-red-900/50 mx-auto mb-8" />

      <p className="text-sm text-red-500/70 font-mono leading-relaxed mb-12">
        CRITICAL_SECURITY_BREACH: PERMANENT_LOCKOUT_ENGAGED.
        <br />
        UNAUTHORIZED ACCESS ATTEMPT DETECTED.
        <br />
        CREDENTIALS VOIDED. LOCAL TERMINAL OFFLINE.
      </p>

      <div className="terminal-footer border-t border-red-900/20 pt-8">
        <button 
          onClick={onRetry}
          className="text-[10px] uppercase tracking-[0.5em] text-red-500/40 hover:text-red-500 transition-colors"
        >
          [ Emergency System Reset ]
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
