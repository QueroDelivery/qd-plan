import { Header } from './components/Header';
import { HolidaysCalendar } from './components/HolidaysCalendar';
import { Sidebar } from './components/Sidebar';
import { AcoesPage } from './pages/AcoesPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="grid grid-cols-only-content xl:grid-cols-sidebar-content">
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<AcoesPage />} />
          <Route path="/feriados" element={<HolidaysCalendar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
