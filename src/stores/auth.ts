import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState } from '@/types/user';

interface AuthStore extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: (user: User, token: string) => {
        localStorage.setItem('auth_token', token);
        set({ user, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        localStorage.removeItem('auth_token');
        set({ user: null, isAuthenticated: false, isLoading: false });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);