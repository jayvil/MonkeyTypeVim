import React, { useEffect, useState } from 'react';
import { lessons } from '../data/lessons';
import { lessonProgressDB } from '../services/lessonProgressDB';
import { useTheme } from '../hooks/useTheme';

interface LessonSelectorProps {
  activeLesson: number;
  setActiveLesson: (index: number) => void;
}

interface LessonStatus {
  index: number;
  completed: boolean;
}

export const LessonSelector: React.FC<LessonSelectorProps> = ({ activeLesson, setActiveLesson }) => {
  const { currentTheme } = useTheme();
  const [lessonStatuses, setLessonStatuses] = useState<LessonStatus[]>([]);

  useEffect(() => {
    const progress = lessonProgressDB.getAllProgress();
    const statuses = lessons.map((_, index) => ({
      index,
      completed: progress[index]?.completed ?? false,
    }));
    setLessonStatuses(statuses);
  }, [activeLesson]); // Refresh when active lesson changes

  return (
    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: currentTheme.colors.primary }}>
        Lessons
      </h2>
      <div className="space-y-2">
        {lessonStatuses.map((status) => (
          <button
            key={status.index}
            onClick={() => setActiveLesson(status.index)}
            className="w-full p-3 rounded-lg flex items-center justify-between transition-all duration-300"
            style={{
              backgroundColor:
                activeLesson === status.index
                  ? currentTheme.colors.primary
                  : `${currentTheme.colors.secondary}20`,
              color:
                activeLesson === status.index
                  ? currentTheme.colors.background
                  : currentTheme.colors.text,
            }}
          >
            <span className="flex-1 text-left">{lessons[status.index].title}</span>
            {status.completed && (
              <span
                className="ml-2 text-sm px-2 py-1 rounded"
                style={{
                  backgroundColor: activeLesson === status.index
                    ? currentTheme.colors.background
                    : currentTheme.colors.primary,
                  color: activeLesson === status.index
                    ? currentTheme.colors.primary
                    : currentTheme.colors.background,
                }}
              >
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};