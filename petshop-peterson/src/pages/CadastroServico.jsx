import { useState, useEffect } from 'react';
import axios from 'axios';

function CadastroServico() {
  const [tutores, setTutores] = useState([]);
  const [tutorId, setTutorId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5294/api/tutores')
      .then(res => setTutores(res.data))
      .catch(() => alert('Erro ao carregar tutores.'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dados = {
      tutorId: parseInt(tutorId),
      descricao,
      valor: parseFloat(valor)
    };

    try {
      await axios.post('http://localhost:5294/api/servicos', dados);
      alert('Serviço cadastrado com sucesso! 🎉');
      setTutorId('');
      setDescricao('');
      setValor('');
    } catch (error) {
  if (error.response) {
    console.error("Erro na resposta da API:", error.response.data);
    alert(`Erro ao cadastrar serviço: ${error.response.data?.message || JSON.stringify(error.response.data)}`);
  } else if (error.request) {
    console.error("Sem resposta da API:", error.request);
    alert("A API não respondeu.");
  } else {
    console.error("Erro na configuração:", error.message);
    alert("Erro desconhecido ao cadastrar serviço.");
  }
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
          <label className="block font-medium mb-1 text-gray-700">👨‍👩‍👧 Selecionar Tutor</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={tutorId}
            onChange={(e) => setTutorId(e.target.value)}
            required
          >
            <option value="">Selecione um tutor...</option>
            {tutores.map((tutor) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.nome} - {tutor.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">📋 Descrição do Serviço</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar Serviço'}
        </button>
      </form>
    </div>
  );
}

export default CadastroServico;
