import { useState, useCallback, useEffect } from 'react';

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

  // TODO: Implement word selection based on difficulty
  // TODO: Implement likeness scoring logic
  // TODO: Implement symbol noise triggers (Dud Removal, Attempt Reset)

  const startGame = useCallback((availableWords: string[]) => {
    setStatus('active');
    setAttemptsRemaining(4);
    setWords(availableWords);
    // Select random target word
    const randomTarget = availableWords[Math.floor(Math.random() * availableWords.length)];
    setTargetWord(randomTarget);
    setOutputLog(['ROBOCO INDUSTRIES (TM) TERMLINK PROTOCOL', 'ENTER PASSWORD NOW']);
  }, []);

  const guessWord = useCallback((guess: string) => {
    if (status !== 'active') return;

    if (guess === targetWord) {
      setStatus('success');
      setOutputLog(prev => [...prev, `>${guess}`, '>Password Accepted.', '>Terminating Connection...']);
      onSuccess?.();
    } else {
      const newAttempts = attemptsRemaining - 1;
      setAttemptsRemaining(newAttempts);
      
      // Calculate likeness
      let likeness = 0;
      for (let i = 0; i < Math.min(guess.length, targetWord.length); i++) {
        if (guess[i] === targetWord[i]) likeness++;
      }

      setOutputLog(prev => [...prev, `>${guess}`, '>Entry denied.', `>Likeness=${likeness}`]);

      if (newAttempts <= 0) {
        setStatus('locked');
        onLockout?.();
      }
    }
  }, [targetWord, status, attemptsRemaining, onSuccess, onLockout]);

  return {
    status,
    attemptsRemaining,
    words,
    targetWord,
    outputLog,
    startGame,
    guessWord,
    setOutputLog,
  };
};
