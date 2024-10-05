import { Outlet } from 'react-router-dom';
import { ScreenLoader } from './components/ScreenLoader';
import useAppLogin from './hooks/useAppLogin';

function App() {
  const { loading } = useAppLogin();

  if (loading) {
    return <ScreenLoader />;
  }

  return <Outlet />;
}

export default App;
