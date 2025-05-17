import { useEffect, useState } from 'react';
import axios from 'axios';

function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5294/api/agendamentos')
      .then(res => {
        console.log("Agendamentos recebidos:", res.data); // debug
        setAgendamentos(res.data);
      })
      .catch(err => {
        console.error("Erro ao buscar agendamentos:", err);
        alert('Erro ao buscar agendamentos');
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Agendamentos Realizados</h2>

      {agendamentos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum agendamento encontrado.</p>
      ) : (
        agendamentos.map((ag, index) => (
          <div key={index} className="border-b py-4">
            <h3 className="font-bold text-lg text-red-500">🐾 Pet: {ag.nomePet}</h3>
            <p className="text-sm text-gray-600">
              📅 {new Date(ag.data).toLocaleDateString()} às {ag.hora ?? '---'}
            </p>
            <ul className="ml-4 mt-2 list-disc text-gray-700">
              {ag.agendamentoServico?.map((s, idx) => (
                <li key={idx}>
                  {s.servico?.descricao ?? 'Serviço não encontrado'} — {s.quantidade}x
                  (R$ {s.servico?.valor?.toFixed(2) ?? '0.00'})
                  <br />
                  <span className="text-sm text-gray-500">
                    Tutor: {s.servico?.tutor?.nome ?? 'N/D'}
                  </span>
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
