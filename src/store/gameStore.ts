import { create } from 'zustand';
import { VimCommand } from '../types/game';
import { vimCommands } from '../data/vimCommands';
import { testResultsDB } from '../services/testResultsDB';

interface GameState {
  commands: VimCommand[];
  currentCommandIndex: number;
  userInput: string;
  isGameActive: boolean;
  correctCommands: number;
  totalAttempts: number;
  commandsPerSecond: number;
  accuracy: number;
  totalCommands: number;
  startGame: () => void;
  endGame: (shouldSave: boolean) => void;
  updateUserInput: (input: string) => void;
  checkCommand: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  commands: [],
  currentCommandIndex: 0,
  userInput: '',
  isGameActive: false,
  correctCommands: 0,
  totalAttempts: 0,
  commandsPerSecond: 0,
  accuracy: 0,
  totalCommands: 0,

  startGame: () => {
    const shuffledCommands = [...vimCommands]
      .sort(() => Math.random() - 0.5)
      .slice(0, vimCommands.length);
    
    set({
      commands: shuffledCommands,
      currentCommandIndex: 0,
      userInput: '',
      isGameActive: true,
      correctCommands: 0,
      totalAttempts: 0,
      commandsPerSecond: 0,
      accuracy: 0,
      totalCommands: 0,
    });
  },

  endGame: (shouldSave: boolean) => set((state) => {
    const commandsPerSecond = state.correctCommands / 30;
    const accuracy = Math.round((state.correctCommands / state.totalAttempts) * 100) || 0;
    const totalCommands = state.correctCommands;

    // Only save test results if shouldSave is true
    if (shouldSave) {
      testResultsDB.saveTestResult({
        commandsPerSecond,
        accuracy,
        totalCommands,
      }).catch(error => console.error('Error saving test results:', error));
    }

    return {
      isGameActive: false,
      commandsPerSecond,
      accuracy,
      totalCommands,
    };
  }),

  updateUserInput: (input: string) => set({ userInput: input }),

  checkCommand: () => set((state) => {
    if (!state.isGameActive) return state;

    const isCorrect = state.userInput === state.commands[state.currentCommandIndex].command;
    
    // Implement circular buffer by using modulo operator
    const nextIndex = (state.currentCommandIndex + 1) % state.commands.length;
    
    return {
      currentCommandIndex: nextIndex,
      userInput: '',
      correctCommands: isCorrect ? state.correctCommands + 1 : state.correctCommands,
      totalAttempts: state.totalAttempts + 1,
    };
  }),
}));