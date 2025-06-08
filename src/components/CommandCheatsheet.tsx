import React, { useState } from 'react';
import { KeyboardKey } from './KeyboardKey';

type CommandCategory = 'movement' | 'editing' | 'modes' | 'search' | 'advanced';

export const CommandCheatsheet: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CommandCategory>('movement');

  const categories: Record<CommandCategory, { title: string; commands: { key: string; description: string }[] }> = {
    movement: {
      title: 'Basic Movement',
      commands: [
        { key: 'h', description: 'Move cursor left' },
        { key: 'j', description: 'Move cursor down' },
        { key: 'k', description: 'Move cursor up' },
        { key: 'l', description: 'Move cursor right' },
        { key: 'w', description: 'Jump to start of next word' },
        { key: 'b', description: 'Jump to start of previous word' },
        { key: 'e', description: 'Jump to end of word' },
        { key: '0', description: 'Jump to start of line' },
        { key: '$', description: 'Jump to end of line' },
        { key: 'gg', description: 'Go to the first line of document' },
        { key: 'G', description: 'Go to the last line of document' },
        { key: '{', description: 'Jump to previous paragraph' },
        { key: '}', description: 'Jump to next paragraph' },
        { key: 'Ctrl+e', description: 'Move Screen down one line (without moving cursor)' },
        { key: 'Ctrl+y', description: 'Move Screen up one line (without moving cursor)' },
        { key: 'Ctrl+b', description: 'Move screen up one page (cursor to last line)' },
        { key: 'Ctrl+f', description: 'Move screen down one page (cursor to first line)' },
        { key: 'Ctrl+d', description: 'Move cursor and screen down half a page' },
        { key: 'Ctrl+u', description: 'Move cursor and screen up half a page' },
      ]
    },
    editing: {
      title: 'Editing',
      commands: [
        { key: 'i', description: 'Insert before cursor' },
        { key: 'a', description: 'Insert (append) after cursor' },
        { key: 'A', description: 'Insert (append) at the end of the line' },
        { key: 'o', description: 'Insert new line below' },
        { key: 'O', description: 'Insert new line above' },
        { key: 'x', description: 'Delete character at cursor' },
        { key: 'dd', description: 'Delete current line' },
        { key: 'dw', description: 'Delete word' },
        { key: 'yy', description: 'Yank (copy) current line' },
        { key: 'p', description: 'Paste after cursor' },
        { key: 'P', description: 'Paste before cursor' },
        { key: 'r', description: 'Replace single character' },
        { key: 'u', description: 'Undo' },
        { key: 'Ctrl+r', description: 'Redo' },
      ]
    },
    modes: {
      title: 'Modes',
      commands: [
        { key: 'ESC', description: 'Return to Normal mode' },
        { key: 'i', description: 'Enter Insert mode' },
        { key: 'v', description: 'Enter Visual mode' },
        { key: 'V', description: 'Enter Visual Line mode' },
        { key: 'Ctrl+v', description: 'Enter Visual Block mode' },
        { key: ':', description: 'Enter Command mode' },
      ]
    },
    search: {
      title: 'Search & Replace',
      commands: [
        { key: '/', description: 'Search forward' },
        { key: '?', description: 'Search backward' },
        { key: 'n', description: 'Next search result' },
        { key: 'N', description: 'Previous search result' },
        { key: '*', description: 'Search for word under cursor' },
        { key: ':%s/old/new/g', description: 'Replace all occurrences' },
        { key: ':s/old/new/g', description: 'Replace in current line' },
      ]
    },
    advanced: {
      title: 'Advanced Commands',
      commands: [
        { key: 'Ctrl+f', description: 'Scroll down one page' },
        { key: 'Ctrl+b', description: 'Scroll up one page' },
        { key: 'zz', description: 'Center cursor on screen' },
        { key: '.', description: 'Repeat last command' },
        { key: 'ci(', description: 'Change inside parentheses' },
        { key: 'di"', description: 'Delete inside quotes' },
        { key: 'gd', description: 'Go to definition' },
        { key: '>>', description: 'Indent line' },
        { key: '<<', description: 'Outdent line' },
        { key: 'Ctrl+a', description: 'Increment number under cursor' },
        { key: 'Ctrl+x', description: 'Decrement number under cursor' },
      ]
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-blue-400">Vim Command Cheatsheet</h2>
      
      <div className="flex flex-wrap gap-2">
        {(Object.keys(categories) as CommandCategory[]).map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-gray-200 hover:bg-slate-600'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {categories[category].title}
          </button>
        ))}
      </div>
      
      <div className="bg-slate-700 p-4 rounded-md">
        <h3 className="font-bold text-lg mb-4">{categories[activeCategory].title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
          {categories[activeCategory].commands.map((command, index) => (
            <div key={index} className="flex items-center gap-2">
              <KeyboardKey>{command.key}</KeyboardKey>
              <span>{command.description}</span>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-sm text-gray-400">
        Note: Vim has hundreds of commands. This cheatsheet covers the most common ones to get you started.
        Commands can be combined in powerful ways - for example, <KeyboardKey size="sm">d3w</KeyboardKey> deletes 3 words.
      </p>
    </div>
  );
};