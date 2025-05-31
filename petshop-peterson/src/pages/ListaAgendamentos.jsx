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
  }, []);

  const concluirAgendamento = async (id) => {
    try {
      await axios.put(`http://localhost:5294/api/agendamentos/${id}/concluir`);
      toast.success('Concluido com sucesso!');
      window.location.reload();
    } catch (err) {
      toast.error('Erro ao concluir agendamento.');
    }
  };

  
const excluirAgendamento = async (id) => {
  if (!window.confirm("Tem certeza que deseja excluir este agendamento?")) return;

  try {
    await axios.delete(`http://localhost:5294/api/agendamentos/${id}`);
    toast.success("Agendamento excluído com sucesso!");
    setAgendamentos(agendamentos.filter(ag => ag.id !== id));
  } catch (err) {
    toast.error("Erro ao excluir agendamento.");
    console.error(err);
  }
};

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-cyan-600 mb-6">Agendamentos Realizados</h2>

      {agendamentos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum agendamento encontrado.</p>
      ) : (
        agendamentos.map((ag, index) => (
          <div key={index} className="border-b py-4">
            <h3 className="font-bold text-lg text-cyan-600">🐕 Pet: {ag.nomePet}</h3>
            <p className="text-sm text-gray-600">
              📅 {new Date(ag.data).toLocaleDateString()} às {ag.hora ?? '---'}
            </p>
            <ul className="ml-4 mt-2 list-disc text-gray-700">
              {ag.agendamentoServico?.map((s, idx) => (
                <li key={idx}>
                  {s.servico?.descricao ?? 'Serviço não existente'} — {s.quantidade}x
                  (R$ {s.servico?.valor?.toFixed(2) ?? '0.00'})
                  <br />
                  <button
                    onClick={() => concluirAgendamento(ag.id)}
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Concluir
                  </button>
                  <button
                    onClick={() => excluirAgendamento(ag.id)}
                    className="ml-2 text-sm bg-cyan-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default ListaAgendamentos;
