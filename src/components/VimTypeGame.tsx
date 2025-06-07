import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { CommandDisplay } from './CommandDisplay';
import { Stats } from './Stats';
import { Timer } from './Timer';
import { useTheme } from '../hooks/useTheme';
import { playEndChime } from '../utils/audio';

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
  const [customDuration, setCustomDuration] = useState('');

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isGameActive) {
      endGame();
      playEndChime();
    }
  }, [isGameActive, timeLeft, endGame]);

  const handleRestart = useCallback(() => {
    endGame();
    setTimeLeft(selectedDuration);
    startGame();
  }, [endGame, selectedDuration, startGame]);

  const handleInputChange = useCallback((value: string) => {
    updateUserInput(value);
  }, [updateUserInput]);

  const handleSubmit = useCallback(() => {
    checkCommand();
  }, [checkCommand]);

  const handleStart = () => {
    let finalDuration = selectedDuration;
    
    if (customDuration) {
      const customValue = parseInt(customDuration);
      if (customValue < 5) {
        finalDuration = 5;
      } else if (customValue > 300) {
        finalDuration = 300;
      } else {
        finalDuration = customValue;
      }
      setCustomDuration(finalDuration.toString());
      setSelectedDuration(finalDuration);
    }
    
    setTimeLeft(finalDuration);
    startGame();
  };

  const handleCustomDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomDuration(value);
      if (value && value !== '0') {
        const numValue = parseInt(value);
        if (numValue >= 5 && numValue <= 300) {
          setSelectedDuration(numValue);
          setTimeLeft(numValue);
        }
      }
    }
  };

  const handleStop = useCallback(() => {
    endGame();
  }, [endGame]);

  return (
    <div className="mt-16 flex flex-col items-center gap-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Timer timeLeft={timeLeft} isActive={isGameActive} />
        {isGameActive && (
          <button
            onClick={handleStop}
            className="p-2 rounded-full hover:opacity-90 transition-all flex items-center justify-center"
            style={{
              backgroundColor: currentTheme.colors.secondary,
              color: currentTheme.colors.background,
            }}
            title="Stop Test"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <rect x="6" y="6" width="12" height="12" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="flex gap-4 items-center">
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
              setCustomDuration('');
            }}
          >
            {duration}s
          </button>
        ))}
        <div className="flex items-center gap-2">
          <input
            type="text"
            disabled={isGameActive}
            value={customDuration}
            onChange={handleCustomDurationChange}
            placeholder="Custom (5-300s)"
            style={{
              backgroundColor: `${currentTheme.colors.secondary}20`,
              color: currentTheme.colors.text,
              borderColor: currentTheme.colors.secondary,
            }}
            className="px-3 py-2 rounded-md border w-44 focus:outline-none focus:border-2"
          />
          {customDuration && (
            <span style={{ color: currentTheme.colors.secondary }}>seconds</span>
          )}
        </div>
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
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onRestart={handleRestart}
          />
        ) : (
          <div className="text-center">
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: currentTheme.colors.primary }}
            >
              Test Your Vim Knowledge
            </h2>
            <p 
              className="mb-6"
              style={{ color: currentTheme.colors.secondary }}
            >
              How many vim commands can you enter correctly? <br /><br />
              Type the Vim command and press Enter after each command. <br /><br />
              Press Tab + Enter anytime during the test to restart.
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