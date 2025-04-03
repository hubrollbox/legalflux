
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Shield, Lock, Database, Eye, FileCheck, RefreshCw, Server, CloudOff } from "lucide-react";

const SecurityFeature = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex"
    >
      <div className="mr-4 flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

const Security = () => {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium mb-4"
              >
                Segurança
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                A segurança dos seus dados é a nossa prioridade
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto text-lg text-muted-foreground"
              >
                O LegalFlux implementa as mais avançadas tecnologias de segurança para proteger as informações confidenciais dos seus clientes e do seu escritório.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              <SecurityFeature
                icon={Shield}
                title="Proteção Completa"
                description="Implementamos múltiplas camadas de segurança para proteger os seus dados de acessos não autorizados, incluindo firewalls avançados e proteção contra intrusões."
              />
              <SecurityFeature
                icon={Lock}
                title="Encriptação Avançada"
                description="Todos os dados são encriptados em trânsito e em repouso utilizando algoritmos de encriptação AES-256, garantindo que mesmo que interceptados, permaneçam ilegíveis."
              />
              <SecurityFeature
                icon={Database}
                title="Backups Automáticos"
                description="Realizamos backups automáticos diários com retenção geográfica distribuída, garantindo que os seus dados podem ser recuperados rapidamente em caso de incidente."
              />
              <SecurityFeature
                icon={Eye}
                title="Controlo de Acesso"
                description="Sistema granular de permissões baseado em papéis, permitindo controlar exatamente quem pode aceder a que informação dentro do seu escritório."
              />
              <SecurityFeature
                icon={FileCheck}
                title="Conformidade Legal"
                description="Plataforma totalmente em conformidade com o RGPD e outras regulamentações relevantes sobre proteção de dados e confidencialidade advocatícia."
              />
              <SecurityFeature
                icon={RefreshCw}
                title="Atualizações Contínuas"
                description="Monitorização constante e implementação proativa de patches de segurança para proteger contra novas vulnerabilidades descobertas."
              />
              <SecurityFeature
                icon={Server}
                title="Infraestrutura Certificada"
                description="Alojado em data centers com certificações ISO 27001, SOC 2 Tipo II e outras certificações de segurança internacionais."
              />
              <SecurityFeature
                icon={CloudOff}
                title="Isolamento de Dados"
                description="Arquitetura multi-tenant com isolamento completo dos dados, garantindo que as informações do seu escritório permanecem estritamente separadas das de outros clientes."
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 p-8 bg-primary/5 rounded-xl border border-primary/10"
            >
              <h2 className="text-2xl font-bold mb-4">Compromisso com a Segurança</h2>
              <p className="mb-6">
                Na LegalFlux, entendemos que os advogados lidam com informações altamente sensíveis e confidenciais. É por isso que a segurança está no centro de tudo o que fazemos:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Auditorias de segurança regulares por entidades independentes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Testes de penetração periódicos para identificar e corrigir vulnerabilidades</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Equipa dedicada de especialistas em segurança</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Monitorização 24/7 de atividades suspeitas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Plano de resposta a incidentes bem definido e testado regularmente</span>
                </li>
              </ul>
              <p>
                Para mais informações sobre as nossas práticas de segurança ou para solicitar a nossa documentação detalhada de segurança, não hesite em contactar a nossa equipa.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Security;
