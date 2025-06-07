import React from 'react';
import { VimCommand } from '../types/game';
import { useTheme } from '../hooks/useTheme';

interface CommandDisplayProps {
  command: VimCommand;
  userInput: string;
}

export const CommandDisplay: React.FC<CommandDisplayProps> = ({ command, userInput }) => {
  const { currentTheme } = useTheme();

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
      <button
        type='button'
        style={{
          backgroundColor: currentTheme.colors.primary,
          color: currentTheme.colors.background,
        }}
        className='mt-4 px-4 py-2 rounded-md hover:opacity-90 transition-opacity'
        // onClick={() => setShowHint(!showHint)}
        onClick={() => alert(`${command.command}`)
      } // Temporary hint functionality
        >
          Show Answer
        </button>
        {/* {showHint && (
          <div className="mt-4 p-4 bg-zinc-800 rounded-md">
            <span className="text-zinc-400">Hint: {command.command}</span>
            </div>
        )} */}
    </div>
  );
};
