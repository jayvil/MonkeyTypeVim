import React, { useEffect, useState } from 'react';
import { lessons } from '../data/lessons';
import { lessonProgressDB } from '../services/lessonProgressDB';
import { useTheme } from '../hooks/useTheme';

export const ProgressTracker: React.FC = () => {
  const { currentTheme } = useTheme();
  const [completedLessons, setCompletedLessons] = useState<number>(0);
  const totalLessons = lessons.length;

  useEffect(() => {
    const progress = lessonProgressDB.getAllProgress();
    const completed = Object.values(progress).filter(p => p.completed).length;
    setCompletedLessons(completed);
  }, []);

  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Progress</h3>
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute h-full transition-all duration-300 ease-in-out rounded-full"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: currentTheme.colors.primary,
          }}
        />
      </div>
      <div className="mt-2 text-sm text-center">
        {completedLessons} of {totalLessons} lessons completed ({progressPercentage}%)
      </div>
    </div>
  );
};