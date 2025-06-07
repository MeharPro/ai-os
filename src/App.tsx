import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Terminal, Settings as SettingsIcon, Volume2, VolumeX, HardDrive, Package, Globe, RefreshCw } from 'lucide-react';
import TerminalWindow from './components/TerminalWindow';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import WelcomeScreen from './components/WelcomeScreen';
import WebBrowser from './components/WebBrowser';
import Settings from './components/Settings';
import FileExplorer from './components/FileExplorer';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import { useAICommands } from './hooks/useAICommands';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [listening, setListening] = useState(false);
  const [muted, setMuted] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [lastOutput, setLastOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(false);

  const { transcript, startListening, stopListening, resetTranscript } = useVoiceRecognition();
  const { processCommand, isThinking } = useAICommands();
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    if (transcript && transcript.trim() !== '' && !isProcessing) {
      handleCommandExecution(transcript);
    }
  }, [transcript]);

  const handleCommandExecution = async (command: string) => {
    setIsProcessing(true);
    resetTranscript();
    
    setCommandHistory(prev => [...prev, command]);
    
    const result = await processCommand(command);
    
    setLastOutput(result);
    
    if (!muted) {
      speak(result);
    }
    
    setIsProcessing(false);
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
      setListening(false);
    } else {
      startListening();
      setListening(true);
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const startOS = () => {
    setShowWelcome(false);
    startListening();
    setListening(true);
  };

  const handleVolumeChange = (volume: number) => {
    // Implement volume control
    console.log('Volume changed:', volume);
  };

  const handleMicSensitivityChange = (sensitivity: number) => {
    // Implement mic sensitivity control
    console.log('Mic sensitivity changed:', sensitivity);
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    // Implement theme change
    console.log('Theme changed:', theme);
  };

  const handleLanguageChange = (language: string) => {
    // Implement language change
    console.log('Language changed:', language);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {showWelcome ? (
        <WelcomeScreen onStart={startOS} />
      ) : (
        <>
          <TopBar 
            listening={listening} 
            onToggleListening={toggleListening}
            muted={muted}
            onToggleMute={toggleMute}
            isProcessing={isThinking || isProcessing}
          />
          
          <div className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden">
            <TerminalWindow 
              commandHistory={commandHistory} 
              lastOutput={lastOutput} 
              isProcessing={isThinking}
              transcript={listening ? transcript : ''}
            />
          </div>
          
          <Dock 
            onBrowserClick={() => setShowBrowser(true)}
            onSettingsClick={() => setShowSettings(true)}
            onFileExplorerClick={() => setShowFileExplorer(true)}
          />

          {showBrowser && (
            <WebBrowser onClose={() => setShowBrowser(false)} />
          )}

          {showSettings && (
            <Settings
              onClose={() => setShowSettings(false)}
              onVolumeChange={handleVolumeChange}
              onMicSensitivityChange={handleMicSensitivityChange}
              onThemeChange={handleThemeChange}
              onLanguageChange={handleLanguageChange}
            />
          )}

          {showFileExplorer && (
            <FileExplorer onClose={() => setShowFileExplorer(false)} />
          )}
        </>
      )}
    </div>
  );
}

export default App