import { Header } from './components/Header';
import { PlanAcaoTable } from './components/PlanAcaoTable';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-only-content lg:grid-cols-sidebar-content">
        <Sidebar />
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-bold text-purple-500 px-6 py-4 border-b border-gray-300/60">
            Metas e ações
          </h1>
          <main className="container py-8 mx-auto min-w-[336px]">
            <PlanAcaoTable />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
