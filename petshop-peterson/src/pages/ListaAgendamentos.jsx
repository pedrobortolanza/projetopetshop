import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5294/api/agendamentos')
      .then(res => {
        setAgendamentos(res.data);
      })
      .catch(() => {
        toast.error('Erro ao carregar agendamentos.');
      });
  }, []);

  const concluirAgendamento = async (id) => {
    try {
      await axios.put(`http://localhost:5294/api/agendamentos/${id}/concluir`);
      toast.success('Concluído com sucesso! 🎉');
      setAgendamentos(prev => prev.filter(ag => ag.id !== id));
    } catch (err) {
      toast.error('Erro ao concluir agendamento.');
    }
  };

  const excluirAgendamento = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este agendamento?")) return;

    try {
      await axios.delete(`http://localhost:5294/api/agendamentos/${id}`);
      toast.success("Agendamento excluído com sucesso!");
      setAgendamentos(prev => prev.filter(ag => ag.id !== id));
    } catch (err) {
      toast.error("Erro ao excluir agendamento.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800 p-6 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 mt-10">
        <h2 className="text-3xl font-bold text-center text-cyan-700 mb-8">Agendamentos Realizados</h2>

        {agendamentos.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum agendamento encontrado.</p>
        ) : (
          agendamentos.map((ag, index) => (
            <div key={index} className="border-b border-gray-200 pb-5 mb-5 last:mb-0 last:border-b-0 text-center">
              <h3 className="font-bold text-lg text-cyan-600 mb-1">🐕 Pet: {ag.nomePet}</h3>
              <p className="text-sm text-gray-600 mb-3">
                📅 {new Date(ag.data).toLocaleDateString()} às {ag.hora ?? '---'}
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                {ag.agendamentoServico?.map((s, idx) => (
                  <li key={idx}>
                    <span className="font-semibold">
                      {s.servico?.descricao ?? 'Serviço não existente'}
                    </span> — {s.quantidade}x (R$ {s.servico?.valor?.toFixed(2) ?? '0.00'})
                  </li>
                ))}
              </ul>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => concluirAgendamento(ag.id)}
                  className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-1 rounded-xl font-semibold transition duration-200"
                >
                  Concluir
                </button>
                <button
                  onClick={() => excluirAgendamento(ag.id)}
                  className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-1 rounded-xl font-semibold transition duration-200"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ListaAgendamentos;
