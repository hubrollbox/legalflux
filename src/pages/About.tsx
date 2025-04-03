import { Link } from "react-router-dom";
import { Shield, Zap, Users } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Sobre nós</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transformando a gestão jurídica com tecnologia inovadora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">A nossa missão</h2>
            <p className="text-lg mb-6">
              Na LegalFlux, temos como missão transformar a forma como escritórios de advocacia 
              gerem seus processos, documentos e prazos, através de uma plataforma tecnológica 
              intuitiva e completa.
            </p>
            <p className="text-lg mb-6">
              Acreditamos que a tecnologia deve ser uma aliada dos profissionais jurídicos, 
              libertando-os de tarefas administrativas para que possam focar no que realmente 
              importa: oferecer um serviço jurídico de excelência aos seus clientes.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">85%</h3>
                <p className="text-sm text-muted-foreground">Redução em tarefas administrativas</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">95%</h3>
                <p className="text-sm text-muted-foreground">Taxa de satisfação dos utilizadores</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/img/about-mission.jpg" 
              alt="Nossa missão" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Os nossos valores</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Os valores que guiam todas as nossas decisões e definem quem somos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 mx-auto bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Segurança</h3>
                <p className="text-muted-foreground">
                  Protegemos os seus dados com os mais altos padrões de segurança e confidencialidade.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 mx-auto bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Inovação</h3>
                <p className="text-muted-foreground">
                  Buscamos constantemente novas formas de melhorar e simplificar a gestão jurídica.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 mx-auto bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cliente no centro</h3>
                <p className="text-muted-foreground">
                  Todas as nossas decisões são tomadas com base nas necessidades dos nossos clientes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-primary text-primary-foreground rounded-xl p-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Junte-se à revolução digital do setor jurídico</h2>
              <p className="mb-6">
                Experimente o LegalFlux e descubra como podemos transformar a gestão do seu escritório de advocacia.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="bg-primary text-white border border-white hover:bg-white hover:text-primary"
                  >
                    Agende uma demonstração
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary"
                  >
                    Comece gratuitamente
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="/img/about-cta.png" 
                alt="App Interface" 
                className="max-w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Os nossos parceiros</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            Trabalhamos com empresas e instituições líderes para oferecer a melhor solução de gestão jurídica.
          </p>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-60">
            <img src="/img/partners/partner1.svg" alt="Partner 1" className="h-12" />
            <img src="/img/partners/partner2.svg" alt="Partner 2" className="h-12" />
            <img src="/img/partners/partner3.svg" alt="Partner 3" className="h-12" />
            <img src="/img/partners/partner4.svg" alt="Partner 4" className="h-12" />
            <img src="/img/partners/partner5.svg" alt="Partner 5" className="h-12" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;