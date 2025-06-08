const STORAGE_KEY = 'vim-learning-progress';

interface LessonProgress {
  lessonId: number;
  completed: boolean;
  completedAt?: string; // ISO date string
}

export const lessonProgressDB = {
  setLessonProgress(lessonId: number, completed: boolean): void {
    const allProgress = this.getAllProgress();
    const updatedProgress = {
      ...allProgress,
      [lessonId]: {
        lessonId,
        completed,
        completedAt: completed ? new Date().toISOString() : undefined,
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
  },

  getLessonProgress(lessonId: number): LessonProgress | undefined {
    const allProgress = this.getAllProgress();
    return allProgress[lessonId];
  },

  getAllProgress(): Record<number, LessonProgress> {
    const progressStr = localStorage.getItem(STORAGE_KEY);
    return progressStr ? JSON.parse(progressStr) : {};
  },

  clearProgress(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
}; 