import React from 'react';
import { lessons } from '../data/lessons';
import { KeyboardKey } from './KeyboardKey';
import { useTheme } from '../hooks/useTheme';

interface LearningPathProps {
  activeLesson: number;
  resetSimulator: () => void;
}

export const LearningPath: React.FC<LearningPathProps> = ({
  activeLesson,
  resetSimulator,
}) => {
  const lesson = lessons[activeLesson];
  const { currentTheme } = useTheme();

  // Reset simulator when the lesson changes
  React.useEffect(() => {
    resetSimulator();
  }, [activeLesson, resetSimulator]);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2" style={{ color: currentTheme.colors.primary }}>{lesson.title}</h2>
      <p className="mb-4" style={{ color: currentTheme.colors.text }}>{lesson.description}</p>
      
      <div className="p-4 rounded-md mb-4" style={{ backgroundColor: `${currentTheme.colors.secondary}40` }}>
        <h3 className="font-bold mb-2" style={{ color: currentTheme.colors.accent }}>Commands to Learn</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {lesson.commands.map((command, index) => (
            <div key={index} className="flex items-center gap-2">
              <KeyboardKey>{command.key}</KeyboardKey>
              <span style={{ color: currentTheme.colors.text }}>{command.description}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 rounded-md mb-6" style={{ backgroundColor: `${currentTheme.colors.secondary}40` }}>
        <h3 className="font-bold mb-2" style={{ color: currentTheme.colors.accent }}>Exercise</h3>
        <p className="text-sm mb-4" style={{ color: currentTheme.colors.text }}>{lesson.exercise.instructions}</p>
        <div 
          className="text-sm p-3 rounded font-mono whitespace-pre-wrap"
          style={{ 
            backgroundColor: `${currentTheme.colors.secondary}20`,
            color: currentTheme.colors.text,
          }}
        >
          {lesson.exercise.startingText}
        </div>
      </div>
    </div>
  );
};