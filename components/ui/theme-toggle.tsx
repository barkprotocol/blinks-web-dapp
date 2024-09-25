"use client";

import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark'
      ? 'dark'
      : 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md">
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};
