import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export const Navigation: React.FC = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  const linkStyle = (isActive: boolean) => ({
    color: isActive ? currentTheme.colors.primary : currentTheme.colors.text,
    backgroundColor: isActive ? `${currentTheme.colors.primary}20` : 'transparent',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    transition: 'all 0.2s',
  });

  const handleClick = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate(to);
  };

  return (
    <nav className="flex gap-4">
      <NavLink
        to="/"
        className={({ isActive }) => `hover:opacity-80`}
        style={({ isActive }) => linkStyle(isActive)}
        onClick={(e) => handleClick(e, '/')}
        end
      >
        Test
      </NavLink>
      <NavLink
        to="/learn"
        className={({ isActive }) => `hover:opacity-80`}
        style={({ isActive }) => linkStyle(isActive)}
        onClick={(e) => handleClick(e, '/learn')}
      >
        Learn 
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => `hover:opacity-80`}
        style={({ isActive }) => linkStyle(isActive)}
        onClick={(e) => handleClick(e, '/about')}
      >
        About
      </NavLink>
    </nav>
  );
}; 