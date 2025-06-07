import React, { useRef, useEffect, useState } from 'react';
import { VimState } from '../types/vim';

interface VimSimulatorProps {
  vimState: VimState;
  executeCommand: (command: string) => void;
  practiceMode?: boolean;
}

export const VimSimulator: React.FC<VimSimulatorProps> = ({
  vimState,
  executeCommand,
  practiceMode = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [commandBuffer, setCommandBuffer] = useState<string>('');
  const [mode, setMode] = useState<'normal' | 'insert' | 'visual'>('normal');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Focus the editor when component mounts or when mode changes
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [mode]);

  useEffect(() => {
    setMode(vimState.mode);
    // Display feedback about the executed command
    if (vimState.lastCommand) {
      setMessage(`Executed: ${vimState.lastCommand}`);
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [vimState]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Don't capture Tab, which should be used for navigation
    if (e.key === 'Tab') return;
    
    e.preventDefault();
    
    const key = e.key;
    let newBuffer = commandBuffer;

    // Special handling for Escape key
    if (key === 'Escape') {
      if (mode !== 'normal') {
        executeCommand('ESC');
        setCommandBuffer('');
        return;
      }
    }
    
    // Update command buffer
    if (key.length === 1 || ['Escape', 'Enter', 'Backspace'].includes(key)) {
      newBuffer += key;
      setCommandBuffer(newBuffer);
    }
    
    // Execute the command
    executeCommand(key);
  };

  // Render the content with cursor
  const renderContent = () => {
    const { content, cursorPosition } = vimState;
    const lines = content.split('\n');
    let currentPos = 0;

    return lines.map((line, lineIndex) => {
      const lineStartPos = currentPos;
      currentPos += line.length + 1; // +1 for the newline

      // Check if cursor is on this line
      if (cursorPosition >= lineStartPos && cursorPosition < currentPos) {
        const cursorPosInLine = cursorPosition - lineStartPos;
        
        return (
          <div key={lineIndex} className="font-mono whitespace-pre">
            {line.slice(0, cursorPosInLine)}
            <span className={`${mode === 'normal' ? 'bg-gray-500' : 'bg-blue-500'} text-black`}>
              {line[cursorPosInLine] || ' '}
            </span>
            {line.slice(cursorPosInLine + 1)}
          </div>
        );
      }
      
      return <div key={lineIndex} className="font-mono whitespace-pre">{line}</div>;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div 
            className={`px-3 py-1 rounded text-sm font-semibold ${
              mode === 'normal' ? 'bg-green-600' : 
              mode === 'insert' ? 'bg-blue-600' : 'bg-purple-600'
            }`}
          >
            {mode.toUpperCase()} MODE
          </div>
        </div>
        <div className="text-gray-400 text-sm">
          {message}
        </div>
      </div>

      <div
        ref={editorRef}
        className="bg-slate-950 p-4 rounded-md border border-slate-700 font-mono min-h-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {renderContent()}
      </div>

      <div className="bg-slate-900 p-2 rounded border border-slate-700 text-sm text-gray-400">
        {practiceMode ? (
          <div>
            Practice Mode: Try using Vim commands freely.
            <br />
            Press <kbd className="bg-slate-800 px-1 rounded">i</kbd> to enter insert mode, 
            <kbd className="bg-slate-800 px-1 rounded ml-1">ESC</kbd> to return to normal mode.
          </div>
        ) : (
          <div>
            Follow the lesson instructions above. Current command buffer: 
            <span className="text-blue-400 ml-1 font-mono">{commandBuffer || 'empty'}</span>
          </div>
        )}
      </div>
    </div>
  );
};