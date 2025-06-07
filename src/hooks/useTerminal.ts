import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import localforage from 'localforage';

interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => Promise<string>;
}

export const useTerminal = (containerRef: HTMLElement | null) => {
  const terminalRef = useRef<Terminal | null>(null);
  const commandHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);

  const commands: Record<string, Command> = {
    help: {
      name: 'help',
      description: 'Show available commands',
      execute: async () => {
        return Object.values(commands)
          .map(cmd => `${cmd.name.padEnd(15)} - ${cmd.description}`)
          .join('\n');
      }
    },
    clear: {
      name: 'clear',
      description: 'Clear terminal screen',
      execute: async () => {
        terminalRef.current?.clear();
        return '';
      }
    },
    ls: {
      name: 'ls',
      description: 'List directory contents',
      execute: async () => {
        const files = await localforage.getItem('files') as Record<string, any> || {};
        return Object.keys(files).join('\n');
      }
    },
    install: {
      name: 'install',
      description: 'Install a package',
      execute: async (args) => {
        if (!args.length) return 'Usage: install <package-name>';
        const pkg = args[0];
        await new Promise(resolve => setTimeout(resolve, 1500));
        return `Installing ${pkg}...\nPackage ${pkg} installed successfully!`;
      }
    }
  };

  useEffect(() => {
    if (!containerRef || terminalRef.current) return;

    const terminal = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'JetBrains Mono, monospace',
      theme: {
        background: '#1a1b26',
        foreground: '#a9b1d6',
        cursor: '#c0caf5'
      }
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    terminal.loadAddon(fitAddon);
    terminal.loadAddon(webLinksAddon);

    terminal.open(containerRef);
    fitAddon.fit();

    terminal.writeln('Welcome to AI OS Terminal');
    terminal.writeln('Type "help" for available commands');
    terminal.write('\n$ ');

    let currentLine = '';

    terminal.onKey(({ key, domEvent }) => {
      const ev = domEvent as KeyboardEvent;

      if (ev.key === 'Enter') {
        terminal.write('\r\n');
        if (currentLine.trim()) {
          const [cmd, ...args] = currentLine.trim().split(' ');
          if (commands[cmd]) {
            commands[cmd].execute(args).then(output => {
              if (output) terminal.writeln(output);
              terminal.write('\n$ ');
            });
          } else {
            terminal.writeln(`Command not found: ${cmd}`);
            terminal.write('\n$ ');
          }
          commandHistoryRef.current.push(currentLine);
          historyIndexRef.current = commandHistoryRef.current.length;
        } else {
          terminal.write('$ ');
        }
        currentLine = '';
      } else if (ev.key === 'Backspace') {
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          terminal.write('\b \b');
        }
      } else if (ev.key === 'ArrowUp') {
        if (historyIndexRef.current > 0) {
          historyIndexRef.current--;
          currentLine = commandHistoryRef.current[historyIndexRef.current];
          terminal.write('\x1b[2K\r$ ' + currentLine);
        }
      } else if (ev.key === 'ArrowDown') {
        if (historyIndexRef.current < commandHistoryRef.current.length - 1) {
          historyIndexRef.current++;
          currentLine = commandHistoryRef.current[historyIndexRef.current];
          terminal.write('\x1b[2K\r$ ' + currentLine);
        }
      } else if (!ev.ctrlKey && !ev.altKey) {
        currentLine += key;
        terminal.write(key);
      }
    });

    terminalRef.current = terminal;

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      terminal.dispose();
    };
  }, [containerRef]);

  return terminalRef.current;
};