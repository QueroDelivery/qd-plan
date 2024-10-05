import httpClient, { setAuthorizationToken } from 'src/axiosClient';
import useAuthStore, { User } from 'src/store/useAuthStore';
import Cookies from 'js-cookie';
import { FormCredentials } from 'src/pages/LoginPage/components/LoginForm';
import { AUTH_TOKEN_KEY } from 'src/constants/auth';
import type { AuthResponse } from './types';

const login = async (credentials: FormCredentials) => {
  const { data: response } = await httpClient.post<AuthResponse>(
    '/manager/auth',
    { ...credentials, uuid: import.meta.env.VITE_AUTH_UUID },
    {
      baseURL: import.meta.env.VITE_AUTH_URL,
    }
  );

  if ('errors' in response) {
    const message =
      response.errors[0] ||
      'Erro ao tentar fazer login. Por favor tente novamente.';

    throw new Error(message);
  }

  const { token } = response.data;

  Cookies.set(AUTH_TOKEN_KEY, token);
  useAuthStore.getState().setUser(response.data);
  setAuthorizationToken(token);

  return response.data;
};

const logout = () => {
  Cookies.remove(AUTH_TOKEN_KEY);
  window.location.assign('/login');
};

const initAuth = async (token: string) => {
  const { setUser } = useAuthStore.getState();
  const { data } = await httpClient.get<User>('/manager/token', {
    baseURL: import.meta.env.VITE_AUTH_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  setAuthorizationToken(token);
  setUser(data);
};

export { login, logout, initAuth };
