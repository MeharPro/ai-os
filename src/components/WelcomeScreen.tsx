import React, { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-6 transform transition-all duration-1000 translate-y-0 opacity-100">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-full mb-4">
            <Mic className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
            AI OS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">Voice-Controlled Linux in Your Browser</p>
          <p className="text-gray-400 max-w-lg mx-auto">
            Just speak naturally to control a full Linux environment. No keyboard needed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg border border-gray-700">
            <h3 className="font-medium text-indigo-400 mb-2">Voice Control</h3>
            <p className="text-sm text-gray-300">Control everything using only your voice</p>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg border border-gray-700">
            <h3 className="font-medium text-indigo-400 mb-2">AI Powered</h3>
            <p className="text-sm text-gray-300">AI translates your words into shell commands</p>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg border border-gray-700">
            <h3 className="font-medium text-indigo-400 mb-2">Browser Native</h3>
            <p className="text-sm text-gray-300">Runs entirely in your browser - no installation</p>
          </div>
        </div>
        
        <button 
          onClick={onStart}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium shadow-lg transition-all duration-300 transform ${
            showButton ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          } hover:scale-105`}
        >
          Start AI OS
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;