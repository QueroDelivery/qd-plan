import { createBrowserRouter } from 'react-router-dom';
import { AuthenticationOutlet } from './utils/AuthenticationOutlet';
import { MainLayout } from 'src/components/MainLayout';
import { AcoesPage } from 'src/pages/AcoesPage';
import { HolidaysCalendar } from 'src/components/HolidaysCalendar';
import App from 'src/App';
import { LoginPage } from 'src/pages/LoginPage';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        element: <AuthenticationOutlet />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                path: '/',
                element: <AcoesPage />,
              },
              {
                path: '/feriados',
                element: <HolidaysCalendar />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
