import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark'; // The actual resolved theme (system resolved to light/dark)
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('system');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Get system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Resolve the actual theme based on current theme setting
  const resolveTheme = (currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return getSystemTheme();
    }
    return currentTheme;
  };

  // Apply theme to document
  const applyTheme = (resolvedTheme: 'light' | 'dark') => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(resolvedTheme);
      setActualTheme(resolvedTheme);
    }
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setTheme(savedTheme);
          const resolved = resolveTheme(savedTheme);
          applyTheme(resolved);
        } else {
          // Default to system theme
          const resolved = resolveTheme('system');
          applyTheme(resolved);
        }
      } catch (error) {
        console.error('Error loading theme from localStorage:', error);
        const resolved = resolveTheme('system');
        applyTheme(resolved);
      }
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined' && theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        const resolved = resolveTheme('system');
        applyTheme(resolved);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Update theme
  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    const resolved = resolveTheme(newTheme);
    applyTheme(resolved);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', newTheme);
      } catch (error) {
        console.error('Error saving theme to localStorage:', error);
      }
    }
  };

  const value: ThemeContextType = {
    theme,
    setTheme: updateTheme,
    actualTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}