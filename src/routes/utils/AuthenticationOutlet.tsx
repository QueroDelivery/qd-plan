import { Outlet, Navigate, createSearchParams } from 'react-router-dom';
import useAuthStore from 'src/store/useAuthStore';
import { useLocation } from 'react-router-dom';

function AuthenticationOutlet() {
  const location = useLocation();
  const { user } = useAuthStore();

  const myLocationUri = location.pathname;
  const redirectTo = `/login?${createSearchParams({ to: myLocationUri })}`;

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

export { AuthenticationOutlet };
