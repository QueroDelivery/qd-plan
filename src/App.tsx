import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-only-content lg:grid-cols-sidebar-content">
        <Sidebar />
        <main>Teste</main>
      </div>
    </>
  );
}

export default App;
