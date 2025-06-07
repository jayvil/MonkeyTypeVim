import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface TimerProps {
  timeLeft: number;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, isActive }) => {
  const { currentTheme } = useTheme();

  return (
    <div 
      className="text-4xl font-bold"
      style={{ 
        color: isActive 
          ? timeLeft <= 5 
            ? currentTheme.colors.accent 
            : currentTheme.colors.primary
          : currentTheme.colors.secondary 
      }}
    >
      {timeLeft}s
    </div>
  );
};