import { useState, useEffect } from 'react';

interface SpeechSynthesisHook {
  speak: (text: string) => void;
  speaking: boolean;
  cancel: () => void;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice) => void;
}

export const useSpeechSynthesis = (): SpeechSynthesisHook => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    // Initialize voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        
        // Try to find a good default voice (preferably female, English)
        const defaultVoice = availableVoices.find(
          voice => voice.lang.includes('en') && voice.name.includes('Female')
        ) || availableVoices[0];
        
        setSelectedVoice(defaultVoice);
      }
    };

    loadVoices();
    
    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = (text: string) => {
    if (!text || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  return {
    speak,
    speaking,
    cancel,
    voices,
    selectedVoice,
    setSelectedVoice
  };
};