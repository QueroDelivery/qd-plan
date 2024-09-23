import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import useAuthStore from 'src/store/useAuthStore';
import { redirect } from 'react-router-dom';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: import.meta.env.VITE_AUTHORIZATION_TOKEN,
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const statusCode = error.response.status;

      switch (statusCode) {
        case 401: {
          Cookies.remove('qd-token');
          useAuthStore.getState().clearUser();
          redirect('/login');
        }
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
