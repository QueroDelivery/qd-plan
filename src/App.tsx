import { HolidaysCalendar } from './components/HolidaysCalendar';
import { AcoesPage } from './pages/AcoesPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { MainLayout } from './components/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<AcoesPage />} />
          <Route path="/feriados" element={<HolidaysCalendar />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
