const Cookies = () => {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Cookies</h1>
          
          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. O que são Cookies?</h2>
              <p className="text-gray-600">
                Cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo 
                quando visita o nosso website. Eles ajudam-nos a fornecer uma melhor experiência 
                de utilização e a compreender como o nosso site é utilizado.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Tipos de Cookies que Utilizamos</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800">Cookies Essenciais</h3>
                  <p className="text-gray-600">Necessários para o funcionamento básico do site e da plataforma.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Cookies de Desempenho</h3>
                  <p className="text-gray-600">Ajudam-nos a melhorar o desempenho do site.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Cookies de Funcionalidade</h3>
                  <p className="text-gray-600">Permitem lembrar as suas preferências e personalizar a sua experiência.</p>
                </div>
              </div>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Como Gerir Cookies</h2>
              <p className="text-gray-600">
                Pode controlar e/ou apagar cookies conforme desejar. Pode apagar todos os cookies 
                que já estão no seu computador e pode configurar a maioria dos navegadores para 
                impedir que sejam colocados.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Cookies de Terceiros</h2>
              <p className="text-gray-600">
                Alguns cookies são colocados por serviços de terceiros que aparecem nas nossas páginas. 
                Utilizamos estes serviços para melhorar a sua experiência no nosso site.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Atualizações à Política</h2>
              <p className="text-gray-600">
                Podemos atualizar esta política periodicamente. Recomendamos que consulte esta página 
                regularmente para se manter informado sobre quaisquer alterações.
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
  
  export default Cookies;
  