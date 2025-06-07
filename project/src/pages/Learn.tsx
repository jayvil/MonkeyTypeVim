import React, { useEffect } from 'react';
import { VimLearningApp } from '../components/VimLearningApp';
import { useTheme } from '../hooks/useTheme';

export const Learn: React.FC = () => {
  const { currentTheme } = useTheme();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto p-4 flex-grow flex flex-col min-h-0">
      <VimLearningApp />
    </div>
  );
}; 