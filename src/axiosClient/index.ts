import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { AUTH_TOKEN_KEY } from 'src/constants/auth';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const setAuthorizationToken = (token: string) => {
  httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError)
      if (error.response) {
        const statusCode = error.response.status;

        switch (statusCode) {
          case 401: {
            Cookies.remove(AUTH_TOKEN_KEY);
            window.location.reload();
          }
        }
      }

    return Promise.reject(error);
  }
);

export default httpClient;
