
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Play, Clock, Film, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";

const Tutorials = () => {
  return (
    <PageTransition>
      <Navbar />
      <div className="tabs">
        <div className="tab">Documentação</div>
        <div className="tab">FAQs</div>
        <div className="tab">Links Úteis</div>
        <div className="tab">Tutoriais</div>
      </div>
      <main className="pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="inline-block px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium mb-4">
                Tutoriais
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Aprenda a utilizar o LegalFlux
              </h1>
              <p className="text-lg text-muted-foreground">
                Vídeos e guias passo a passo para tirar o máximo partido da plataforma
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: "Introdução ao LegalFlux",
                  duration: "8:45",
                  level: "Iniciante",
                  thumbnail: "bg-gradient-to-br from-blue-500 to-purple-600"
                },
                {
                  title: "Gestão de Processos Avançada",
                  duration: "12:20",
                  level: "Intermédio",
                  thumbnail: "bg-gradient-to-br from-green-500 to-teal-600"
                },
                {
                  title: "Automatização de Documentos",
                  duration: "15:30",
                  level: "Avançado",
                  thumbnail: "bg-gradient-to-br from-orange-500 to-red-600"
                },
                {
                  title: "Configuração de Utilizadores e Permissões",
                  duration: "10:15",
                  level: "Intermédio",
                  thumbnail: "bg-gradient-to-br from-purple-500 to-indigo-600"
                },
                {
                  title: "Relatórios e Análise de Dados",
                  duration: "18:40",
                  level: "Avançado",
                  thumbnail: "bg-gradient-to-br from-cyan-500 to-blue-600"
                },
                {
                  title: "Integração com Calendário",
                  duration: "7:30",
                  level: "Iniciante",
                  thumbnail: "bg-gradient-to-br from-amber-500 to-orange-600"
                },
              ].map((tutorial, index) => (
                <motion.div
                  key={tutorial.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className={`relative h-48 ${tutorial.thumbnail} flex items-center justify-center`}>
                    <img src="/path/to/new/image.png" alt="Análise de Gestão Financeira" className="absolute inset-0 object-cover w-full h-full" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 h-16 w-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/40 transition-colors">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{tutorial.duration}</span>
                      </div>
                      <div className="text-sm font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {tutorial.level}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{tutorial.title}</h3>
                    <Button variant="outline" className="w-full justify-center">
                      Ver Tutorial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="max-w-5xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-2xl font-bold mb-8 text-center"
              >
                Cursos Completos
              </motion.h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Gestão de Escritório Jurídico com LegalFlux",
                    lessons: 12,
                    duration: "3h 45min",
                    description: "Curso completo para administradores de escritórios jurídicos. Aprenda a configurar e gerir todos os aspectos da plataforma."
                  },
                  {
                    title: "Produtividade Jurídica para Advogados",
                    lessons: 8,
                    duration: "2h 20min",
                    description: "Focado em advogados que desejam maximizar a sua produtividade com as ferramentas do LegalFlux."
                  },
                  {
                    title: "LegalFlux para Assistentes Jurídicos",
                    lessons: 10,
                    duration: "2h 50min",
                    description: "Ideal para assistentes e secretárias jurídicas aprenderem a gerir agendas, documentos e comunicações."
                  },
                ].map((course, index) => (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="flex flex-col md:flex-row gap-6 p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="md:w-1/4 h-40 md:h-auto rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <Film className="h-12 w-12 text-primary" />
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Film className="h-4 w-4 mr-1" />
                          <span>{course.lessons} lições</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {course.description}
                      </p>
                      <Button>
                        Iniciar Curso
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Tutorials;

<Footer />
