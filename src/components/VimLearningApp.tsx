import React, { useState } from 'react';
import { VimSimulator } from './VimSimulator';
import { CommandGuide } from './CommandGuide';
import { LearningPath } from './LearningPath';
import { useVimState } from '../hooks/useVimState';
import { LessonSelector } from './LessonSelector';
import { CommandCheatsheet } from './CommandCheatsheet';
import { ProgressTracker } from './ProgressTracker';
import { useTheme } from '../hooks/useTheme';

export const VimLearningApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'reference'>('learn');
  const [activeLesson, setActiveLesson] = useState(0);
  const { vimState, executeCommand, resetState } = useVimState();
  const { currentTheme } = useTheme();

  const handleTabChange = (tab: 'learn' | 'practice' | 'reference') => {
    setActiveTab(tab);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg">
        <button
          className="py-2 px-4 rounded transition-colors"
          style={{
            backgroundColor: activeTab === 'learn' ? currentTheme.colors.primary : `${currentTheme.colors.secondary}40`,
            color: activeTab === 'learn' ? currentTheme.colors.background : currentTheme.colors.text,
          }}
          onClick={() => handleTabChange('learn')}
        >
          Learn
        </button>
        <button
          className="py-2 px-4 rounded transition-colors"
          style={{
            backgroundColor: activeTab === 'practice' ? currentTheme.colors.primary : `${currentTheme.colors.secondary}40`,
            color: activeTab === 'practice' ? currentTheme.colors.background : currentTheme.colors.text,
          }}
          onClick={() => handleTabChange('practice')}
        >
          Practice
        </button>
        <button
          className="py-2 px-4 rounded transition-colors"
          style={{
            backgroundColor: activeTab === 'reference' ? currentTheme.colors.primary : `${currentTheme.colors.secondary}40`,
            color: activeTab === 'reference' ? currentTheme.colors.background : currentTheme.colors.text,
          }}
          onClick={() => handleTabChange('reference')}
        >
          Reference
        </button>
      </div>

      {activeTab === 'learn' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
            <LessonSelector 
              activeLesson={activeLesson} 
              setActiveLesson={setActiveLesson} 
            />
            <div className="mt-6">
              <ProgressTracker />
            </div>
          </div>
          <div className="lg:col-span-2 p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
            <LearningPath 
              activeLesson={activeLesson} 
              resetSimulator={resetState} 
            />
            <VimSimulator 
              vimState={vimState} 
              executeCommand={executeCommand} 
            />
          </div>
        </div>
      )}

      {activeTab === 'practice' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
            <CommandGuide />
          </div>
          <div className="lg:col-span-2 p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
            <VimSimulator 
              vimState={vimState} 
              executeCommand={executeCommand} 
              practiceMode={true}
            />
          </div>
        </div>
      )}

      {activeTab === 'reference' && (
        <div className="p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
          <CommandCheatsheet />
        </div>
      )}
    </div>
  );
};