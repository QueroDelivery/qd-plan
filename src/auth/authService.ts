import httpClient from 'src/axiosClient';
import useAuthStore, { User } from 'src/store/useAuthStore';
import Cookies from 'js-cookie';
import { FormCredentials } from 'src/pages/LoginPage/components/LoginForm';
import { redirect } from 'react-router-dom';

type AuthResponse = {
  r: boolean;
  data: User;
};

const login = async (credentials: FormCredentials) => {
  try {
    const { data: response } = await httpClient.post<AuthResponse>(
      '/manager/auth',
      { ...credentials, uuid: import.meta.env.VITE_AUTH_UUID },
      {
        baseURL: import.meta.env.VITE_AUTH_URL,
      }
    );

    const { token } = response.data;

    Cookies.set('qd-token', token);
    useAuthStore.getState().setUser(response.data);
    return redirect('/feriados');
  } catch (error) {
    console.log('some wrong happened', error);
  }
};

export default login;
