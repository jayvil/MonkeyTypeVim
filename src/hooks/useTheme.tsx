import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, themes } from '../data/themes';

interface ThemeContextType {
  currentTheme: Theme;
  previewTheme: Theme | null;
  setTheme: (themeId: string) => void;
  setPreviewTheme: (themeId: string | null) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [previewTheme, setPreviewThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedThemeId = localStorage.getItem('theme-id');
    if (savedThemeId) {
      const theme = themes.find(t => t.id === savedThemeId);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
  }, []);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      setPreviewThemeState(null); // Clear preview when setting actual theme
      localStorage.setItem('theme-id', themeId);
    }
  };

  const setPreviewTheme = (themeId: string | null) => {
    if (themeId === null) {
      setPreviewThemeState(null);
    } else {
      const theme = themes.find(t => t.id === themeId);
      if (theme) {
        setPreviewThemeState(theme);
      }
    }
  };

  // The theme to actually use is either the preview theme (if set) or the current theme
  const activeTheme = previewTheme || currentTheme;

  return (
    <ThemeContext.Provider 
      value={{ 
        currentTheme: activeTheme, 
        previewTheme, 
        setTheme, 
        setPreviewTheme,
        themes 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 