import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { CommandDisplay } from './CommandDisplay';
import { Stats } from './Stats';
import { Timer } from './Timer';
import { useTheme } from '../hooks/useTheme';

export const VimTypeGame: React.FC = () => {
  const { currentTheme } = useTheme();
  const { 
    commands,
    currentCommandIndex,
    userInput,
    isGameActive,
    startGame,
    endGame,
    updateUserInput,
    checkCommand
  } = useGameStore();

  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedDuration, setSelectedDuration] = useState(30);

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isGameActive) {
      endGame();
    }
  }, [isGameActive, timeLeft, endGame]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isGameActive) return;
    
    if (e.key === 'Enter') {
      checkCommand();
    } else if (e.key === 'Backspace') {
      updateUserInput(userInput.slice(0, -1));
    } else if (e.key.length === 1) {
      updateUserInput(userInput + e.key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleStart = () => {
    setTimeLeft(selectedDuration);
    startGame();
  };

  return (
    <div className="mt-16 flex flex-col items-center gap-8 max-w-2xl mx-auto">
      <Timer timeLeft={timeLeft} isActive={isGameActive} />
      
      <div className="flex gap-4">
        {[10, 30, 45, 60].map((duration) => (
          <button
            disabled={isGameActive}
            key={duration}
            style={{
              backgroundColor: selectedDuration === duration ? currentTheme.colors.primary : currentTheme.colors.secondary,
              color: currentTheme.colors.background,
              opacity: isGameActive ? 0.5 : 1,
            }}
            className="px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            onClick={() => {
              setSelectedDuration(duration);
              setTimeLeft(duration);
            }}
          >
            {duration}s
          </button>
        ))}
      </div>

      <div 
        className="w-full p-8 rounded-lg backdrop-blur-sm"
        style={{
          backgroundColor: `${currentTheme.colors.secondary}20`,
          borderColor: currentTheme.colors.secondary,
          borderWidth: '1px',
        }}
      >
        {isGameActive ? (
          <CommandDisplay
            command={commands[currentCommandIndex]}
            userInput={userInput}
          />
        ) : (
          <div className="text-center">
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: currentTheme.colors.primary }}
            >
              Test Your Vim Command Speed 
            </h2>
            <p 
              className="mb-6"
              style={{ color: currentTheme.colors.secondary }}
            >
              How many vim commands can you accurately enter? Type the Vim command and press Enter after each command.
            </p>
            <button
              onClick={handleStart}
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: currentTheme.colors.background,
              }}
              className="px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity"
            >
              Start Test
            </button>
          </div>
        )}
      </div>

      <Stats />
    </div>
  );
};