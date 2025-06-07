import React from 'react';
import { useTheme } from '../hooks/useTheme';

export const About: React.FC = () => {
  const { currentTheme } = useTheme();

  const linkStyle = {
    color: currentTheme.colors.primary,
    textDecoration: 'underline',
    transition: 'opacity 0.2s',
  };

  return (
    <div className="container mx-auto p-4 flex-grow">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-8" style={{ color: currentTheme.colors.primary }}>
          About MonkeyTypeVim
        </h1>
        
        <p className="text-lg leading-relaxed">
          MonkeyTypeVim is a specialized typing practice tool inspired by the amazing{' '}
          <a 
            href="https://monkeytype.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={linkStyle}
            className="hover:opacity-80"
          >
            Monkeytype
          </a>{' '}
          typing game. While Monkeytype focuses on general typing speed and accuracy, MonkeyTypeVim is specifically designed to help users master Vim commands and motions.
        </p>

        <p className="text-lg leading-relaxed">
          Our goal is to provide an engaging and effective way to learn and practice Vim commands. Whether you're just starting with Vim or looking to improve your efficiency, MonkeyTypeVim offers:
        </p>

        <ul className="list-disc pl-6 text-lg leading-relaxed space-y-2">
          <li>Interactive typing tests focused on Vim commands</li>
          <li>A comprehensive learning section explaining Vim motions and commands</li>
          <li>Real-time feedback on your command accuracy</li>
          <li>Progress tracking to help you improve</li>
        </ul>

        <p className="text-lg leading-relaxed">
          By practicing regularly with MonkeyTypeVim, you can build muscle memory for common Vim commands and become more proficient in using this powerful text editor.
        </p>
      </div>
    </div>
  );
}; 