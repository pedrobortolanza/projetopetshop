import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function CadastroTutor() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState(0);
  const [logradouro, setLogradouro] = useState({
    cep: '', rua: '', numero: '', complemento: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const tutorRes = await axios.post('http://localhost:5294/api/tutores', {
        nome, email, senha, tipo
      });

      await axios.put(`http://localhost:5294/api/logradouros/${tutorRes.data.id}`, logradouro);

      toast.success('Tutor cadastrado com sucesso! 🎉');
      setNome('');
      setEmail('');
      setSenha('');
      setTipo(0);
      setLogradouro({ cep: '', rua: '', numero: '', complemento: '' });
    } catch (err) {
      console.error(err);
      toast.error('Erro ao cadastrar tutor');
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800 p-6 flex flex-col justify-center items-center">
        <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-cyan-700">Cadastro de Tutor </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
          <input
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
            placeholder="Nome"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Email"
            type="email"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
          <input
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
            placeholder="Senha"
            type="password"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
          <select
            value={tipo}
            onChange={e => setTipo(parseInt(e.target.value))}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          >
            <option value={0}>Cliente</option>
            <option value={1}>Funcionário</option>
          </select>

          <hr className="my-4" />
          <input
            value={logradouro.cep}
            onChange={e => setLogradouro({ ...logradouro, cep: e.target.value })}
            required
            placeholder="CEP"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
          <input
            value={logradouro.rua}
            onChange={e => setLogradouro({ ...logradouro, rua: e.target.value })}
            required
            placeholder="Rua"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
          <input
            value={logradouro.numero}
            onChange={e => setLogradouro({ ...logradouro, numero: e.target.value })}
            required
            placeholder="Número"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
          <input
            value={logradouro.complemento}
            onChange={e => setLogradouro({ ...logradouro, complemento: e.target.value })}
            placeholder="Complemento"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />

          <button
            type="submit"
            className="w-full font-bold py-3 px-4 rounded-xl shadow-md text-white transition duration-200 bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800"
          >
            Cadastrar Tutor
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroTutor;
