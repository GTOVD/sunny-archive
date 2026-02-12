'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // TODO: Send to Sentry or internal logging service once issue #103 is resolved
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
          return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] text-[#d4af37] font-serif p-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          <h1 className="text-4xl mb-4 uppercase tracking-widest border-b border-[#d4af37]/30 pb-4" style={{ fontFamily: "'Cinzel', serif" }}>
            The Archive is Momentarily Sealed
          </h1>
          <p className="max-w-md text-[#d4af37]/70 italic mb-8">
            The resonance of the treasury has encountered an instability. Please wait for the spirits to settle.
          </p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="border border-[#d4af37] px-8 py-2 hover:bg-[#d4af37] hover:text-black transition-all duration-300 uppercase tracking-[0.2em] text-[0.625rem]"
          >
            Attempt Re-Entry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
