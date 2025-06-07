import React, { useState, useRef, useEffect } from 'react';
import { X, RefreshCw, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Rnd } from 'react-rnd';
import { useV86 } from '../hooks/useV86';

interface WebBrowserProps {
  onClose: () => void;
}

const WebBrowser: React.FC<WebBrowserProps> = ({ onClose }) => {
  const [url, setUrl] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const browserRef = useRef<HTMLDivElement>(null);
  const emulator = useV86();

  useEffect(() => {
    if (emulator) {
      // Install Chromium in the Linux environment if not already installed
      emulator.keyboard_send_text('apk add chromium\n');
    }
  }, [emulator]);

  const navigate = async (newUrl: string) => {
    if (!emulator) return;

    let processedUrl = newUrl;
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      if (!newUrl.includes('.') || newUrl.includes(' ')) {
        processedUrl = `https://www.google.com/search?q=${encodeURIComponent(newUrl)}`;
      } else {
        processedUrl = `https://${newUrl}`;
      }
    }

    // Launch Chromium in the Linux environment with the URL
    const command = `chromium --no-sandbox ${processedUrl}\n`;
    emulator.keyboard_send_text(command);

    setUrl(processedUrl);
    setHistory(prev => [...prev.slice(0, historyIndex + 1), processedUrl]);
    setHistoryIndex(prev => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(url);
  };

  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 800,
        height: 600,
      }}
      minWidth={400}
      minHeight={300}
      className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className="bg-gray-900 p-2 flex items-center space-x-2">
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => historyIndex > 0 && navigate(history[historyIndex - 1])}
            disabled={historyIndex <= 0}
            className="p-1 hover:bg-gray-700 rounded disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => historyIndex < history.length - 1 && navigate(history[historyIndex + 1])}
            disabled={historyIndex >= history.length - 1}
            className="p-1 hover:bg-gray-700 rounded disabled:opacity-50"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <form onSubmit={handleSubmit} className="flex-1 flex items-center">
            <div className="flex-1 bg-gray-800 rounded-lg flex items-center px-3 py-1">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
                placeholder="Search Google or enter URL"
              />
            </div>
          </form>
        </div>
        
        <div ref={browserRef} className="flex-1 bg-white" />
      </div>
    </Rnd>
  );
};

export default WebBrowser;