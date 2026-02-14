'use client';

import React, { useState, useEffect } from 'react';

/**
 * Typewriter Component
 * Renders text with a high-fidelity "terminal-style" typewriter animation.
 * Features: Adjustable speed, staggered delivery, and boutique smoothing.
 */
interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  speed = 15, 
  onComplete, 
  className = "" 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={`${className} whitespace-pre-wrap`}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-2 h-4 ml-1 bg-amber-500/50 animate-pulse align-middle" />
      )}
    </span>
  );
};

export default Typewriter;
