import React from 'react';
import { lessons } from '../data/lessons';
import { useTheme } from '../hooks/useTheme';

interface LessonSelectorProps {
  activeLesson: number;
  setActiveLesson: (index: number) => void;
}

export const LessonSelector: React.FC<LessonSelectorProps> = ({
  activeLesson,
  setActiveLesson,
}) => {
  const { currentTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold" style={{ color: currentTheme.colors.primary }}>Lessons</h2>
      
      <div className="flex flex-col gap-2">
        {lessons.map((lesson, index) => (
          <button
            key={index}
            className="text-left p-3 rounded-md transition-colors"
            style={{
              backgroundColor: activeLesson === index 
                ? currentTheme.colors.primary 
                : `${currentTheme.colors.secondary}40`,
              color: activeLesson === index 
                ? currentTheme.colors.background 
                : currentTheme.colors.text,
            }}
            onClick={() => setActiveLesson(index)}
          >
            <div className="font-bold">{lesson.title}</div>
            <div className="text-sm mt-1" style={{ opacity: 0.8 }}>{lesson.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};