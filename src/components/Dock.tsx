import React from 'react';
import { Terminal, Globe, HardDrive, Package, Settings, FileText, Coffee } from 'lucide-react';

interface DockProps {
  onBrowserClick: () => void;
  onSettingsClick: () => void;
  onFileExplorerClick: () => void;
}

const Dock: React.FC<DockProps> = ({ onBrowserClick, onSettingsClick, onFileExplorerClick }) => {
  const dockItems = [
    { icon: <Terminal className="w-6 h-6" />, name: 'Terminal' },
    { icon: <Globe className="w-6 h-6" />, name: 'Browser', onClick: onBrowserClick },
    { icon: <HardDrive className="w-6 h-6" />, name: 'Files', onClick: onFileExplorerClick },
    { icon: <Package className="w-6 h-6" />, name: 'Apps' },
    { icon: <FileText className="w-6 h-6" />, name: 'Editor' },
    { icon: <Coffee className="w-6 h-6" />, name: 'Break' },
    { icon: <Settings className="w-6 h-6" />, name: 'Settings', onClick: onSettingsClick },
  ];

  return (
    <div className="flex justify-center mb-4">
      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md border border-gray-700 rounded-full p-2 flex items-center space-x-2">
        {dockItems.map((item, index) => (
          <button 
            key={index} 
            className="p-2 rounded-full hover:bg-gray-700 transition-colors group relative"
            aria-label={item.name}
            onClick={item.onClick}
          >
            <div className="text-gray-300 group-hover:text-white">
              {item.icon}
            </div>
            
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {item.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dock;