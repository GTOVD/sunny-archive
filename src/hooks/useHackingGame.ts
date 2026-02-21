import { useState, useCallback, useMemo } from 'react';

export type GameStatus = 'idle' | 'active' | 'success' | 'locked';

export interface UseHackingGameProps {
  difficulty?: 'easy' | 'medium' | 'hard';
  onSuccess?: () => void;
  onLockout?: () => void;
}

export const useHackingGame = ({
  difficulty = 'easy',
  onSuccess,
  onLockout,
}: UseHackingGameProps = {}) => {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [attemptsRemaining, setAttemptsRemaining] = useState(4);
  const [words, setWords] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState<string>('');
  const [outputLog, setOutputLog] = useState<string[]>([]);

  const config = useMemo(() => {
    switch (difficulty) {
      case 'hard':
        return { wordLength: 10, wordCount: 12 };
      case 'medium':
        return { wordLength: 7, wordCount: 10 };
      case 'easy':
      default:
        return { wordLength: 5, wordCount: 8 };
    }
  }, [difficulty]);

  const calculateLikeness = useCallback((guess: string, target: string) => {
    let likeness = 0;
    const len = Math.min(guess.length, target.length);
    for (let i = 0; i < len; i++) {
      if (guess[i].toUpperCase() === target[i].toUpperCase()) {
        likeness++;
      }
    }
    return likeness;
  }, []);

  const startGame = useCallback((allAvailableWords: string[]) => {
    // Filter words by length based on difficulty
    const filtered = allAvailableWords
      .filter(w => w.length === config.wordLength)
      .map(w => w.toUpperCase());
    
    if (filtered.length < config.wordCount) {
      console.error(`Not enough words of length ${config.wordLength}`);
      return;
    }

    // Pick random subset
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const selectedWords = shuffled.slice(0, config.wordCount);
    const target = selectedWords[Math.floor(Math.random() * selectedWords.length)];

    setWords(selectedWords);
    setTargetWord(target);
    setAttemptsRemaining(4);
    setStatus('active');
    setOutputLog([
      'ROBOCO INDUSTRIES (TM) TERMLINK PROTOCOL',
      'ENTER PASSWORD NOW',
      '',
      `${attemptsRemaining} ATTEMPT(S) LEFT: █ █ █ █`
    ]);
  }, [config, attemptsRemaining]);

  const guessWord = useCallback((guess: string) => {
    if (status !== 'active') return;
    const upperGuess = guess.toUpperCase();

    if (upperGuess === targetWord) {
      setStatus('success');
      setOutputLog(prev => [
        ...prev,
        `>${upperGuess}`,
        '>Exact match.',
        '>Please wait while system establishes connection...',
      ]);
      onSuccess?.();
    } else {
      const newAttempts = attemptsRemaining - 1;
      setAttemptsRemaining(newAttempts);
      const likeness = calculateLikeness(upperGuess, targetWord);

      setOutputLog(prev => [
        ...prev,
        `>${upperGuess}`,
        '>Entry denied.',
        `>Likeness=${likeness}`,
      ]);

      if (newAttempts <= 0) {
        setStatus('locked');
        onLockout?.();
      }
    }
  }, [status, targetWord, attemptsRemaining, calculateLikeness, onSuccess, onLockout]);

  const triggerDudRemoval = useCallback(() => {
    if (status !== 'active' || words.length <= 1) return;
    
    const duds = words.filter(w => w !== targetWord);
    if (duds.length === 0) return;

    const dudToRemove = duds[Math.floor(Math.random() * duds.length)];
    setWords(prev => prev.filter(w => w !== dudToRemove));
    setOutputLog(prev => [...prev, '>Dud removed.']);
  }, [status, words, targetWord]);

  const triggerAttemptReset = useCallback(() => {
    if (status !== 'active') return;
    setAttemptsRemaining(4);
    setOutputLog(prev => [...prev, '>Allowance replenished.']);
  }, [status]);

  return {
    status,
    attemptsRemaining,
    words,
    targetWord,
    outputLog,
    startGame,
    guessWord,
    triggerDudRemoval,
    triggerAttemptReset,
    setOutputLog,
  };
};
