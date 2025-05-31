import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
      data, 
      hora, 
      agendamentoServico: selecionados
    };

    try {
      await axios.post('http://localhost:5294/api/agendamentos', dados);
      toast.success('Agendamento realizado com sucesso! 🎉');
      setSelecionados([]);
      setData('');
      setHora('');
      setNomePet('');
    } catch (err) {
      console.error("Erro ao agendar:", err);
      toast.error('Erro ao agendar serviço.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800 p-6 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-cyan-700">Agendar Serviços </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">🐕 Nome do Pet</label>
            <input
              type="text"
              value={nomePet}
              onChange={e => setNomePet(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">📅 Data</label>
            <input
              type="date"
              value={data}
              onChange={e => setData(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">🕒 Hora</label>
            <input
              type="time"
              value={hora}
              onChange={e => setHora(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="space-y-4 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
            {servicos.map(s => {
              const selecionado = selecionados.find(sel => sel.servicoId === s.id);
              return (
                <div key={s.id} className="flex items-center justify-between border-b last:border-b-0 pb-2">
                  <div>
                    <label className="cursor-pointer select-none">
                      {s.descricao} - R${s.valor.toFixed(2)}
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!selecionado}
                      onChange={() => toggleServico(s.id)}
                      className="w-5 h-5 text-cyan-600 focus:ring-cyan-500 rounded"
                    />
                    {selecionado && (
                      <input
                        type="number"
                        min="1"
                        value={selecionado.quantidade}
                        onChange={e => alterarQtd(s.id, e.target.value)}
                        className="w-16 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800 text-white font-bold py-3 rounded-xl shadow-md transition duration-200"
          >
            Agendar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Agendamento;
