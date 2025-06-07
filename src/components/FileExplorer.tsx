import React, { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown, X } from 'lucide-react';
import { Rnd } from 'react-rnd';

interface FileExplorerProps {
  onClose: () => void;
}

interface FileSystemItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemItem[];
}

const FileExplorer: React.FC<FileExplorerProps> = ({ onClose }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const fileSystem: FileSystemItem[] = [
    {
      name: 'Home',
      type: 'folder',
      children: [
        { name: 'Documents', type: 'folder', children: [
          { name: 'notes.txt', type: 'file' },
          { name: 'report.pdf', type: 'file' }
        ]},
        { name: 'Downloads', type: 'folder', children: [
          { name: 'image.jpg', type: 'file' }
        ]},
        { name: 'Desktop', type: 'folder', children: [] },
        { name: 'config.json', type: 'file' }
      ]
    }
  ];

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderItem = (item: FileSystemItem, path: string, depth: number = 0) => {
    const isExpanded = expandedFolders.has(path);
    const paddingLeft = `${depth * 20}px`;

    return (
      <div key={path}>
        <div
          className="flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer"
          style={{ paddingLeft }}
          onClick={() => item.type === 'folder' && toggleFolder(path)}
        >
          {item.type === 'folder' && (
            isExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />
          )}
          {item.type === 'folder' ? (
            <Folder className="w-4 h-4 mr-2 text-indigo-400" />
          ) : (
            <File className="w-4 h-4 mr-2 text-gray-400" />
          )}
          <span className="text-sm">{item.name}</span>
        </div>
        
        {item.type === 'folder' && isExpanded && item.children?.map(child =>
          renderItem(
            child,
            `${path}/${child.name}`,
            depth + 1
          )
        )}
      </div>
    );
  };

  return (
    <Rnd
      default={{
        x: 50,
        y: 50,
        width: 300,
        height: 400,
      }}
      minWidth={200}
      minHeight={200}
      className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className="bg-gray-900 p-2 flex items-center justify-between border-b border-gray-700">
          <h2 className="text-sm font-medium">File Explorer</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {fileSystem.map(item => renderItem(item, item.name))}
        </div>
      </div>
    </Rnd>
  );
};

export default FileExplorer;