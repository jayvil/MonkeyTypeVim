import { create } from 'zustand';
import { VimCommand } from '../types/game';
import { vimCommands } from '../data/vimCommands';

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
  endGame: () => void;
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

  endGame: () => set((state) => ({
    isGameActive: false,
    commandsPerSecond: state.correctCommands / vimCommands.length,
    accuracy: Math.round((state.correctCommands / state.totalAttempts) * 100) || 0,
    totalCommands: state.correctCommands,
  })),

  updateUserInput: (input: string) => set({ userInput: input }),

  checkCommand: () => set((state) => {
    if (!state.isGameActive) return state;

    const isCorrect = state.userInput === state.commands[state.currentCommandIndex].command;
    
    return {
      currentCommandIndex: state.currentCommandIndex + 1,
      userInput: '',
      correctCommands: isCorrect ? state.correctCommands + 1 : state.correctCommands,
      totalAttempts: state.totalAttempts + 1,
    };
  }),
}));