import { useState } from 'react';
import axios from 'axios';

function CadastroServico() {
  const [nomeCachorro, setNomeCachorro] = useState('');
  const [nomeTutor, setNomeTutor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dados = {
      nomeCachorro,
      nomeTutor,
      descricao,
      valor: parseFloat(valor),
    };

    try {
      await axios.post('http://localhost:5294/api/servicos', dados);
      alert('Serviço cadastrado com sucesso! 🎉');
      setNomeCachorro('');
      setNomeTutor('');
      setDescricao('');
      setValor('');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar serviço ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-10 border border-red-200">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
        Petshop Peterson 🐾<br />
        <span className="text-lg font-normal text-gray-600">Cadastro de Serviço</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1 text-gray-700">🐶 Nome do Cachorro</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={nomeCachorro}
            onChange={(e) => setNomeCachorro(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">👨‍👩‍👧 Nome do Tutor</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={nomeTutor}
            onChange={(e) => setNomeTutor(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">📋 Descrição do Serviço</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Ex: Banho, Tosa, Vacinação..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">💰 Valor (R$)</label>
          <input
            type="number"
            step="0.01"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Ex: 79.90"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-bold py-3 px-4 rounded-lg transition duration-200 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar Serviço'}
        </button>
      </form>
    </div>
  );
}

export default CadastroServico;
