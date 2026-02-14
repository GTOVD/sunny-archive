export interface TerminalState {
  history: TerminalLine[];
  isProcessing: boolean;
}

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  timestamp: string;
}

export interface CommandResponse {
  output: string;
  error?: string;
  nextStep?: string;
}
