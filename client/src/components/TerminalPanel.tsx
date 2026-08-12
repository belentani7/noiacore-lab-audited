/* NOIACORE Design Reminder: La terminal es un ritual de descubrimiento; precisa, legible y con recompensa microinteractiva. */
import { FormEvent, useMemo, useState } from 'react';
import { ArrowUpRight, Command, Copy, RotateCcw, Terminal as TerminalIcon, X } from 'lucide-react';
import { commandResponses } from '@/lib/noiacoreData';

type TerminalPanelProps = {
  embedded?: boolean;
  onClose?: () => void;
};

export function TerminalPanel({ embedded = false, onClose }: TerminalPanelProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['NOIACORE KERNEL v4.2.0 OMEGA INITIALIZED.', 'Neural link established with primary node.', 'Type "help" for a command index.']);
  const [isProcessing, setIsProcessing] = useState(false);

  const suggestions = useMemo(() => ['help', 'status', 'scan', 'matrix', 'manifest'], []);

  const execute = (value: string) => {
    const command = value.trim().toLowerCase();
    if (!command) return;
    if (command === 'clear') {
      setHistory(['LOCAL CONSOLE RESET.', 'Type "help" for a command index.']);
      setInput('');
      return;
    }

    const response = commandResponses[command] || [`UNKNOWN COMMAND: ${command}`, 'The core does not recognize this signal.', 'Type "help" to return to the command index.'];
    setIsProcessing(true);
    setHistory((previous) => [...previous, `> ${command}`, ...response]);
    setInput('');
    window.setTimeout(() => setIsProcessing(false), 420);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    execute(input);
  };

  const panel = (
    <div className={`terminal-panel ${embedded ? 'terminal-panel--embedded' : ''}`}>
      <div className="terminal-panel__topbar">
        <div className="terminal-panel__title">
          <span className="terminal-panel__status" />
          <TerminalIcon size={14} />
          <span>NOIACORE / LOCAL CONSOLE</span>
        </div>
        <div className="terminal-panel__actions">
          <button type="button" onClick={() => setHistory(['LOCAL CONSOLE RESET.', 'Type "help" for a command index.'])} aria-label="Reset console">
            <RotateCcw size={13} />
          </button>
          {onClose && <button type="button" onClick={onClose} aria-label="Close console"><X size={15} /></button>}
        </div>
      </div>
      <div className="terminal-panel__body" aria-live="polite">
        {history.map((line, index) => (
          <div key={`${line}-${index}`} className={line.startsWith('>') ? 'terminal-line terminal-line--command' : 'terminal-line'}>
            <span className="terminal-line__index">{String(index + 1).padStart(2, '0')}</span>
            <span>{line}</span>
          </div>
        ))}
        {isProcessing && <div className="terminal-line terminal-line--processing"><span className="terminal-line__index">··</span><span>PROCESSING SIGNAL<span className="processing-dots">...</span></span></div>}
      </div>
      <div className="terminal-panel__suggestions">
        {suggestions.map((suggestion) => (
          <button type="button" key={suggestion} onClick={() => execute(suggestion)}>{suggestion}</button>
        ))}
      </div>
      <form className="terminal-panel__form" onSubmit={submit}>
        <span className="terminal-panel__prompt">&gt;</span>
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Enter a command..." aria-label="Terminal command" />
        <button type="submit" aria-label="Execute command"><ArrowUpRight size={15} /></button>
      </form>
    </div>
  );

  return embedded ? panel : <div className="terminal-overlay">{panel}</div>;
}
