import { useState } from 'react';
import { VimState } from '../types/vim';
import { getSampleText } from '../utils/textUtils';

export const useVimState = () => {
  const [vimState, setVimState] = useState<VimState>({
    mode: 'normal',
    content: getSampleText(),
    cursorPosition: 0,
    selection: null,
    clipboard: '',
    lastCommand: '',
    commandBuffer: ''
  });

  const resetState = () => {
    setVimState({
      mode: 'normal',
      content: getSampleText(),
      cursorPosition: 0,
      selection: null,
      clipboard: '',
      lastCommand: '',
      commandBuffer: ''
    });
  };

  const executeCommand = (key: string) => {
    setVimState(prevState => {
      let newState = { ...prevState };
      
      // Handle mode switching
      if (key === 'i' && prevState.mode === 'normal') {
        return {
          ...prevState,
          mode: 'insert',
          lastCommand: 'i (enter insert mode)'
        };
      }

      if (key === 'v' && prevState.mode === 'normal') {
        return {
          ...prevState,
          mode: 'visual',
          selection: { start: prevState.cursorPosition, end: prevState.cursorPosition },
          lastCommand: 'v (enter visual mode)'
        };
      }

      if (key === 'ESC' || key === 'Escape') {
        return {
          ...prevState,
          mode: 'normal',
          selection: null,
          lastCommand: 'ESC (return to normal mode)'
        };
      }

      // Handle different modes
      switch (prevState.mode) {
        case 'normal':
          return handleNormalMode(prevState, key);
        case 'insert':
          return handleInsertMode(prevState, key);
        case 'visual':
          return handleVisualMode(prevState, key);
        default:
          return prevState;
      }
    });
  };

  const handleNormalMode = (state: VimState, key: string): VimState => {
    const content = state.content;
    let cursorPosition = state.cursorPosition;
    const lines = content.split('\n');
    
    // Find current line and column
    let currentLineIndex = 0;
    let currentCol = 0;
    let charsProcessed = 0;
    
    for (let i = 0; i < lines.length; i++) {
      if (charsProcessed + lines[i].length >= cursorPosition) {
        currentLineIndex = i;
        currentCol = cursorPosition - charsProcessed;
        break;
      }
      // +1 for newline character
      charsProcessed += lines[i].length + 1;
    }
    
    const currentLine = lines[currentLineIndex];
    
    switch (key) {
      case 'h': // Move left
        if (currentCol > 0) {
          cursorPosition--;
        }
        return { ...state, cursorPosition, lastCommand: 'h (move left)' };
        
      case 'j': // Move down
        if (currentLineIndex < lines.length - 1) {
          // Calculate position in next line
          const nextLineLength = lines[currentLineIndex + 1].length;
          const targetCol = Math.min(currentCol, nextLineLength);
          
          // Calculate new cursor position
          let newPosition = 0;
          for (let i = 0; i <= currentLineIndex; i++) {
            newPosition += lines[i].length + 1; // +1 for newline
          }
          newPosition += targetCol;
          
          cursorPosition = newPosition;
        }
        return { ...state, cursorPosition, lastCommand: 'j (move down)' };
        
      case 'k': // Move up
        if (currentLineIndex > 0) {
          // Calculate position in previous line
          const prevLineLength = lines[currentLineIndex - 1].length;
          const targetCol = Math.min(currentCol, prevLineLength);
          
          // Calculate new cursor position
          let newPosition = 0;
          for (let i = 0; i < currentLineIndex - 1; i++) {
            newPosition += lines[i].length + 1; // +1 for newline
          }
          newPosition += targetCol;
          
          cursorPosition = newPosition;
        }
        return { ...state, cursorPosition, lastCommand: 'k (move up)' };
        
      case 'l': // Move right
        if (currentCol < currentLine.length - 1) {
          cursorPosition++;
        }
        return { ...state, cursorPosition, lastCommand: 'l (move right)' };
        
      case 'x': // Delete character at cursor
        if (currentLine.length > 0) {
          const newContent = 
            content.substring(0, cursorPosition) + 
            content.substring(cursorPosition + 1);
          return { ...state, content: newContent, lastCommand: 'x (delete character)' };
        }
        return state;
        
      default:
        return { ...state, lastCommand: `${key} (command not implemented)` };
    }
  };

  const handleInsertMode = (state: VimState, key: string): VimState => {
    let { content, cursorPosition } = state;
    
    if (key === 'Backspace') {
      if (cursorPosition > 0) {
        const newContent = 
          content.substring(0, cursorPosition - 1) + 
          content.substring(cursorPosition);
        return { 
          ...state, 
          content: newContent, 
          cursorPosition: cursorPosition - 1,
          lastCommand: 'Backspace (delete previous character)'
        };
      }
      return state;
    }
    
    if (key === 'Enter') {
      const newContent = 
        content.substring(0, cursorPosition) + 
        '\n' + 
        content.substring(cursorPosition);
      return {
        ...state,
        content: newContent,
        cursorPosition: cursorPosition + 1,
        lastCommand: 'Enter (new line)'
      };
    }
    
    if (key.length === 1) { // Regular character input
      const newContent = 
        content.substring(0, cursorPosition) + 
        key + 
        content.substring(cursorPosition);
      return {
        ...state,
        content: newContent,
        cursorPosition: cursorPosition + 1,
        lastCommand: `${key} (insert character)`
      };
    }
    
    return state;
  };

  const handleVisualMode = (state: VimState, key: string): VimState => {
    const { cursorPosition, selection } = state;
    
    if (!selection) {
      return state;
    }
    
    let newSelection = { ...selection };
    
    switch (key) {
      case 'h': // Move left in visual mode
        if (cursorPosition > 0) {
          const newCursorPosition = cursorPosition - 1;
          newSelection.end = newCursorPosition;
          return { 
            ...state, 
            cursorPosition: newCursorPosition, 
            selection: newSelection,
            lastCommand: 'h (extend selection left)'
          };
        }
        return state;
        
      case 'l': // Move right in visual mode
        if (cursorPosition < state.content.length - 1) {
          const newCursorPosition = cursorPosition + 1;
          newSelection.end = newCursorPosition;
          return { 
            ...state, 
            cursorPosition: newCursorPosition, 
            selection: newSelection,
            lastCommand: 'l (extend selection right)'
          };
        }
        return state;
        
      // Other visual mode commands would go here
        
      default:
        return { ...state, lastCommand: `${key} (visual command not implemented)` };
    }
  };

  return { vimState, executeCommand, resetState };
};