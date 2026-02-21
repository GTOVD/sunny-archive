export interface LoreEntry {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  tags: string[];
  restricted: boolean;
  resonanceType?: string;
  triggers?: string[];
}

export interface TerminalState {
  history: TerminalLine[];
  isLocked: boolean;
  currentUser: string | null;
  activeResonance?: string;
  unlockedTriggers?: string[];
}

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system' | 'resonance';
  content: string;
  timestamp: string;
}
