import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-red-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">
          🐾 Petshop Peterson
        </h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">
            Início
          </Link>
          <Link to="/cadastrar-servico" className="hover:underline">
            Cadastrar Serviço
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
