import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = React.useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 transition-colors duration-200"
    >
      {isDark ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
    </motion.button>
  );
};

export default ThemeToggle;