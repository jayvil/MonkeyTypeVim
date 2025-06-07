import React from 'react';
import { useTheme } from '../hooks/useTheme';

export const ProgressTracker: React.FC = () => {
  const { currentTheme } = useTheme();
  
  // This would normally be connected to a state management system
  // For now, we'll use a static display
  const progress = {
    lessonsCompleted: 2,
    totalLessons: 8,
    practiceTime: 45, // minutes
    commandsMastered: 12,
    totalCommands: 50
  };

  const percentComplete = Math.round((progress.lessonsCompleted / progress.totalLessons) * 100);
  const commandsMasteredPercent = Math.round((progress.commandsMastered / progress.totalCommands) * 100);

  return (
    <div className="p-4 rounded-md" style={{ backgroundColor: `${currentTheme.colors.secondary}40` }}>
      <h3 className="font-bold mb-3" style={{ color: currentTheme.colors.primary }}>Your Progress</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1" style={{ color: currentTheme.colors.text }}>
            <span>Lessons</span>
            <span>{progress.lessonsCompleted} of {progress.totalLessons}</span>
          </div>
          <div className="w-full h-2.5 rounded-full" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
            <div 
              className="h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ 
                width: `${percentComplete}%`,
                backgroundColor: currentTheme.colors.accent,
              }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1" style={{ color: currentTheme.colors.text }}>
            <span>Commands Mastered</span>
            <span>{progress.commandsMastered} of {progress.totalCommands}</span>
          </div>
          <div className="w-full h-2.5 rounded-full" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
            <div 
              className="h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ 
                width: `${commandsMasteredPercent}%`,
                backgroundColor: currentTheme.colors.primary,
              }}
            ></div>
          </div>
        </div>
        
        <div className="pt-2" style={{ borderTop: `1px solid ${currentTheme.colors.secondary}40` }}>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: currentTheme.colors.text }}>Practice time</span>
            <span className="text-lg font-semibold" style={{ color: currentTheme.colors.accent }}>{progress.practiceTime} min</span>
          </div>
        </div>
      </div>
    </div>
  );
};