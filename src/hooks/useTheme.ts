import { useState, useEffect } from 'react';

export const useTheme = () => {
  // Remove localStorage for artifact compatibility
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Apply dark class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return { 
    darkMode, 
    setDarkMode, 
    toggleTheme 
  };
};