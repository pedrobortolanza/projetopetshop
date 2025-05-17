import { useState, useEffect } from 'react';
import axios from 'axios';

function Agendamento() {
  const [servicos, setServicos] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [nomePet, setNomePet] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5294/api/servicos')
      .then(res => setServicos(res.data));
  }, []);

  const toggleServico = (id) => {
    setSelecionados((prev) =>
      prev.some(s => s.servicoId === id)
        ? prev.filter(s => s.servicoId !== id)
        : [...prev, { servicoId: id, quantidade: 1 }]
    );
  };

  const alterarQtd = (id, qtd) => {
    setSelecionados(prev =>
      prev.map(s =>
        s.servicoId === id ? { ...s, quantidade: parseInt(qtd) } : s
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data || !hora || selecionados.length === 0) {
      alert('Preencha data, hora e selecione ao menos um serviço.');
      return;
    }

    const dados = {
      nomePet,
      data, // ex: "2025-05-18"
      hora, // ex: "14:00"
      agendamentoServico: selecionados
    };

    console.log("Payload:", dados); // debug

    try {
      await axios.post('http://localhost:5294/api/agendamentos', dados);
      alert('Agendamento realizado com sucesso!');
      setSelecionados([]);
      setData('');
      setHora('');
      setNomePet('');
    } catch (err) {
      console.error("Erro ao agendar:", err);
      alert('Erro ao agendar serviço.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl text-red-600 font-bold mb-6 text-center">Agendar Serviços</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700 mb-1">🐾 Nome do Pet</label>
          <input
            type="text"
            value={nomePet}
            onChange={e => setNomePet(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">📅 Data</label>
          <input
            type="date"
            value={data}
            onChange={e => setData(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">🕒 Hora</label>
          <input
            type="time"
            value={hora}
            onChange={e => setHora(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div className="space-y-3">
          {servicos.map(s => (
            <div key={s.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <label>{s.descricao} - R${s.valor.toFixed(2)}</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selecionados.some(sel => sel.servicoId === s.id)}
                  onChange={() => toggleServico(s.id)}
                />
                {selecionados.some(sel => sel.servicoId === s.id) && (
                  <input
                    type="number"
                    min="1"
                    value={selecionados.find(sel => sel.servicoId === s.id)?.quantidade || 1}
                    onChange={e => alterarQtd(s.id, e.target.value)}
                    className="w-16 border rounded px-2"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg">
          Agendar
        </button>
      </form>
    </div>
  );
}

export default Agendamento;
