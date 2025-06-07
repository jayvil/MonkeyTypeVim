import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

export function ThemeSwitcher() {
  const { currentTheme, setTheme, setPreviewTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset preview when closing
        setPreviewTheme(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setPreviewTheme]);

  // Reset preview when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setPreviewTheme(null);
    }
  }, [isOpen, setPreviewTheme]);

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
        style={{
          backgroundColor: currentTheme.colors.background,
          color: currentTheme.colors.text,
          borderColor: currentTheme.colors.secondary,
        }}
      >
        {themes.find(t => t.colors === currentTheme.colors)?.name || currentTheme.name}
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 py-2 w-48 rounded-md shadow-lg z-50 border"
          style={{
            backgroundColor: currentTheme.colors.background,
            borderColor: currentTheme.colors.secondary,
          }}
        >
          {themes.map((theme) => (
            <div
              key={theme.id}
              className="px-4 py-2 text-sm cursor-pointer transition-colors duration-200 hover:opacity-80"
              style={{
                backgroundColor: theme.colors === currentTheme.colors ? theme.colors.secondary + '20' : 'transparent',
                color: theme.colors === currentTheme.colors ? theme.colors.primary : theme.colors.text,
              }}
              onClick={() => handleThemeSelect(theme.id)}
              onMouseEnter={() => setPreviewTheme(theme.id)}
              onMouseLeave={() => setPreviewTheme(null)}
            >
              {theme.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 