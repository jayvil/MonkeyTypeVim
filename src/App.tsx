import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Navigation } from './components/Navigation';
import { useTheme } from './hooks/useTheme';
import { TypeGame } from './pages/TypeGame';
import { Learn } from './pages/Learn';

function AppContent() {
  const { currentTheme } = useTheme();

  const linkStyle = {
    color: currentTheme.colors.text,
    opacity: 0.8,
    transition: 'opacity 0.2s',
    textDecoration: 'none',
  };

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.text,
      }}
    >
      <header 
        className="sticky top-0 z-10 p-4 border-b backdrop-blur-sm"
        style={{ 
          borderColor: currentTheme.colors.secondary,
          backgroundColor: `${currentTheme.colors.background}80`,
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold" style={{ color: currentTheme.colors.primary }}>
              Monkey Type Vim
            </h1>
            <Navigation />
          </div>
          <ThemeSwitcher />
        </div>
      </header>
      
      <main className="flex-grow flex flex-col min-h-0">
        <Routes>
          <Route path="/" element={<TypeGame />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer 
        className="px-6 py-4 mt-auto"
        style={{ 
          backgroundColor: `${currentTheme.colors.secondary}20`,
          borderTop: `1px solid ${currentTheme.colors.secondary}40`,
          color: currentTheme.colors.secondary
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm">
              VimType © {new Date().getFullYear()} - Built to help you master Vim commands
            </div>

            <div className="flex gap-6">
              <a
                href="https://github.com/jayvil/MonkeyTypeVim/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100"
                style={linkStyle}
              >
                Monkey Type Vim GitHub
              </a>
              <a
                href="https://github.com/vim/vim"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100"
                style={linkStyle}
              >
                Vim GitHub
              </a>
              <a
                href="https://www.vim.org/docs.php"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100"
                style={linkStyle}
              >
                Vim Docs
              </a>
            </div>
        </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;