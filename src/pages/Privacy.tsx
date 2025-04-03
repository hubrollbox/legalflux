const Privacy = () => {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>
          
          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Informações que Coletamos</h2>
              <p className="text-gray-600">
                Coletamos informações que você nos fornece diretamente, como nome, email e dados profissionais.
                Também coletamos dados de uso da plataforma para melhorar nossos serviços.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Como Usamos suas Informações</h2>
              <p className="text-gray-600">
                Utilizamos suas informações para fornecer e melhorar nossos serviços, 
                comunicar-nos com você e personalizar sua experiência na plataforma.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Compartilhamento de Dados</h2>
              <p className="text-gray-600">
                Não vendemos suas informações pessoais. Compartilhamos dados apenas quando necessário 
                para fornecer os serviços ou quando exigido por lei.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Segurança dos Dados</h2>
              <p className="text-gray-600">
                Implementamos medidas de segurança técnicas e organizacionais para proteger 
                suas informações contra acesso não autorizado ou processamento ilegal.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Seus Direitos</h2>
              <p className="text-gray-600">
                Você tem direito a acessar, corrigir ou excluir suas informações pessoais. 
                Entre em contato conosco para exercer esses direitos.
              </p>
            </section>
          </div>
  
          <div className="mt-8 text-center text-sm text-gray-500">
            Última atualização: {new Date().toLocaleDateString('pt-PT')}
          </div>
        </div>
      </div>
    );
  };
  
  export default Privacy;
  