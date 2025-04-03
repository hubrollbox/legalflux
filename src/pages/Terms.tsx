const Terms = () => {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso</h1>
          
          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-600">
                Ao acessar e usar o LegalFlux, você concorda com estes termos de uso. 
                Se você não concordar com qualquer parte destes termos, não poderá usar nossos serviços.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Uso do Serviço</h2>
              <p className="text-gray-600">
                O LegalFlux é uma plataforma para gestão de escritórios de advocacia. 
                Você concorda em usar o serviço apenas para fins legais e de acordo com estes termos.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Conta de Usuário</h2>
              <p className="text-gray-600">
                Para usar nossos serviços, você precisa criar uma conta. 
                Você é responsável por manter a confidencialidade de sua conta e senha.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Privacidade</h2>
              <p className="text-gray-600">
                Nossa política de privacidade descreve como coletamos e usamos suas informações. 
                Ao usar nossos serviços, você concorda com nossa política de privacidade.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Limitação de Responsabilidade</h2>
              <p className="text-gray-600">
                O LegalFlux não será responsável por quaisquer danos diretos, indiretos, 
                incidentais ou consequenciais resultantes do uso ou incapacidade de usar o serviço.
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
  
  export default Terms;
  