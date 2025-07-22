import { Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/stores/theme';

export const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ] as const;

  return (
    <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <motion.button
          key={value}
          onClick={() => setTheme(value)}
          className={`p-2 rounded-md transition-colors ${
            theme === value
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={label}
        >
          <Icon className="h-4 w-4" />
        </motion.button>
      ))}
    </div>
  );
};