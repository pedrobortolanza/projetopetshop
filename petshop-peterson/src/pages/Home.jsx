function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-16">
      <h1 className="text-4xl font-bold text-red-600">
        🐾 Bem-vindo ao Petshop Peterson
      </h1>
      <p className="text-gray-600 text-lg max-w-xl">
        Nosso sistema de gestão permite que você cadastre, visualize e organize todos os serviços do seu petshop de forma prática e eficiente. Vamos cuidar juntos dos peludos! 🐶🐱
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <a
          href="/cadastrar-servico"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition"
        >
          ➕ Cadastrar Novo Serviço
        </a>
        <a
          href="/login"
          className="bg-white hover:bg-red-100 text-red-600 border border-red-300 font-semibold py-3 px-6 rounded-lg shadow transition"
        >
          🔐 Acessar Login
        </a>
      </div>
    </div>
  );
}

export default Home;
