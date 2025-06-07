import React, { useState, useEffect } from 'react';
import { VimCommand } from '../types/game';
import { useTheme } from '../hooks/useTheme';

interface CommandDisplayProps {
  command: VimCommand;
  userInput: string;
}

export const CommandDisplay: React.FC<CommandDisplayProps> = ({ command, userInput }) => {
  const { currentTheme } = useTheme();
  const [showAnswer, setShowAnswer] = useState(false);

  // Hide answer when command changes (i.e., after submission)
  useEffect(() => {
    setShowAnswer(false);
  }, [command]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <p style={{ color: currentTheme.colors.secondary }} className="mb-2">
          What is the VIM Command To:
        </p>
        <div className="flex items-center gap-2 justify-center">
          {/*<span className="text-2xl font-mono text-emerald-500">{command.command}</span>*/}
          {/*<span className="text-zinc-500">-</span>*/}
          <span style={{ color: currentTheme.colors.text }}>{command.description}</span>
        </div>
      </div>

      <div className="w-full max-w-md">
        <div 
          className="p-4 rounded-md font-mono text-xl"
          style={{ 
            backgroundColor: `${currentTheme.colors.background}80`,
            border: `1px solid ${currentTheme.colors.secondary}40`
          }}
        >
          <span style={{ color: currentTheme.colors.primary }}>{userInput}</span>
          <span 
            className="animate-pulse"
            style={{ color: currentTheme.colors.secondary }}
          >|</span>
        </div>
      </div>
      <div style={{ color: currentTheme.colors.secondary }} className="text-sm">
        Press Enter to submit your command.
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          style={{
            backgroundColor: showAnswer ? currentTheme.colors.secondary : currentTheme.colors.primary,
            color: currentTheme.colors.background,
          }}
          className="px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
        
        {showAnswer && (
          <div 
            className="p-3 rounded-md font-mono text-center transition-all"
            style={{ 
              backgroundColor: `${currentTheme.colors.secondary}20`,
              border: `1px solid ${currentTheme.colors.secondary}40`,
              color: currentTheme.colors.primary,
            }}
          >
            {command.command}
          </div>
        )}
      </div>
    </div>
  );
};
