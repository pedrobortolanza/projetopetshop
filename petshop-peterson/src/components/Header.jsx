import { Link } from 'react-router-dom';

function Header() {
  return (
<header className="bg-gradient-to-r from-cyan-800 to-cyan-600 text-white shadow-md animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">
          🐕 Petshop Peterson
        </h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Início</Link>
          <Link to="/api/servicos" className="hover:underline">Serviços</Link>
          <Link to="/api/tutores" className="hover:underline">Tutores</Link>
          <Link to="/api/agendamentos/novo" className="hover:underline">Agendar Serviço</Link>
          <Link to="/api/agendamentos" className="hover:underline">Ver Agendamentos</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
