import { useState, useEffect, useCallback } from 'react';

interface VoiceRecognitionHook {
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  supported: boolean;
}

export const useVoiceRecognition = (): VoiceRecognitionHook => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check for browser support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      
      recognitionInstance.onresult = (event: any) => {
        const currentTranscript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
          
        setTranscript(currentTranscript);
      };
      
      recognitionInstance.onend = () => {
        if (listening) {
          recognitionInstance.start();
        }
      };
      
      setRecognition(recognitionInstance);
      setSupported(true);
    } else {
      console.warn('Speech recognition not supported in this browser');
      setSupported(false);
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognition && supported) {
      try {
        recognition.start();
        setListening(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  }, [recognition, supported]);

  const stopListening = useCallback(() => {
    if (recognition && supported) {
      recognition.stop();
      setListening(false);
    }
  }, [recognition, supported]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    supported
  };
};