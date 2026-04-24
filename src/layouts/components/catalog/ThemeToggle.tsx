import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';

/**
 * Theme Toggle Component
 * Wechselt zwischen Dark und Light Mode
 * Speichert Präferenz in localStorage
 * Default: Dark Mode
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Lade Theme aus localStorage oder Default (dark)
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark' || (!savedTheme && !document.documentElement.classList.contains('light'));

    setIsDark(prefersDark);

    // Setze initial Theme
    if (prefersDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // Update DOM
    if (newIsDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9"
      aria-label={isDark ? 'Zu Light Mode wechseln' : 'Zu Dark Mode wechseln'}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-text dark:text-darkmode-text" />
      ) : (
        <Moon className="h-4 w-4 text-text dark:text-darkmode-text" />
      )}
    </Button>
  );
}
