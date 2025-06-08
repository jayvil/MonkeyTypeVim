import React, { useEffect, useState } from 'react';
import { lessons } from '../data/lessons';
import { lessonProgressDB } from '../services/lessonProgressDB';
import { KeyboardKey } from './KeyboardKey';
import { useTheme } from '../hooks/useTheme';

interface LearningPathProps {
  activeLesson: number;
  resetSimulator: (text: string) => void;
}

export const LearningPath: React.FC<LearningPathProps> = ({
  activeLesson,
  resetSimulator,
}) => {
  const { currentTheme } = useTheme();
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const currentLesson = lessons[activeLesson];

  useEffect(() => {
    const progress = lessonProgressDB.getLessonProgress(activeLesson);
    setIsLessonCompleted(progress?.completed ?? false);
  }, [activeLesson]);

  const toggleLessonCompletion = () => {
    const newCompletionState = !isLessonCompleted;
    lessonProgressDB.setLessonProgress(activeLesson, newCompletionState);
    setIsLessonCompleted(newCompletionState);
  };

  // Reset simulator when the lesson changes
  useEffect(() => {
    resetSimulator('');
  }, [activeLesson, resetSimulator]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold" style={{ color: currentTheme.colors.primary }}>
          {currentLesson.title}
        </h2>
        <button
          onClick={toggleLessonCompletion}
          className="px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          style={{
            backgroundColor: isLessonCompleted ? currentTheme.colors.primary : 'transparent',
            color: isLessonCompleted ? currentTheme.colors.background : currentTheme.colors.text,
            border: `2px solid ${currentTheme.colors.primary}`,
          }}
        >
          {isLessonCompleted ? (
            <>
              <span>✓</span>
              <span>Completed</span>
            </>
          ) : (
            'Mark as Done'
          )}
        </button>
      </div>

      <p className="mb-4" style={{ color: currentTheme.colors.text }}>
        {currentLesson.description}
      </p>
      
      <div className="p-4 rounded-md mb-4" style={{ backgroundColor: `${currentTheme.colors.secondary}40` }}>
        <h3 className="font-bold mb-2" style={{ color: currentTheme.colors.accent }}>Commands to Learn</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {currentLesson.commands.map((command, index) => (
            <div key={index} className="flex items-center gap-2">
              <KeyboardKey>{command.key}</KeyboardKey>
              <span style={{ color: currentTheme.colors.text }}>{command.description}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 rounded-md mb-6" style={{ backgroundColor: `${currentTheme.colors.secondary}40` }}>
        <h3 className="font-bold mb-2" style={{ color: currentTheme.colors.accent }}>Exercise</h3>
        <p className="text-sm mb-4" style={{ color: currentTheme.colors.text }}>{currentLesson.exercise.instructions}</p>
        <div 
          className="text-sm p-3 rounded font-mono whitespace-pre-wrap"
          style={{ 
            backgroundColor: `${currentTheme.colors.secondary}20`,
            color: currentTheme.colors.text,
          }}
        >
          {currentLesson.exercise.startingText}
        </div>
      </div>
    </div>
  );
};