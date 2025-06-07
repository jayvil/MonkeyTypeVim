import React from 'react';
import { KeyboardKey } from './KeyboardKey';

export const CommandGuide: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-blue-400">Command Guide</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-700 p-3 rounded-md">
          <h3 className="font-bold mb-2 text-green-400">Basic Movement</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <KeyboardKey>h</KeyboardKey>
              <span>Move left</span>
            </li>
            <li className="flex items-center gap-2">
              <KeyboardKey>j</KeyboardKey>
              <span>Move down</span>
            </li>
            <li className="flex items-center gap-2">
              <KeyboardKey>k</KeyboardKey>
              <span>Move up</span>
            </li>
            <li className="flex items-center gap-2">
              <KeyboardKey>l</KeyboardKey>
              <span>Move right</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-700 p-3 rounded-md">
          <h3 className="font-bold mb-2 text-blue-400">Mode Switching</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <KeyboardKey>i</KeyboardKey>
              <span>Enter insert mode</span>
            </li>
            <li className="flex items-center gap-2">
              <KeyboardKey>v</KeyboardKey>
              <span>Enter visual mode</span>
            </li>
            <li className="flex items-center gap-2">
              <KeyboardKey>ESC</KeyboardKey>
              <span>Return to normal mode</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-700 p-3 rounded-md">
          <h3 className="font-bold mb-2 text-purple-400">Editing</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <KeyboardKey>x</KeyboardKey>
              <span>Delete character</span>
            </li>
            <li className="flex items-center gap-2">
              <KeyboardKey>dd</KeyboardKey>
              <span>Delete line</span>
            </li>
            <li className="flex items-center gap-2">
              <KeyboardKey>yy</KeyboardKey>
              <span>Yank (copy) line</span>
            </li>
            <li className="flex items-center gap-2">
              <KeyboardKey>p</KeyboardKey>
              <span>Paste after cursor</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-700 p-3 rounded-md">
          <h3 className="font-bold mb-2 text-yellow-400">Advanced Movement</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <KeyboardKey>w</KeyboardKey>
              <span>Move to next word</span>
            </li>
            <li className="flex items-center gap-2">
              <KeyboardKey>b</KeyboardKey>
              <span>Move to previous word</span>
            </li>
            <li className="flex items-center gap-2">
              <KeyboardKey>0</KeyboardKey>
              <span>Move to start of line</span>
            </li>
            <li className="flex items-center gap-2">
              <KeyboardKey>$</KeyboardKey>
              <span>Move to end of line</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Try these commands in the practice area. Remember that Vim is modal - the same keys perform different functions depending on which mode you're in.
      </div>
    </div>
  );
};