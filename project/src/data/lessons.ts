import { VimLesson } from '../types/vim';

export const lessons: VimLesson[] = [
  {
    title: 'Lesson 1: Basic Movement',
    description: 'Learn to navigate using h, j, k, l - the foundational movement keys in Vim.',
    commands: [
      { key: 'h', description: 'Move left' },
      { key: 'j', description: 'Move down' },
      { key: 'k', description: 'Move up' },
      { key: 'l', description: 'Move right' },
    ],
    exercise: {
      instructions: 'Practice moving around this text using h, j, k, and l. Try to navigate to specific words.',
      startingText: 'The quick brown fox jumps over the lazy dog.\nVim movement is efficient once mastered.\nPractice makes perfect!\nTry to move to this line.',
    },
  },
  {
    title: 'Lesson 2: Insert Mode',
    description: 'Learn to enter insert mode and add text to your document.',
    commands: [
      { key: 'i', description: 'Enter insert mode before cursor' },
      { key: 'a', description: 'Enter insert mode after cursor' },
      { key: 'ESC', description: 'Return to normal mode' },
    ],
    exercise: {
      instructions: 'Practice entering insert mode with i, typing some text, and returning to normal mode with ESC.',
      startingText: 'Add some text here: \nAnd also here: \nDon\'t forget to press ESC to return to normal mode!',
    },
  },
  {
    title: 'Lesson 3: Deleting Text',
    description: 'Learn to delete characters and lines in normal mode.',
    commands: [
      { key: 'x', description: 'Delete character at cursor' },
      { key: 'dd', description: 'Delete entire line' },
      { key: 'dw', description: 'Delete word' },
    ],
    exercise: {
      instructions: 'Use x to remove the extra characters below. Then try dd to delete entire lines.',
      startingText: 'Thiiis liine haas eextra charracters.\nThis line should be deleted completely.\nFix thissss textttt using x.',
    },
  },
  {
    title: 'Lesson 4: Word Movement',
    description: 'Move more efficiently by jumping between words.',
    commands: [
      { key: 'w', description: 'Move to start of next word' },
      { key: 'b', description: 'Move to start of previous word' },
      { key: 'e', description: 'Move to end of current word' },
    ],
    exercise: {
      instructions: 'Practice moving between words using w, b, and e. Try to navigate quickly to specific words.',
      startingText: 'The quick brown fox jumps over the lazy dog.\nWord movement is much faster than character movement.\nPractice jumping between these words efficiently.',
    },
  },
  {
    title: 'Lesson 5: Line Navigation',
    description: 'Quickly navigate to different positions within a line.',
    commands: [
      { key: '0', description: 'Move to start of line' },
      { key: '$', description: 'Move to end of line' },
      { key: '^', description: 'Move to first non-blank character' },
    ],
    exercise: {
      instructions: 'Practice moving to the beginning and end of lines using 0 and $.',
      startingText: '    This line has leading spaces.\nPractice moving to the end of this very long line that extends quite far to the right.\n    And back to the beginning again.',
    },
  },
  {
    title: 'Lesson 6: Visual Mode',
    description: 'Select text using visual mode.',
    commands: [
      { key: 'v', description: 'Enter visual mode' },
      { key: 'V', description: 'Enter visual line mode' },
      { key: 'y', description: 'Yank (copy) selected text' },
    ],
    exercise: {
      instructions: 'Enter visual mode with v, select some text using movement keys, then exit with ESC.',
      startingText: 'Select this text using visual mode.\nThen try selecting this entire line with visual line mode.\nPractice makes perfect!',
    },
  },
  {
    title: 'Lesson 7: Copy and Paste',
    description: 'Learn to copy (yank) and paste text.',
    commands: [
      { key: 'yy', description: 'Yank current line' },
      { key: 'p', description: 'Paste after cursor' },
      { key: 'P', description: 'Paste before cursor' },
    ],
    exercise: {
      instructions: 'Practice yanking lines with yy and pasting them with p.',
      startingText: 'Yank this line with yy.\nThen move down here and paste it after this line with p.\nYou can also paste before a line with P.',
    },
  },
  {
    title: 'Lesson 8: Search',
    description: 'Find text quickly using search commands.',
    commands: [
      { key: '/', description: 'Search forward' },
      { key: 'n', description: 'Next match' },
      { key: 'N', description: 'Previous match' },
    ],
    exercise: {
      instructions: 'Type / followed by a word to search, then use n to find the next occurrence.',
      startingText: 'Find the word banana in this text.\nThere is a banana here.\nAnd another banana there.\nOne more banana at the end.',
    },
  },
];