import { create } from 'zustand';

export interface User {
  _id: string;
  nome: string;
  celular: string;
  email: string;
  municipioIds: string[];
  token: string;
}

type AuthState = {
  user: User | null;
};

type AuthActions = {
  setUser: (userData: User) => void;
  clearUser: () => void;
};

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));

export default useAuthStore;
