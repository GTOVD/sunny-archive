export interface LoreEntry {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  tags: string[];
  restricted: boolean;
}

export interface TerminalState {
  history: TerminalLine[];
  isLocked: boolean;
  currentUser: string | null;
}

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  timestamp: string;
}
