
const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-primary-950 to-primary-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            O Que Os Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Descubra como o LegalFlux está a transformar escritórios jurídicos.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/15">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-primary-400 to-highlight h-12 w-12 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white font-bold">MS</span>
              </div>
              <div>
                <h4 className="font-semibold text-white text-lg">Maria Silva</h4>
                <p className="text-gray-300">Advogada Tributária</p>
              </div>
            </div>
            <p className="text-gray-200 italic">
              "O LegalFlux revolucionou a forma como faço a gestão dos meus processos. A interface é intuitiva e o sistema de permissões é exatamente o que eu precisava."
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/15">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-primary-400 to-highlight h-12 w-12 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white font-bold">RC</span>
              </div>
              <div>
                <h4 className="font-semibold text-white text-lg">Ricardo Costa</h4>
                <p className="text-gray-300">Advogado Sénior</p>
              </div>
            </div>
            <p className="text-gray-200 italic">
              "Como gestor de um escritório com 8 advogados, o plano Enterprise proporcionou-nos todas as ferramentas necessárias para expandir o nosso negócio."
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/15">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-primary-400 to-highlight h-12 w-12 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white font-bold">AM</span>
              </div>
              <div>
                <h4 className="font-semibold text-white text-lg">Ana Martins</h4>
                <p className="text-gray-300">Assistente Jurídica</p>
              </div>
            </div>
            <p className="text-gray-200 italic">
              "A gestão de tarefas e documentos ficou muito mais simples. Consigo acompanhar todos os prazos e nunca perco um documento importante."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
