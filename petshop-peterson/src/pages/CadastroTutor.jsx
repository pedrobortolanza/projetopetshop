import { useState } from 'react';
import axios from 'axios';

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

      toast.sucess('Tutor cadastrado com sucesso!');
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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Cadastro de Tutor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={nome} onChange={e => setNome(e.target.value)} required placeholder="Nome"
          className="w-full border px-3 py-2 rounded-lg" />
        <input value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email"
          className="w-full border px-3 py-2 rounded-lg" type="email" />
        <input value={senha} onChange={e => setSenha(e.target.value)} required placeholder="Senha"
          className="w-full border px-3 py-2 rounded-lg" type="password" />
        <select value={tipo} onChange={e => setTipo(parseInt(e.target.value))}
          className="w-full border px-3 py-2 rounded-lg">
          <option value={0}>Cliente</option>
          <option value={1}>Funcionário</option>
        </select>

        <hr className="my-4" />
        <h3 className="text-lg font-semibold text-gray-600">Endereço</h3>
        <input value={logradouro.cep} onChange={e => setLogradouro({ ...logradouro, cep: e.target.value })} required placeholder="CEP"
          className="w-full border px-3 py-2 rounded-lg" />
        <input value={logradouro.rua} onChange={e => setLogradouro({ ...logradouro, rua: e.target.value })} required placeholder="Rua"
          className="w-full border px-3 py-2 rounded-lg" />
        <input value={logradouro.numero} onChange={e => setLogradouro({ ...logradouro, numero: e.target.value })} required placeholder="Número"
          className="w-full border px-3 py-2 rounded-lg" />
        <input value={logradouro.complemento} onChange={e => setLogradouro({ ...logradouro, complemento: e.target.value })} placeholder="Complemento"
          className="w-full border px-3 py-2 rounded-lg" />

        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold">
          Cadastrar Tutor
        </button>
      </form>
    </div>
  );
}

export default CadastroTutor;
