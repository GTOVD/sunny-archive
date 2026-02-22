/**
 * Symbol Sequence Detection Utility
 * Detects sequences like [...] or <...> in terminal noise.
 */

export interface SymbolSequence {
  text: string;
  startIndex: number;
  endIndex: number;
}

const SEQUENCE_PAIRS: Record<string, string> = {
  '[': ']',
  '<': '>',
  '(': ')',
  '{': '}'
};

export function findSymbolSequences(content: string): SymbolSequence[] {
  const sequences: SymbolSequence[] = [];
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (SEQUENCE_PAIRS[char]) {
      const closingChar = SEQUENCE_PAIRS[char];
      // Search for closing char on the same line (up to reasonable length)
      const closingIndex = content.indexOf(closingChar, i + 1);
      
      // Found a pair, ensuring no words are inside the sequence (noise only)
      if (closingIndex !== -1 && closingIndex - i > 1) {
        const sequenceText = content.substring(i, closingIndex + 1);
        // Only accept if it's strictly symbols inside
        if (/^[\[\]<>\(\)\{\}\!@#\$%\^&\*\(\)_+\-=\|\:\,.\?\/]+$/.test(sequenceText)) {
          sequences.push({
            text: sequenceText,
            startIndex: i,
            endIndex: closingIndex
          });
        }
      }
    }
  }
  
  return sequences;
}
