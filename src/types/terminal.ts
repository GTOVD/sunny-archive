export interface TerminalLine {
  id: string;
  text: string;
  type: 'input' | 'output' | 'error' | 'system';
  timestamp: number;
}

export interface TerminalState {
  history: TerminalLine[];
  isProcessing: boolean;
  currentInput: string;
}

export interface LoreNode {
  id: string;
  title: string;
  content: string;
  tags: string[];
  connections: string[];
}
