import React, { useState } from 'react';
import { X, Volume2, Mic, Monitor, Moon, Sun, Globe } from 'lucide-react';
import { Rnd } from 'react-rnd';

interface SettingsProps {
  onClose: () => void;
  onVolumeChange: (volume: number) => void;
  onMicSensitivityChange: (sensitivity: number) => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
  onLanguageChange: (language: string) => void;
}

const Settings: React.FC<SettingsProps> = ({
  onClose,
  onVolumeChange,
  onMicSensitivityChange,
  onThemeChange,
  onLanguageChange,
}) => {
  const [volume, setVolume] = useState(75);
  const [micSensitivity, setMicSensitivity] = useState(50);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState('en-US');

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    onVolumeChange(newVolume);
  };

  const handleMicSensitivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSensitivity = parseInt(e.target.value);
    setMicSensitivity(newSensitivity);
    onMicSensitivityChange(newSensitivity);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    onLanguageChange(e.target.value);
  };

  return (
    <Rnd
      default={{
        x: 150,
        y: 150,
        width: 500,
        height: 600,
      }}
      minWidth={400}
      minHeight={400}
      className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className="bg-gray-900 p-3 flex items-center justify-between border-b border-gray-700">
          <h2 className="text-lg font-medium">Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-8">
            {/* Sound Settings */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Volume2 className="w-5 h-5 mr-2" />
                Sound
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">System Volume</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-400 mt-1">{volume}%</div>
                </div>
              </div>
            </div>

            {/* Microphone Settings */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Mic className="w-5 h-5 mr-2" />
                Microphone
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Input Sensitivity</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={micSensitivity}
                    onChange={handleMicSensitivityChange}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-400 mt-1">{micSensitivity}%</div>
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Monitor className="w-5 h-5 mr-2" />
                Appearance
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Theme</label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        theme === 'light' ? 'bg-indigo-600' : 'bg-gray-700'
                      }`}
                    >
                      <Sun className="w-4 h-4" />
                      <span>Light</span>
                    </button>
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-700'
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      <span>Dark</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Settings */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Language
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">System Language</label>
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Español</option>
                    <option value="fr-FR">Français</option>
                    <option value="de-DE">Deutsch</option>
                    <option value="ja-JP">日本語</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default Settings;