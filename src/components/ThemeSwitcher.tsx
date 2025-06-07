import React from 'react';
import { useTheme } from '../hooks/useTheme';

export function ThemeSwitcher() {
  const { currentTheme, setTheme, themes } = useTheme();

  return (
    <div className="relative inline-block">
      <select
        value={currentTheme.id}
        onChange={(e) => setTheme(e.target.value)}
        className="block w-full px-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        style={{
          backgroundColor: currentTheme.colors.background,
          color: currentTheme.colors.text,
          borderColor: currentTheme.colors.secondary,
        }}
      >
        {themes.map((theme) => (
          <option
            key={theme.id}
            value={theme.id}
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
            }}
          >
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
} 