import { VimCommand } from '../types/game';

export const vimCommands: VimCommand[] = [
  // Movement commands
  { command: 'h', description: 'Move cursor left', category: 'movement' },
  { command: 'j', description: 'Move cursor down', category: 'movement' },
  { command: 'k', description: 'Move cursor up', category: 'movement' },
  { command: 'l', description: 'Move cursor right', category: 'movement' },
  { command: 'w', description: 'Move to next word', category: 'movement' },
  { command: 'b', description: 'Move to previous word', category: 'movement' },
  { command: 'e', description: 'Move to end of word', category: 'movement' },
  { command: '0', description: 'Move to start of line', category: 'movement' },
  { command: '$', description: 'Move to end of line', category: 'movement' },
  { command: 'gg', description: 'Go to first line', category: 'movement' },
  { command: 'G', description: 'Go to last line', category: 'movement' },
  { command: 'Ctrl+e', description: 'Move screen down one line (without moving cursor)', category: 'movement' },
  { command: 'Ctrl+y', description: 'Move screen up one line (without moving cursor)', category: 'movement' },
  { command: 'Ctrl+b', description: 'Move screen up one page (cursor to last line) ', category: 'movement' },
  { command: 'Ctrl+f', description: 'Move screen down one page (cursor to first line)', category: 'movement' },
  { command: 'Ctrl+d', description: 'Move cursor and screen down half a page', category: 'movement' },
  { command: 'Ctrl+u', description: 'Move cursor and screen up half a page', category: 'movement' },

  // Editing commands
  { command: 'i', description: 'Enter insert mode', category: 'modes' },
  { command: 'a', description: 'Append after cursor', category: 'editing' },
  { command: 'o', description: 'Open line below', category: 'editing' },
  { command: 'O', description: 'Open line above', category: 'editing' },
  { command: 'dd', description: 'Delete line', category: 'editing' },
  { command: 'yy', description: 'Yank (copy) line', category: 'editing' },
  { command: 'p', description: 'Paste after cursor', category: 'editing' },
  { command: 'u', description: 'Undo', category: 'editing' },
  { command: 'x', description: 'Delete character', category: 'editing' },

  // Mode commands
  { command: 'v', description: 'Enter visual mode', category: 'modes' },
  { command: 'V', description: 'Enter visual line mode', category: 'modes' },
  { command: ':q', description: 'Quit', category: 'modes' },
  { command: ':w', description: 'Write (save)', category: 'modes' },
  { command: ':wq', description: 'Write and quit', category: 'modes' },

  // Search commands
  { command: '/', description: 'Search forward', category: 'search' },
  { command: '?', description: 'Search backward', category: 'search' },
  { command: 'n', description: 'Next search result', category: 'search' },
  { command: 'N', description: 'Previous search result', category: 'search' },
  { command: '*', description: 'Search word under cursor', category: 'search' },

  // Advanced commands
  { command: 'zz', description: 'Center cursor on screen', category: 'advanced' },
  { command: 'Ctrl+a', description: 'Increment number under cursor', category: 'advanced' },
  { command: 'Ctrl+x', description: 'Decrement number under cursor', category: 'advanced' },
  { command: '.', description: 'Repeat last command', category: 'advanced' },
  { command: 'ci(', description: 'Change inside parentheses', category: 'advanced' },
  { command: ':%s/old/new/g', description: 'Replace all occurrences', category: 'search' },
  { command: ':s/old/new/g', description: 'Replace in current line', category: 'search' },
];