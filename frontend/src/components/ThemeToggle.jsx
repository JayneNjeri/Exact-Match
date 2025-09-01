import React from 'react';
import { Sun, Moon } from 'lucide-react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--bg-secondary);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton 
      onClick={toggleTheme}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </ToggleButton>
  );
};

export default ThemeToggle;
