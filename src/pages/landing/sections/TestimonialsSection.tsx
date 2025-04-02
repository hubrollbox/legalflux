
const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O Que Os Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra como o LegalFlux está a transformar escritórios jurídicos.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-600 font-bold">MS</span>
              </div>
              <div>
                <h4 className="font-semibold">Maria Silva</h4>
                <p className="text-sm text-gray-500">Advogada Tributária</p>
              </div>
            </div>
            <p className="text-gray-600">
              "O LegalFlux revolucionou a forma como faço a gestão dos meus processos. A interface é intuitiva e o sistema de permissões é exatamente o que eu precisava."
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-600 font-bold">RC</span>
              </div>
              <div>
                <h4 className="font-semibold">Ricardo Costa</h4>
                <p className="text-sm text-gray-500">Advogado Sénior</p>
              </div>
            </div>
            <p className="text-gray-600">
              "Como gestor de um escritório com 8 advogados, o plano Enterprise proporcionou-nos todas as ferramentas necessárias para expandir o nosso negócio."
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-600 font-bold">AM</span>
              </div>
              <div>
                <h4 className="font-semibold">Ana Martins</h4>
                <p className="text-sm text-gray-500">Assistente Jurídica</p>
              </div>
            </div>
            <p className="text-gray-600">
              "A gestão de tarefas e documentos ficou muito mais simples. Consigo acompanhar todos os prazos e nunca perco um documento importante."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
