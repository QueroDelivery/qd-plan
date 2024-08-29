import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AcoesPage } from './pages/AcoesPage/AcoesPage';

function App() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-only-content xl:grid-cols-sidebar-content">
        <Sidebar />
        <AcoesPage />
      </div>
    </>
  );
}

export default App;
