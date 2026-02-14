import { LoreEntry, TerminalLine, TerminalState } from './types';

/**
 * Zown Lore Engine (Core Implementation)
 * Implements the logic for the Interactive Lore Terminal.
 * Design Philosophy: Luxury Boutique - Clean, Modular, Immersive.
 */

export class LoreEngine {
  private static instance: LoreEngine;
  private entries: LoreEntry[] = [];

  private constructor() {
    // Initial lore seed could be loaded here or passed via init
  }

  public static getInstance(): LoreEngine {
    if (!LoreEngine.instance) {
      LoreEngine.instance = new LoreEngine();
    }
    return LoreEngine.instance;
  }

  /**
   * Processes a raw command string and returns the resulting terminal lines.
   */
  public processCommand(command: string, state: TerminalState): TerminalLine[] {
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        return [
          this.createLine('system', 'AVAILABLE COMMANDS:'),
          this.createLine('output', 'LIST - Display all accessible lore fragments'),
          this.createLine('output', 'READ <id> - Decrypt and display a specific entry'),
          this.createLine('output', 'CLEAR - Purge terminal buffer'),
          this.createLine('output', 'WHOAMI - Display current authorization level'),
          this.createLine('system', 'END OF HELP.')
        ];

      case 'list':
        if (this.entries.length === 0) {
          return [this.createLine('error', 'NO FRAGMENTS FOUND IN LOCAL BUFFER.')];
        }
        return [
          this.createLine('system', 'FRAGMENT DIRECTORY:'),
          ...this.entries
            .filter(e => !e.restricted || state.currentUser === 'admin')
            .map(e => this.createLine('output', `[${e.id}] ${e.title}`))
        ];

      case 'read':
        if (args.length === 0) return [this.createLine('error', 'USAGE: READ <id>')];
        const entry = this.entries.find(e => e.id.toLowerCase() === args[0].toLowerCase());
        if (!entry) return [this.createLine('error', `FRAGMENT [${args[0]}] NOT FOUND.`)];
        if (entry.restricted && state.currentUser !== 'admin') {
          return [this.createLine('error', 'ACCESS DENIED: LEVEL 2 CLEARANCE REQUIRED.')];
        }
        return [
          this.createLine('system', `DECRYPTING: ${entry.title}...`),
          this.createLine('output', entry.content)
        ];

      case 'whoami':
        return [
          this.createLine('output', `USER: ${state.currentUser || 'GUEST'}`),
          this.createLine('output', `CLEARANCE: ${state.currentUser === 'admin' ? 'LEVEL 2' : 'LEVEL 1'}`)
        ];

      default:
        return [this.createLine('error', `UNKNOWN COMMAND: ${cmd}. TYPE 'HELP' FOR LIST.`)];
    }
  }

  private createLine(type: TerminalLine['type'], content: string): TerminalLine {
    return {
      type,
      content,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Seeds the engine with initial lore fragments.
   */
  public seed(entries: LoreEntry[]): void {
    this.entries = entries;
  }
}
