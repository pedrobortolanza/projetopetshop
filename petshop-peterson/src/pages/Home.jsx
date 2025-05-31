function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800 px-4 py-10">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-cyan-700 mb-4">
            🐕 Bem-vindo ao Petshop Peterson!
          </h1>

          <p className="text-gray-700 text-lg mb-6">
            Aqui você pode cadastrar tutores, serviços, agendar atendimentos e acompanhar tudo de forma organizada e eficiente.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <a
              href="/api/tutores"
              className="bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800 text-white py-3 px-5 rounded-xl shadow-md transition duration-200"
            >
              ➕ Cadastrar Tutor
            </a>
            <a
              href="/api/servicos"
              className="bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800 text-white py-3 px-5 rounded-xl shadow-md transition duration-200"
            >
              📝 Cadastrar Serviço
            </a>
            <a
              href="/api/agendamentos/novo"
              className="bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800 text-white py-3 px-5 rounded-xl shadow-md transition duration-200"
            >
              📆 Agendar Serviço
            </a>
            <a
              href="/api/agendamentos"
              className="bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800 text-white py-3 px-5 rounded-xl shadow-md transition duration-200"
            >
              📋 Ver Agendamentos
            </a>
          </div>
        </div>
      </div>

      {/* Seção final: Quem Somos / Como Funciona */}
      <div className="max-w-5xl w-full mx-auto mt-10 bg-white rounded-2xl shadow-xl p-8 border border-cyan-200 mb-10 flex flex-col md:flex-row justify-between gap-8">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold text-cyan-700 mb-2">👥 Quem Somos</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            O Petshop Peterson nasceu com a missão de facilitar o dia a dia de quem cuida de pets.
            Criamos uma solução simples, eficiente e acolhedora para organizar agendamentos,
            acompanhar serviços e garantir um atendimento de qualidade tanto para os tutores quanto para seus melhores amigos de quatro patas.
          </p>
        </div>

        <div className="md:w-1/2 max-w-[400px]">
          <h2 className="text-2xl font-bold text-cyan-700 mb-2">🔎 Como Funciona</h2>
          <ul className="text-gray-600 list-disc list-inside space-y-1 text-sm">
            <li>Cadastre tutores e seus pets de forma rápida</li>
            <li>Configure os serviços disponíveis no petshop</li>
            <li>Agende os atendimentos com poucos cliques</li>
            <li>Acompanhe todos os agendamentos em tempo real</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
