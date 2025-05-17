function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-2xl text-center border border-red-200">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">
          🐾 Bem-vindo ao Petshop Peterson!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Aqui você pode cadastrar tutores, serviços, agendar atendimentos e acompanhar tudo de forma organizada e eficiente.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <a
            href="/api/tutores"
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-5 rounded-lg font-semibold transition"
          >
            ➕ Cadastrar Tutor
          </a>
          <a
            href="/api/servicos"
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-5 rounded-lg font-semibold transition"
          >
            📝 Cadastrar Serviço
          </a>
          <a
            href="/api/agendamentos/novo"
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-5 rounded-lg font-semibold transition"
          >
            📆 Agendar Serviço
          </a>
          <a
            href="/api/agendamentos"
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-5 rounded-lg font-semibold transition"
          >
            📋 Ver Agendamentos
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
