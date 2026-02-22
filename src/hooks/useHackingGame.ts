import { useState, useCallback, useMemo } from 'react';
import { getWordsForDifficulty } from '@/lib/lore/buffer-logic';

export type GameStatus = 'idle' | 'active' | 'success' | 'locked';

interface HackingGameOptions {
  difficulty: 'easy' | 'medium' | 'hard';
  wordList: string[]; // Global buffer of metadata-derived words
}

/**
 * useHackingGame Hook
 * Core logic for the Fallout-style terminal hacking game.
 * V3: Consumes dynamic artifact metadata with difficulty-aware length filtering.
 */
export const useHackingGame = ({ difficulty, wordList }: HackingGameOptions) => {
  const [targetWord, setTargetWord] = useState<string>('');
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number>(4);
  const [status, setStatus] = useState<GameStatus>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  // Configure constraints based on difficulty
  const config = useMemo(() => {
    switch (difficulty) {
      case 'easy': return { length: 4, count: 12 };
      case 'medium': return { length: 6, count: 12 };
      case 'hard': return { length: 8, count: 12 };
      default: return { length: 6, count: 12 };
    }
  }, [difficulty]);

  /**
   * Initialize a new game session using the filtered buffer
   */
  const initGame = useCallback(() => {
    if (!wordList || wordList.length === 0) {
      setLogs(prev => [...prev, 'ERROR: LORE_BUFFER_EMPTY']);
      setStatus('idle');
      return;
    }

    // Use the hardened selection logic to get difficulty-compliant words
    const filteredWords = getWordsForDifficulty(wordList, config.length, config.count);

    const selected = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    setTargetWord(selected.toUpperCase());
    setDisplayWords(filteredWords.map(w => w.toUpperCase()));
    setAttemptsRemaining(4);
    setStatus('active');
    setLogs(['TERMINAL READY. SELECT OVERRIDE CODE.']);
  }, [wordList, config]);

  /**
   * Calculate Likeness score (positional character matching)
   */
  const getLikeness = (word: string): number => {
    let score = 0;
    const guess = word.toUpperCase();
    for (let i = 0; i < targetWord.length; i++) {
      if (guess[i] === targetWord[i]) score++;
    }
    return score;
  };

  /**
   * Handle word selection
   */
  const selectWord = useCallback((word: string) => {
    if (status !== 'active') return;

    const guess = word.toUpperCase();
    
    if (guess.length !== targetWord.length) {
      setLogs(prev => [...prev, `> ${guess}`, '> ERROR: STRING_LENGTH_MISMATCH']);
      return;
    }

    if (guess === targetWord) {
      setStatus('success');
      setLogs(prev => [...prev, `> ${guess}`, '> ACCESS GRANTED. RESONANCE_SYNC_INIT.']);
      return;
    }

    const likeness = getLikeness(guess);
    const newAttempts = attemptsRemaining - 1;
    
    setAttemptsRemaining(newAttempts);
    setLogs(prev => [...prev, `> ${guess}`, `> ENTRY DENIED. LIKENESS=${likeness}`]);

    if (newAttempts <= 0) {
      setStatus('locked');
      setLogs(prev => [...prev, '> TERMINAL LOCKED.', '> PERMANENT_LOCKOUT_ENGAGED.']);
    }
  }, [status, targetWord, attemptsRemaining]);

  /**
   * Dud Removal (Triggered by symbol sequences)
   */
  const removeDud = useCallback(() => {
    if (status !== 'active' || displayWords.length <= 1) return;
    
    const duds = displayWords.filter(w => w !== targetWord);
    if (duds.length === 0) return;

    const removedDud = duds[Math.floor(Math.random() * duds.length)];
    setDisplayWords(prev => prev.filter(w => w !== removedDud));
    setLogs(prev => [...prev, '> HINT_ACTIVE: DUD_PURGED.']);
  }, [status, displayWords, targetWord]);

  /**
   * Attempt Reset (Triggered by rare symbol sequences)
   */
  const resetAttempts = useCallback(() => {
    if (status !== 'active') return;
    setAttemptsRemaining(4);
    setLogs(prev => [...prev, '> HINT_ACTIVE: ALLOWANCE_RESTORED.']);
  }, [status]);

  return {
    targetWord,
    displayWords,
    attemptsRemaining,
    status,
    logs,
    initGame,
    selectWord,
    removeDud,
    resetAttempts
  };
};
