import React, { useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { useTerminal } from '../hooks/useTerminal';
import '@xterm/xterm/css/xterm.css';

interface TerminalWindowProps {
  commandHistory: string[];
  lastOutput: string;
  isProcessing: boolean;
  transcript: string;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ 
  commandHistory, 
  lastOutput, 
  isProcessing,
  transcript 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminal = useTerminal(containerRef.current);

  return (
    <div className="flex-1 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg border border-gray-700 shadow-xl flex flex-col overflow-hidden">
      <div className="bg-gray-900 p-3 border-b border-gray-700 flex items-center">
        <TerminalIcon className="w-5 h-5 mr-2 text-indigo-400" />
        <span className="font-medium">Terminal</span>
      </div>
      
      <div 
        ref={containerRef}
        className="flex-1 overflow-hidden font-mono"
        style={{ padding: '12px' }}
      />
    </div>
  );
};

export default TerminalWindow;