import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './pages/Home';
import CadastroServico from './pages/CadastroServico';
import CadastroTutor from './pages/CadastroTutor';
import Agendamento from './pages/Agendamento';
import ListaAgendamentos from './pages/ListaAgendamentos';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/servicos" element={<CadastroServico />} />
        <Route path="/api/tutores" element={<CadastroTutor />} />
        <Route path="/api/agendamentos/novo" element={<Agendamento />} />
        <Route path="/api/agendamentos" element={<ListaAgendamentos />} />
      </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;
