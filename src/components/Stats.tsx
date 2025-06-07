import React from 'react';
import { useGameStore } from '../store/gameStore';
import { useTheme } from '../hooks/useTheme';

export const Stats: React.FC = () => {
  const { commandsPerSecond, accuracy, totalCommands } = useGameStore();
  const { currentTheme } = useTheme();

  const statBoxStyle = {
    backgroundColor: `${currentTheme.colors.secondary}20`,
    borderColor: currentTheme.colors.secondary,
    borderWidth: '1px',
  };

  const statValueStyle = {
    color: currentTheme.colors.primary,
  };

  const statLabelStyle = {
    color: currentTheme.colors.secondary,
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <div className="p-4 rounded-lg text-center" style={statBoxStyle}>
        <div className="text-2xl font-bold" style={statValueStyle}>
          {commandsPerSecond.toFixed(1)}
        </div>
        <div className="text-sm" style={statLabelStyle}>Commands/sec</div>
      </div>
      
      <div className="p-4 rounded-lg text-center" style={statBoxStyle}>
        <div className="text-2xl font-bold" style={statValueStyle}>
          {accuracy}%
        </div>
        <div className="text-sm" style={statLabelStyle}>Accuracy</div>
      </div>
      
      <div className="p-4 rounded-lg text-center" style={statBoxStyle}>
        <div className="text-2xl font-bold" style={statValueStyle}>
          {totalCommands}
        </div>
        <div className="text-sm" style={statLabelStyle}>Total Commands</div>
      </div>
    </div>
  );
};