import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getActualTheme = (theme: Theme): 'light' | 'dark' => {
  return theme === 'system' ? getSystemTheme() : theme;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      actualTheme: 'dark',

      setTheme: (theme: Theme) => {
        const actualTheme = getActualTheme(theme);
        set({ theme, actualTheme });
        
        // Update document class
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', actualTheme === 'dark');
        }
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        get().setTheme(newTheme);
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply theme on hydration
          const actualTheme = getActualTheme(state.theme);
          state.actualTheme = actualTheme;
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', actualTheme === 'dark');
          }
        }
      },
    }
  )
);

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const store = useThemeStore.getState();
    if (store.theme === 'system') {
      store.setTheme('system');
    }
  });
}