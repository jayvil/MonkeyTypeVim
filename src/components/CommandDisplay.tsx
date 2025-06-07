import React, { useState, useEffect, useRef } from 'react';
import { VimCommand } from '../types/game';
import { useTheme } from '../hooks/useTheme';

interface CommandDisplayProps {
  command: VimCommand;
  userInput: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onRestart: () => void;
}

export const CommandDisplay: React.FC<CommandDisplayProps> = ({ 
  command, 
  userInput, 
  onInputChange,
  onSubmit,
  onRestart
}) => {
  const { currentTheme } = useTheme();
  const [showAnswer, setShowAnswer] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [tabPressed, setTabPressed] = useState(false);

  // Hide answer when command changes (i.e., after submission)
  useEffect(() => {
    setShowAnswer(false);
  }, [command]);

  // Focus input on mount and after command changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [command]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault(); // Prevent tab from moving focus
      setTabPressed(true);
    } else if (e.key === 'Enter') {
      if (tabPressed) {
        // If Tab was pressed before Enter, restart the game
        onRestart();
        setTabPressed(false);
      } else {
        // Normal submit
        onSubmit();
      }
      e.preventDefault();
    } else {
      // Any other key press resets the tab state
      setTabPressed(false);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      setTabPressed(false);
    }
  };

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
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          className="w-full p-4 rounded-md font-mono text-xl focus:outline-none"
          style={{ 
            backgroundColor: `${currentTheme.colors.background}80`,
            border: `1px solid ${currentTheme.colors.secondary}40`,
            color: currentTheme.colors.primary,
          }}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      <div style={{ color: currentTheme.colors.secondary }} className="text-sm flex flex-col items-center gap-1">
        <div>Press Enter to submit your command.</div>
        <div>Press Tab + Enter to restart the test.</div>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          style={{
            backgroundColor: showAnswer ? currentTheme.colors.secondary : currentTheme.colors.primary,
            color: currentTheme.colors.background,
          }}
          className="px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          onClick={() => {
            setShowAnswer(!showAnswer);
            // Refocus the input after showing/hiding answer
            inputRef.current?.focus();
          }}
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
