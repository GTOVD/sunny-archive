import { useCallback, useRef } from 'react';

type TerminalSound = 'keystroke' | 'enter' | 'denied' | 'granted' | 'hum';

export const useTerminalAudio = () => {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const playSound = useCallback((sound: TerminalSound, volume = 0.2) => {
    // Check if running in browser
    if (typeof window === 'undefined') return;

    const path = `/audio/terminal/${sound}.mp3`;
    
    if (!audioRefs.current[sound]) {
      audioRefs.current[sound] = new Audio(path);
    }

    const audio = audioRefs.current[sound];
    audio.volume = volume;
    audio.currentTime = 0;
    
    audio.play().catch(e => {
      // Browsers often block auto-play until user interaction
      console.warn(`Audio playback failed for ${sound}:`, e.message);
    });
  }, []);

  const stopSound = useCallback((sound: TerminalSound) => {
    const audio = audioRefs.current[sound];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  return { playSound, stopSound };
};
