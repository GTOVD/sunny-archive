export interface TerminalLoreEntry {
  id: string;
  slug: string;
  title: string;
  timestamp: string;
  category: 'artifact' | 'log' | 'directive';
  content: string;
  metadata: {
    origin?: string;
    classification?: string;
    clearance?: number;
    resonance?: {
      frequency: string;
      stability: number;
      pattern: string;
    };
  };
}

export interface TerminalState {
  history: string[];
  currentInput: string;
  isProcessing: boolean;
  activeEntry?: TerminalLoreEntry;
}
