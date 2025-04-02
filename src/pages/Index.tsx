import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getPlanDetails } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Users,
  FileText,
  MessageSquare,
  BarChart,
  Clock,
  Globe,
} from "lucide-react";

const LandingPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in, redirect to dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

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

  // Get subscription plans
  const basicPlan = getPlanDetails("basic");
  const soloPlan = getPlanDetails("solo");
  const enterprisePlan = getPlanDetails("enterprise");

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <iframe 
          src="https://player.vimeo.com/video/1062960326?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1" 
          className="w-full h-screen object-cover absolute top-0 left-0" 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
          title="LegalFlux"
        ></iframe>
        <div className="absolute inset-0 bg-primary-950/70"></div>
      </div>

      {/* Conteúdo sobreposto ao vídeo */}
      <div className="relative z-10">
        {/* Navigation */}
        <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-primary-950">
                LegalFlux
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/#features"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Funcionalidades
              </Link>
              <Link
                to="/#pricing"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Planos
              </Link>
              <Link
                to="/screenshots"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Screenshots
              </Link>
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Login
              </Link>
              <Button onClick={() => navigate("/register")}>Começar Grátis</Button>
            </nav>
            <div className="md:hidden flex items-center gap-2">
              <Link
                to="/screenshots"
                className="text-gray-600 hover:text-primary-600 transition-colors text-sm"
              >
                Screenshots
              </Link>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Sistema de Gestão Jurídica Completo
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100">
              Faça a gestão de utilizadores, permissões e assinaturas na sua plataforma jurídica 
              com eficiência, segurança e conformidade.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-primary-900 hover:bg-gray-100"
                onClick={() => navigate("/register")}
              >
                Comece Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
                onClick={() => navigate("/login")}
              >
                Fazer Login
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50" id="features">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
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
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20" id="pricing">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Planos de Assinatura Flexíveis
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Escolha o plano que melhor se adapta às necessidades do seu escritório.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Basic Plan */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{basicPlan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">{basicPlan.price}€</span>
                    <span className="text-gray-500 ml-1">/mês</span>
                  </div>
                  <p className="text-gray-600 mb-6">{basicPlan.description}</p>
                  <Button
                    className="w-full mb-6"
                    onClick={() => navigate("/register")}
                  >
                    Começar Agora
                  </Button>
                  <ul className="space-y-3">
                    {basicPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Solo Plan */}
              <div className="bg-white rounded-lg shadow-md border border-primary-200 overflow-hidden transform scale-105 relative">
                <div className="absolute top-0 right-0 bg-accent-gold text-white text-xs font-bold px-3 py-1 uppercase">
                  Popular
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{soloPlan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">{soloPlan.price}€</span>
                    <span className="text-gray-500 ml-1">/mês</span>
                  </div>
                  <p className="text-gray-600 mb-6">{soloPlan.description}</p>
                  <Button
                    className="w-full mb-6 bg-primary-600 hover:bg-primary-700"
                    onClick={() => navigate("/register")}
                  >
                    Escolher Plano Solo
                  </Button>
                  <ul className="space-y-3">
                    {soloPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{enterprisePlan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">{enterprisePlan.price}€</span>
                    <span className="text-gray-500 ml-1">/mês</span>
                  </div>
                  <p className="text-gray-600 mb-6">{enterprisePlan.description}</p>
                  <Button
                    className="w-full mb-6"
                    onClick={() => navigate("/register")}
                  >
                    Começar Agora
                  </Button>
                  <ul className="space-y-3">
                    {enterprisePlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Precisa de um plano personalizado?{" "}
                <Button
                  variant="link"
                  className="text-primary-600 p-0 h-auto"
                  onClick={() => navigate("/register")}
                >
                  Entre em contacto connosco
                </Button>
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
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

        {/* CTA Section */}
        <section className="py-20 bg-primary-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para Transformar o seu Escritório?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Experimente o LegalFlux hoje e descubra como a nossa plataforma pode 
              aumentar a produtividade e organização do seu escritório jurídico.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary-900 hover:bg-gray-100"
              onClick={() => navigate("/register")}
            >
              Comece a sua Avaliação Gratuita
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">LegalFlux</h3>
                <p className="text-gray-400">
                  Sistema completo de gestão jurídica para escritórios modernos.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/#features" className="text-gray-400 hover:text-white transition-colors">
                      Funcionalidades
                    </Link>
                  </li>
                  <li>
                    <Link to="/#pricing" className="text-gray-400 hover:text-white transition-colors">
                      Planos
                    </Link>
                  </li>
                  <li>
                    <Link to="/screenshots" className="text-gray-400 hover:text-white transition-colors">
                      Screenshots
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Suporte</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/screenshots" className="text-gray-400 hover:text-white transition-colors">
                      Central de Ajuda
                    </Link>
                  </li>
                  <li>
                    <Link to="/screenshots" className="text-gray-400 hover:text-white transition-colors">
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link to="/screenshots" className="text-gray-400 hover:text-white transition-colors">
                      Documentação
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                      Sobre nós
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                      Carreiras
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.
              </p>
              <div className="flex space-x-6">
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Termos
                </Link>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Privacidade
                </Link>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
