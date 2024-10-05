import type { User } from 'src/store/useAuthStore';

type AuthResponseSuccess = {
  r: boolean;
  data: User;
};

type AuthResponseError = {
  r: boolean;
  errors: string[];
};

type AuthResponse = AuthResponseSuccess | AuthResponseError;

export type { AuthResponse };
