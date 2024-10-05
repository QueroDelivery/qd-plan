import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { AUTH_TOKEN_KEY } from 'src/constants/auth';
import { initAuth } from 'src/services/auth/authService';

export default function useAppLogin() {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    const authenticateUser = async () => {
      if (token) {
        await initAuth(token);
        setLoading(false);
      }
    };

    authenticateUser();
  }, [token]);

  return { loading };
}
