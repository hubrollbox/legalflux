
import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Database, EyeOff, Fingerprint, History } from "lucide-react";
import Navbar from "@/pages/landing/components/LandingNavbar";
import Footer from "@/pages/landing/components/LandingFooter";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";

const SecurityFeature = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row items-start gap-4 p-6 rounded-lg border bg-white shadow-sm"
    >
      <div className="p-3 rounded-full bg-primary/10 text-primary">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

const Certification = ({ imgSrc, name }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mb-3">
        <img 
          src={imgSrc} 
          alt={name} 
          className="w-16 h-16 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/64x64?text=${name[0]}`;
          }}
        />
      </div>
      <p className="text-sm font-medium text-center">{name}</p>
    </div>
  );
};

const Security = () => {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium mb-4"
              >
                Segurança
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                A sua informação jurídica em mãos seguras
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-2xl mx-auto text-lg text-muted-foreground"
              >
                Desenvolvemos o LegalFlux com a segurança como prioridade absoluta, garantindo a proteção dos seus dados sensíveis e a conformidade com as normas de proteção de dados.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SecurityFeature 
                icon={Shield}
                title="Criptografia de Dados"
                description="Todos os dados são criptografados tanto em trânsito quanto em repouso, utilizando algoritmos de criptografia AES-256 de nível militar."
              />
              
              <SecurityFeature 
                icon={Lock}
                title="Autenticação Multifator"
                description="Proteja o acesso à sua conta com autenticação de dois fatores (2FA), adicionando uma camada extra de segurança além da senha."
              />
              
              <SecurityFeature 
                icon={Database}
                title="Backups Automáticos"
                description="Os seus dados são automaticamente armazenados em backups diários com redundância geográfica, garantindo a recuperação em caso de falhas."
              />
              
              <SecurityFeature 
                icon={EyeOff}
                title="Controlo de Acesso Rigoroso"
                description="Permissões granulares baseadas em funções garantem que cada utilizador aceda apenas aos dados necessários para a sua função."
              />
              
              <SecurityFeature 
                icon={Fingerprint}
                title="Conformidade com RGPD/LGPD"
                description="Implementamos todas as medidas necessárias para garantir a conformidade com o Regulamento Geral de Proteção de Dados (RGPD) e legislação equivalente."
              />
              
              <SecurityFeature 
                icon={History}
                title="Monitorização e Auditoria"
                description="Registo detalhado de todas as atividades no sistema, permitindo auditoria completa e detecção de acesso não autorizado."
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Certificações e Conformidade</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                O LegalFlux cumpre com os mais rigorosos padrões de segurança e proteção de dados a nível global.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Certification imgSrc="/img/certifications/gdpr.svg" name="RGPD Compliant" />
              <Certification imgSrc="/img/certifications/iso27001.svg" name="ISO 27001" />
              <Certification imgSrc="/img/certifications/soc2.svg" name="SOC 2 Type II" />
              <Certification imgSrc="/img/certifications/hipaa.svg" name="HIPAA Compliant" />
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Segurança é a nossa prioridade</h2>
              <p className="mb-8 text-primary-foreground/90">
                Sabemos que a confidencialidade é crucial para escritórios de advocacia. Desenvolver uma plataforma segura é nossa responsabilidade e compromisso com os nossos clientes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Relatório de Segurança
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/20"
                >
                  Política de Privacidade
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Security;
