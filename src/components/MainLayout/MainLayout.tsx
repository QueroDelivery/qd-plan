import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

const MainLayout = () => {
  return (
    <div className="grid grid-cols-only-content xl:grid-cols-sidebar-content">
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export { MainLayout };
