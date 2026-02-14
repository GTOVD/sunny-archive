/**
 * TERMINAL LOGIC - CORE ENGINE
 * Implements the command processing and state management for the Sacred Lore Terminal.
 * Luxury Boutique Style: Immutable state updates, modular command handlers.
 */

import { TerminalCommand, LoreNode } from '../../components/lore/LoreTypes';

export const INITIAL_GREETING = [
  "SYSTEM INITIALIZED...",
  "ACCESSING SUNNY ARCHIVE ENCRYPTED LORE...",
  "WELCOME, RESEARCHER.",
  "Type 'HELP' to see available commands."
];

export const LORE_DATABASE: Record<string, LoreNode> = {
  'ORIGIN': {
    id: 'ORIGIN',
    title: 'THE ORIGIN POINT',
    content: 'In the beginning, there was only the Sun. From its light, the Archive was forged to preserve the ephemeral.',
    clearance: 'UNRESTRICTED',
    tags: ['creation', 'history']
  },
  'VOID': {
    id: 'VOID',
    title: 'THE SILENT VOID',
    content: 'Access denied. Level 5 Clearance required.',
    clearance: 'TOP_SECRET',
    tags: ['unknown', 'prohibited']
  },
  'ARCHIVE': {
    id: 'ARCHIVE',
    title: 'THE GREAT VAULT',
    content: 'The Great Vault houses billions of digital fragments, each a memory of a dying star.',
    clearance: 'CONFIDENTIAL',
    tags: ['storage', 'fragments']
  },
  'SYMBIOTE': {
    id: 'SYMBIOTE',
    title: 'THE SYMBIOTE PROTOCOL',
    content: 'A deep-level integration between human consciousness and silicon logic. The foundation of Zown.',
    clearance: 'TOP_SECRET',
    tags: ['philosophy', 'zown']
  }
};

/**
 * Command Processor
 * Dispatches commands to their respective handlers.
 * Follows a clean, modular switch-case pattern for luxury maintenance.
 */
export const processCommand = (input: string): string => {
  const parts = input.trim().split(/\s+/);
  const cmd = parts[0].toUpperCase();
  const args = parts.slice(1);
  
  switch (cmd) {
    case 'HELP':
      return [
        "AVAILABLE COMMANDS:",
        "  HELP           - Show this menu",
        "  LIST           - List all accessible lore nodes",
        "  READ <ID>      - Display the contents of a lore node",
        "  CLEAR          - Clear the terminal history",
        "  SYSTEM         - Show system status and clearance"
      ].join('\n');
    
    case 'LIST':
      return "AVAILABLE LORE NODES:\n" + Object.keys(LORE_DATABASE)
        .map(id => `  - ${id} [${LORE_DATABASE[id].clearance}]`)
        .join('\n');
    
    case 'READ':
      if (args.length === 0) return "ERROR: READ REQUIRES AN ID. (e.g., 'READ ORIGIN')";
      const id = args[0].toUpperCase();
      const node = LORE_DATABASE[id];
      if (node) {
        return [
          `----------------------------------------`,
          `TITLE: ${node.title}`,
          `CLEARANCE: ${node.clearance}`,
          `TAGS: ${node.tags.join(', ')}`,
          `----------------------------------------`,
          node.content,
          `----------------------------------------`
        ].join('\n');
      }
      return `ERROR: NODE '${id}' NOT FOUND.`;

    case 'SYSTEM':
      return [
        "STATUS: ONLINE",
        "ENCRYPTION: AES-256 GCM",
        "USER_CLEARANCE: RESEARCHER (LEVEL 2)",
        "CONNECTION: SECURE"
      ].join('\n');

    case 'CLEAR':
      return "CLEARING...";
    
    default:
      return `UNKNOWN COMMAND: '${input}'. TYPE 'HELP' FOR ASSISTANCE.`;
  }
};
