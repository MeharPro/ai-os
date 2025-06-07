import { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface AICommandsHook {
  processCommand: (command: string) => Promise<string>;
  isThinking: boolean;
}

export const useAICommands = (): AICommandsHook => {
  const [isThinking, setIsThinking] = useState(false);

  const processCommand = async (command: string): Promise<string> => {
    setIsThinking(true);
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant that helps users interact with a Linux system. Convert natural language into appropriate shell commands. If the request isn't clear, ask for clarification. Always explain what the commands do."
          },
          {
            role: "user",
            content: command
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      const response = completion.choices[0]?.message?.content || "I couldn't process that command.";
      return response;
    } catch (error) {
      console.error('Error processing command:', error);
      return "Sorry, I encountered an error processing your command.";
    } finally {
      setIsThinking(false);
    }
  };

  return {
    processCommand,
    isThinking
  };
};