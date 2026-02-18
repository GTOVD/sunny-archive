export interface LoreNode {
  id: string;
  title: string;
  content: string;
  clearance: 'UNRESTRICTED' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';
  tags: string[];
}

export interface TerminalCommand {
  input: string;
  output: string;
  timestamp: number;
}

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
  };
}

export interface TerminalState {
  history: string[];
  currentInput: string;
  isProcessing: boolean;
  activeEntry?: TerminalLoreEntry;
}
