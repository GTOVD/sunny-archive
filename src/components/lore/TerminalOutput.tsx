import React from 'react';
import { TerminalLine } from '@/lib/lore/types';

interface TerminalOutputProps {
  history: TerminalLine[];
}

/**
 * TerminalOutput
 * Renders the command history with distinct colors for each line type.
 */
export default function TerminalOutput({ history }: TerminalOutputProps) {
  return (
    <div className="space-y-1">
      {history.map((line, i) => (
        <div key={i} className="flex flex-col">
          <div className="flex items-start space-x-3">
            <span className="text-[10px] text-stone-700 pt-1 shrink-0 tabular-nums">
              [{new Date(line.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
            </span>
            <div className={`break-words ${getLineStyle(line.type)}`}>
              {line.type === 'input' && <span className="mr-2 text-stone-600">❯</span>}
              {line.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getLineStyle(type: TerminalLine['type']): string {
  switch (type) {
    case 'input':
      return 'text-stone-300 font-medium';
    case 'output':
      return 'text-stone-400';
    case 'error':
      return 'text-red-900/80 italic';
    case 'system':
      return 'text-stone-600 uppercase tracking-tight text-[11px]';
    default:
      return 'text-stone-500';
  }
}
