import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      if (email === 'admin@petshop.com' && senha === '123456') {
        alert('Login realizado com sucesso! 🐾');
      } else {
        alert('E-mail ou senha inválidos ❌');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-red-200">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Petshop Peterson 🐶<br />
          <span className="text-lg text-gray-600 font-normal">Acesso ao Sistema</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 mb-1">📧 E-mail</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">🔒 Senha</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-3 px-4 rounded-lg transition duration-200 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
