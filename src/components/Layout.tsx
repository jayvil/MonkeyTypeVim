import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      <header className="border-b border-slate-700 bg-slate-800 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">VimMaster</h1>
          <nav className="flex gap-4">
            <a
              href="https://github.com/vim/vim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <Github size={18} />
              <span className="hidden sm:inline">GitHub</span>
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
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="border-t border-slate-700 bg-slate-800 px-6 py-4 text-center text-sm text-gray-400">
        <div className="container mx-auto">
          VimMaster © {new Date().getFullYear()} - Built to help you master Vim commands
        </div>
      </footer>
    </div>
  );
};