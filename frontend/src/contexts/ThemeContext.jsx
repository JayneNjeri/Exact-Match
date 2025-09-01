import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Function to apply theme to CSS variables
  const applyTheme = (darkMode) => {
    const root = document.documentElement;
    
    if (darkMode) {
      // Dark theme variables
      root.style.setProperty('--bg-primary', '#0f0f0f');
      root.style.setProperty('--bg-secondary', '#1a1a1a');
      root.style.setProperty('--card-bg', '#1e1e1e');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#b3b3b3');
      root.style.setProperty('--text-muted', '#666666');
      root.style.setProperty('--border-color', '#333333');
      root.style.setProperty('--primary-color', '#007bff');
      root.style.setProperty('--secondary-color', '#ffc107');
      root.style.setProperty('--accent-color', '#28a745');
      root.style.setProperty('--success-color', '#28a745');
      root.style.setProperty('--error-color', '#dc3545');
      root.style.setProperty('--warning-color', '#ffc107');
      root.style.setProperty('--shadow-sm', '0 1px 3px rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--shadow-md', '0 4px 6px rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--shadow-lg', '0 10px 15px rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--shadow-xl', '0 20px 25px rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--dark-bg', '#0f0f0f');
      root.style.setProperty('--darker-bg', '#1a1a1a');
    } else {
      // Light theme variables
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8f9fa');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--text-primary', '#212529');
      root.style.setProperty('--text-secondary', '#6c757d');
      root.style.setProperty('--text-muted', '#adb5bd');
      root.style.setProperty('--border-color', '#dee2e6');
      root.style.setProperty('--primary-color', '#007bff');
      root.style.setProperty('--secondary-color', '#ffc107');
      root.style.setProperty('--accent-color', '#28a745');
      root.style.setProperty('--success-color', '#28a745');
      root.style.setProperty('--error-color', '#dc3545');
      root.style.setProperty('--warning-color', '#ffc107');
      root.style.setProperty('--shadow-sm', '0 1px 3px rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--shadow-md', '0 4px 6px rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--shadow-lg', '0 10px 15px rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--shadow-xl', '0 20px 25px rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--dark-bg', '#ffffff');
      root.style.setProperty('--darker-bg', '#f8f9fa');
    }
  };

  // Initialize theme immediately before state
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('exactmatch_theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const initialTheme = getInitialTheme();
    // Apply theme immediately during initialization
    applyTheme(initialTheme);
    return initialTheme;
  });

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('exactmatch_theme', isDarkMode ? 'dark' : 'light');
    applyTheme(isDarkMode); // Apply theme when state changes
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const value = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
