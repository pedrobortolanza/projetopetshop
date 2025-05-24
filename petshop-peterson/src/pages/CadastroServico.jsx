import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function CadastroServico() {
  const [tutores, setTutores] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [tutorId, setTutorId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5294/api/tutores')
      .then(res => setTutores(res.data))
      .catch(() => toast.error('Erro ao carregar tutores.'));

    axios.get('http://localhost:5294/api/servicos')
      .then(res => setServicos(res.data))
      .catch(() => toast.error('Erro ao carregar serviços.'));
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
      if (editandoId) {
        await axios.put(`http://localhost:5294/api/servicos/${editandoId}`, dados);
        toast.success('Serviço atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:5294/api/servicos', dados);
        toast.success('Serviço cadastrado com sucesso! 🎉');
      }

      setTutorId('');
      setDescricao('');
      setValor('');
      setEditandoId(null);

      const res = await axios.get('http://localhost:5294/api/servicos');
      setServicos(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar serviço.");
    } finally {
      setLoading(false);
    }
  };

  const excluirServico = async (id) => {
    if (!window.confirm("Deseja realmente excluir este serviço?")) return;

    try {
      await axios.delete(`http://localhost:5294/api/servicos/${id}`);
      toast.success("Serviço excluído com sucesso!");
      setServicos(servicos.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Erro ao excluir serviço.");
    }
  };

  const editarServico = (servico) => {
    setEditandoId(servico.id);
    setDescricao(servico.descricao);
    setValor(servico.valor);
    setTutorId(servico.tutorId.toString());
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-10 border border-red-200">
      <h1 className="text-3xl font-bold text-cyan-600 mb-6 text-center">
        Petshop Peterson 🐕<br />
        <span className="text-lg font-normal text-gray-600">{editandoId ? 'Editar Serviço' : 'Cadastro de Serviço'}</span>
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
         
          className={`w-full text-white font-bold py-3 px-4 rounded-xl border-2 shadow-md transition duration-200 ${
          loading ? 'bg-gray-400 cursor-not-allowed border-gray-500' : 'bg-cyan-600 border-cyan-800'
          }`}
        >
          {loading ? 'Salvando...' : editandoId ? 'Atualizar Serviço' : 'Cadastrar Serviço'}
        </button>
      </form>

      <h2 className="text-xl font-bold text-gray-700 mt-10 mb-4">Serviços Cadastrados</h2>
      {servicos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum serviço cadastrado.</p>
      ) : (
        <ul className="space-y-3">
          {servicos.map((s) => (
            <li key={s.id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
              <div>
                <p className="font-semibold text-cyan-600">{s.descricao}</p>
                <p className="text-sm text-gray-600">Valor: R$ {s.valor.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editarServico(s)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-xl font-semibold border-2 border-blue-700 shadow-md"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirServico(s.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-xl font-semibold border-2 border-red-700 shadow-md"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CadastroServico;
