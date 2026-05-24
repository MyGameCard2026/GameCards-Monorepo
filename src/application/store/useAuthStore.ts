import { create } from 'zustand';
import type { User } from '../models/User';
import { authService } from '../services/authService';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (username, password) => {
    set({ isLoading: true, error: null });
    const user = await authService.login(username, password);
    if (user) {
      set({ user, isLoading: false });
      return true;
    } else {
      set({ error: 'Credenciales inválidas', isLoading: false });
      return false;
    }
  },
  logout: () => set({ user: null })
}));
