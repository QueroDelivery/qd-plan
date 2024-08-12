import { Header } from './components/Header';
import { PlanAcaoTable } from './components/PlanAcaoTable';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-only-content lg:grid-cols-sidebar-content">
        <Sidebar />
        <main className="container py-12 mx-auto min-w-[336px]">
          <PlanAcaoTable />
        </main>
      </div>
    </>
  );
}

export default App;
