
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { ArrowRight, Zap, Mail, Calendar as CalendarIcon, File, Database, MessageSquare, DollarSign } from "lucide-react";

const IntegrationCard = ({ 
  icon: Icon, 
  title, 
  description, 
  available = true 
}: { 
  icon: any; 
  title: string; 
  description: string;
  available?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
        <div className="flex items-start">
          <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="text-xl font-semibold">{title}</h3>
              {available ? (
                <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                  Disponível
                </span>
              ) : (
                <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                  Em breve
                </span>
              )}
            </div>
            <p className="mt-2 text-muted-foreground">{description}</p>
            <Button 
              className={`mt-4 ${!available ? "opacity-50 cursor-not-allowed" : ""}`}
              variant="outline"
              disabled={!available}
            >
              {available ? "Configurar" : "Notificar-me quando disponível"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const Integrations = () => {
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
                Integrações
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Conecte-se com as suas ferramentas favoritas
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto text-lg text-muted-foreground"
              >
                O LegalFlux integra-se perfeitamente com as principais ferramentas e sistemas utilizados por escritórios de advocacia, permitindo um fluxo de trabalho contínuo.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <IntegrationCard
                icon={Zap}
                title="Zapier"
                description="Automatize fluxos de trabalho conectando o LegalFlux a mais de 3.000 aplicações, sem necessidade de programação."
              />
              <IntegrationCard
                icon={Mail}
                title="Microsoft Outlook"
                description="Sincronize e-mails, contactos e calendário diretamente com o seu Outlook para manter todas as comunicações organizadas."
              />
              <IntegrationCard
                icon={CalendarIcon}
                title="Google Calendar"
                description="Sincronização bidirecional com o Google Calendar para gerir todos os seus compromissos num único lugar."
              />
              <IntegrationCard
                icon={File}
                title="Google Drive & OneDrive"
                description="Integração com as principais plataformas de armazenamento em nuvem para gestão documental centralizada."
              />
              <IntegrationCard
                icon={Database}
                title="CITIUS / Tribunais Digitais"
                description="Integração com o sistema judicial português para acompanhamento automático de processos judiciais."
                available={false}
              />
              <IntegrationCard
                icon={MessageSquare}
                title="WhatsApp & Telegram"
                description="Comunicação direta com clientes através de plataformas de mensagens, mantendo todas as conversas registadas no sistema."
                available={false}
              />
              <IntegrationCard
                icon={DollarSign}
                title="Software de Contabilidade"
                description="Integração com os principais sistemas de contabilidade como Sage, Primavera e TOConline para faturação simplificada."
                available={false}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 p-8 bg-secondary/50 rounded-xl"
            >
              <h2 className="text-2xl font-bold mb-4">Precisa de uma integração personalizada?</h2>
              <p className="mb-6 text-muted-foreground">
                Se necessita de uma integração específica para o seu escritório, a nossa equipa de desenvolvimento pode criar soluções personalizadas para as suas necessidades.
              </p>
              <Button size="lg">
                Solicite uma integração
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Integrations;