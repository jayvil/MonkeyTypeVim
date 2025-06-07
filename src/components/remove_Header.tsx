import React from 'react';
import { Command } from 'lucide-react';
import { Github, ExternalLink} from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Command className="w-6 h-6 text-emerald-500" />
          <span className="text-xl font-bold text-emerald-500">VimType</span>
        </div>
        <nav>
            <a
              href="https://github.com/vim/vim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <Github size={18} />
              <span className="hidden sm:inline">Vim GitHub</span>
            </a>
            <a
              href="https://www.vim.org/docs.php"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <ExternalLink size={18} />
              <span className="hidden sm:inline">Vim Docs</span>
            </a>
        </nav>
      </div>
    </header>
  );
}
