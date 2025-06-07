import React from 'react';
import { Mic, MicOff, Volume2, VolumeX, RefreshCw } from 'lucide-react';

interface TopBarProps {
  listening: boolean;
  onToggleListening: () => void;
  muted: boolean;
  onToggleMute: () => void;
  isProcessing: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ 
  listening, 
  onToggleListening, 
  muted, 
  onToggleMute,
  isProcessing
}) => {
  return (
    <div className="bg-gray-800 backdrop-blur-md bg-opacity-80 border-b border-gray-700 p-3 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-lg">AI OS</span>
        <span className="text-xs bg-indigo-600 px-2 py-0.5 rounded-full">Alpha</span>
      </div>
      
      <div className="flex items-center space-x-4">
        {isProcessing && (
          <div className="flex items-center">
            <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin mr-2" />
            <span className="text-sm text-indigo-300">Processing...</span>
          </div>
        )}
        
        <button 
          onClick={onToggleMute}
          className={`p-2 rounded-full transition-colors ${muted ? 'bg-gray-700 text-gray-400' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        
        <button 
          onClick={onToggleListening}
          className={`p-2 rounded-full transition-colors ${listening ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          {listening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default TopBar;