// Add WebKit speech recognition types since TypeScript doesn't include them natively
interface Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}