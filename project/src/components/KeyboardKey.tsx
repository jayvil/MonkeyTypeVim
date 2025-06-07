import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface KeyboardKeyProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const KeyboardKey: React.FC<KeyboardKeyProps> = ({ 
  children, 
  size = 'md' 
}) => {
  const { currentTheme } = useTheme();
  
  const sizeClasses = {
    sm: 'min-w-[24px] h-[24px] text-xs',
    md: 'min-w-[30px] h-[30px] text-sm',
    lg: 'min-w-[36px] h-[36px] text-base'
  };

  return (
    <span 
      className={`${sizeClasses[size]} inline-flex items-center justify-center 
        rounded px-2 font-mono text-center shadow-sm transition-transform 
        hover:translate-y-[1px] active:translate-y-[2px]`}
      style={{
        backgroundColor: `${currentTheme.colors.secondary}40`,
        borderColor: currentTheme.colors.secondary,
        borderWidth: '1px',
        color: currentTheme.colors.text,
      }}
    >
      {children}
    </span>
  );
};