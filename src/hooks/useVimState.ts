import { useState, useCallback } from 'react';
import { VimState } from '../types/vim';
import { getSampleText } from '../utils/textUtils';

export const useVimState = (initialContent?: string) => {
  const [vimState, setVimState] = useState<VimState>({
    mode: 'normal',
    content: initialContent || getSampleText(),
    cursorPosition: 0,
    selection: null,
    clipboard: '',
    lastCommand: '',
    commandBuffer: '',
    searchBuffer: '',
    lastSearch: '',
  });

  const resetState = useCallback((newContent?: string) => {
    setVimState({
      mode: 'normal',
      content: newContent || initialContent || getSampleText(),
      cursorPosition: 0,
      selection: null,
      clipboard: '',
      lastCommand: '',
      commandBuffer: '',
      searchBuffer: '',
      lastSearch: '',
    });
  }, [initialContent]);

  const executeCommand = useCallback((key: string) => {
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
        case 'search':
          return handleSearchMode(prevState, key);
        default:
          return prevState;
      }
    });
  }, []);

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
      charsProcessed += lines[i].length + 1;
    }
    
    const currentLine = lines[currentLineIndex];
    
    // Helper function to get position at start of line
    const getLineStartPosition = (lineIndex: number): number => {
      let pos = 0;
      for (let i = 0; i < lineIndex; i++) {
        pos += lines[i].length + 1;
      }
      return pos;
    };

    // Helper function to get first non-blank character position in a line
    const getFirstNonBlankPosition = (line: string, lineStartPos: number): number => {
      const firstNonBlank = line.search(/\S/);
      return firstNonBlank === -1 ? lineStartPos : lineStartPos + firstNonBlank;
    };

    // Helper function to find word boundaries
    const findWordBoundaries = (text: string, pos: number): { start: number; end: number } => {
      const wordPattern = /\w+/g;
      let match;
      while ((match = wordPattern.exec(text)) !== null) {
        if (pos >= match.index && pos <= match.index + match[0].length) {
          return { start: match.index, end: match.index + match[0].length };
        }
      }
      return { start: pos, end: pos };
    };

    switch (key) {
      // Basic movement commands
      case 'h': // Move left
        if (currentCol > 0) {
          cursorPosition--;
        }
        return { ...state, cursorPosition, lastCommand: 'h (move left)' };
        
      case 'j': // Move down
        if (currentLineIndex < lines.length - 1) {
          const nextLineLength = lines[currentLineIndex + 1].length;
          const targetCol = Math.min(currentCol, nextLineLength);
          cursorPosition = getLineStartPosition(currentLineIndex + 1) + targetCol;
        }
        return { ...state, cursorPosition, lastCommand: 'j (move down)' };
        
      case 'k': // Move up
        if (currentLineIndex > 0) {
          const prevLineLength = lines[currentLineIndex - 1].length;
          const targetCol = Math.min(currentCol, prevLineLength);
          cursorPosition = getLineStartPosition(currentLineIndex - 1) + targetCol;
        }
        return { ...state, cursorPosition, lastCommand: 'k (move up)' };
        
      case 'l': // Move right
        if (currentCol < currentLine.length - 1) {
          cursorPosition++;
        }
        return { ...state, cursorPosition, lastCommand: 'l (move right)' };

      // Word movement commands
      case 'w': // Move to start of next word
        {
          const remainingLine = content.slice(cursorPosition);
          const nextWord = remainingLine.match(/\s+\S/);
          if (nextWord && nextWord.index !== undefined) {
            cursorPosition += nextWord.index + nextWord[0].length - 1;
          }
          return { ...state, cursorPosition, lastCommand: 'w (next word)' };
        }

      case 'b': // Move to start of previous word
        {
          const beforeCursor = content.slice(0, cursorPosition);
          const prevWord = beforeCursor.match(/\S+\s*$/);
          if (prevWord) {
            cursorPosition = beforeCursor.length - prevWord[0].length;
          }
          return { ...state, cursorPosition, lastCommand: 'b (previous word)' };
        }

      case 'e': // Move to end of word
        {
          const remainingLine = content.slice(cursorPosition);
          const endWord = remainingLine.match(/\S+/);
          if (endWord) {
            cursorPosition += endWord[0].length - 1;
          }
          return { ...state, cursorPosition, lastCommand: 'e (end of word)' };
        }

      // Line navigation commands
      case '0': // Move to start of line
        cursorPosition = getLineStartPosition(currentLineIndex);
        return { ...state, cursorPosition, lastCommand: '0 (start of line)' };

      case '$': // Move to end of line
        cursorPosition = getLineStartPosition(currentLineIndex) + currentLine.length - 1;
        return { ...state, cursorPosition, lastCommand: '$ (end of line)' };

      case '^': // Move to first non-blank character
        cursorPosition = getFirstNonBlankPosition(currentLine, getLineStartPosition(currentLineIndex));
        return { ...state, cursorPosition, lastCommand: '^ (first non-blank)' };

      // File navigation commands
      case 'g':
        if (state.commandBuffer === 'g') {
          // gg - go to first line
          return { 
            ...state, 
            cursorPosition: 0,
            commandBuffer: '',
            lastCommand: 'gg (go to first line)' 
          };
        }
        return { ...state, commandBuffer: 'g' };

      case 'G': // Go to last line
        cursorPosition = content.length - 1;
        return { ...state, cursorPosition, lastCommand: 'G (go to last line)' };

      // Editing commands
      case 'x': // Delete character at cursor
        if (currentLine.length > 0) {
          const newContent = 
            content.substring(0, cursorPosition) + 
            content.substring(cursorPosition + 1);
          return { ...state, content: newContent, lastCommand: 'x (delete character)' };
        }
        return state;

      case 'd':
        if (state.commandBuffer === 'd') {
          // dd - delete line
          const newLines = [...lines];
          newLines.splice(currentLineIndex, 1);
          return {
            ...state,
            content: newLines.join('\n'),
            cursorPosition: getLineStartPosition(currentLineIndex),
            commandBuffer: '',
            clipboard: currentLine + '\n',
            lastCommand: 'dd (delete line)'
          };
        }
        return { ...state, commandBuffer: 'd' };

      case 'y':
        if (state.commandBuffer === 'y') {
          // yy - yank line
          return {
            ...state,
            commandBuffer: '',
            clipboard: currentLine + '\n',
            lastCommand: 'yy (yank line)'
          };
        }
        return { ...state, commandBuffer: 'y' };

      case 'p': // Paste after cursor
        if (state.clipboard) {
          const newContent = 
            content.substring(0, cursorPosition + 1) +
            state.clipboard +
            content.substring(cursorPosition + 1);
          return {
            ...state,
            content: newContent,
            lastCommand: 'p (paste)'
          };
        }
        return state;

      case 'u': // Undo (simplified version - just resets to initial content)
        return {
          ...state,
          content: initialContent || getSampleText(),
          cursorPosition: 0,
          lastCommand: 'u (undo)'
        };

      // Search commands
      case '/':
        return {
          ...state,
          mode: 'search',
          searchBuffer: '',
          lastCommand: '/ (start search)'
        };

      case 'n': // Next search result
        if (state.lastSearch) {
          const searchStart = cursorPosition + 1;
          const nextMatch = content.slice(searchStart).indexOf(state.lastSearch);
          if (nextMatch !== -1) {
            cursorPosition = searchStart + nextMatch;
          }
          return { ...state, cursorPosition, lastCommand: 'n (next match)' };
        }
        return state;

      case 'N': // Previous search result
        if (state.lastSearch) {
          const searchStart = cursorPosition - 1;
          const prevMatch = content.slice(0, searchStart).lastIndexOf(state.lastSearch);
          if (prevMatch !== -1) {
            cursorPosition = prevMatch;
          }
          return { ...state, cursorPosition, lastCommand: 'N (previous match)' };
        }
        return state;

      case '*': // Search word under cursor
        {
          const { start, end } = findWordBoundaries(content, cursorPosition);
          const word = content.slice(start, end);
          if (word) {
            return {
              ...state,
              lastSearch: word,
              lastCommand: '* (search word under cursor)'
            };
          }
        }
        return state;

      default:
        if (state.commandBuffer) {
          return { ...state, commandBuffer: '', lastCommand: `${key} (command not completed)` };
        }
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

      case 'y': // Yank selection
        {
          const start = Math.min(selection.start, selection.end);
          const end = Math.max(selection.start, selection.end);
          const selectedText = state.content.substring(start, end + 1);
          return {
            ...state,
            mode: 'normal',
            selection: null,
            clipboard: selectedText,
            lastCommand: 'y (yank selection)'
          };
        }

      case 'd': // Delete selection
        {
          const start = Math.min(selection.start, selection.end);
          const end = Math.max(selection.start, selection.end);
          const selectedText = state.content.substring(start, end + 1);
          const newContent = 
            state.content.substring(0, start) + 
            state.content.substring(end + 1);
          return {
            ...state,
            mode: 'normal',
            content: newContent,
            cursorPosition: start,
            selection: null,
            clipboard: selectedText,
            lastCommand: 'd (delete selection)'
          };
        }
        
      default:
        return { ...state, lastCommand: `${key} (visual command not implemented)` };
    }
  };

  const handleSearchMode = (state: VimState, key: string): VimState => {
    if (key === 'Enter') {
      return {
        ...state,
        mode: 'normal',
        lastSearch: state.searchBuffer,
        searchBuffer: '',
        lastCommand: `/${state.searchBuffer} (search)`
      };
    }

    if (key === 'Backspace') {
      return {
        ...state,
        searchBuffer: state.searchBuffer.slice(0, -1),
        lastCommand: 'Backspace (delete search character)'
      };
    }

    if (key === 'ESC' || key === 'Escape') {
      return {
        ...state,
        mode: 'normal',
        searchBuffer: '',
        lastCommand: 'ESC (cancel search)'
      };
    }

    if (key.length === 1) {
      return {
        ...state,
        searchBuffer: state.searchBuffer + key,
        lastCommand: `${key} (add to search)`
      };
    }

    return state;
  };

  return {
    vimState,
    executeCommand,
    resetState
  };
};