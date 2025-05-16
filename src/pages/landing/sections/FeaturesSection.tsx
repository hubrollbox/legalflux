
import { 
  FileText, 
  Shield, 
  Users, 
  MessageSquare, 
  BarChart, 
  Clock 
} from "lucide-react";

const features = [
  {
    title: "Gestão de Processos",
    description:
      "Faça a gestão de todos os seus casos jurídicos com eficiência num único lugar. Acesso rápido a documentos, histórico e comunicações.",
    icon: FileText,
  },
  {
    title: "Controlo de Permissões",
    description:
      "Controlo granular de acesso baseado em funções, garantindo que cada utilizador veja apenas o que deve ver.",
    icon: Shield,
  },
  {
    title: "Portal do Cliente",
    description:
      "Ofereça aos seus clientes acesso 24/7 aos seus processos, documentos e comunicações.",
    icon: Users,
  },
  {
    title: "Comunicação Integrada",
    description:
      "Sistema de mensagens interno para comunicação eficiente entre advogados, assistentes e clientes.",
    icon: MessageSquare,
  },
  {
    title: "Relatórios Avançados",
    description:
      "Análise detalhada de desempenho, faturação e produtividade do escritório.",
    icon: BarChart,
  },
  {
    title: "Gestão de Prazos",
    description:
      "Acompanhamento de todos os prazos processuais com sistema de alertas.",
    icon: Clock,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-900">
            Funcionalidades Poderosas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo o que necessita para gerir o seu escritório jurídico de forma eficiente.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-300 hover:border-gray-300 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary-900 rounded-lg flex items-center justify-center mb-5 group-hover:bg-highlight transition-all duration-300">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-900 group-hover:text-highlight transition-colors">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
