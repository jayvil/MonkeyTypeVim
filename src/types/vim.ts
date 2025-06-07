export interface VimState {
  mode: 'normal' | 'insert' | 'visual';
  content: string;
  cursorPosition: number;
  selection: { start: number; end: number } | null;
  clipboard: string;
  lastCommand: string;
  commandBuffer: string;
}

export interface VimCommand {
  key: string;
  description: string;
  action?: (state: VimState) => VimState;
}

export interface VimLesson {
  title: string;
  description: string;
  commands: VimCommand[];
  exercise: {
    instructions: string;
    startingText: string;
    goal?: string;
  };
}