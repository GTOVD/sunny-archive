/**
 * TERMINAL LOGIC - CORE ENGINE
 * Implements the command processing and state management for the Sacred Lore Terminal.
 * Luxury Boutique Style: Immutable state updates, modular command handlers.
 */

import { TerminalCommand, LoreNode } from './LoreTypes';

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
  }
};

export const processCommand = (input: string): string => {
  const cmd = input.toUpperCase().trim();
  
  if (cmd === 'HELP') {
    return "AVAILABLE COMMANDS: HELP, LIST, READ <ID>, CLEAR";
  }
  
  if (cmd === 'LIST') {
    return "AVAILABLE LORE NODES: " + Object.keys(LORE_DATABASE).join(', ');
  }
  
  if (cmd.startsWith('READ ')) {
    const id = cmd.replace('READ ', '');
    const node = LORE_DATABASE[id];
    if (node) {
      return `[${node.title}]\n${node.content}\nClearance: ${node.clearance}`;
    }
    return `ERROR: NODE '${id}' NOT FOUND.`;
  }
  
  return `UNKNOWN COMMAND: '${input}'. TYPE 'HELP' FOR ASSISTANCE.`;
};
