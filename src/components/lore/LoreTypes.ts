export interface TerminalCommand {
  input: string;
  output: string;
  timestamp: number;
}

export interface LoreNode {
  id: string;
  title: string;
  content: string;
  clearance: 'UNRESTRICTED' | 'CONFIDENTIAL' | 'TOP_SECRET';
  tags: string[];
}
