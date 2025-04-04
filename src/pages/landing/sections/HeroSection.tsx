
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4 leading-tight text-gray-900">
            Gestão jurídica simplificada para o seu escritório
          </h1>
          <p className="text-xl mb-8 text-gray-600 max-w-lg">
            Impulsione a eficiência do seu escritório com uma solução completa de gestão de processos, documentos e clientes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-highlight text-white hover:bg-highlight/90">
                Comece agora <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline">
                Conheça as funcionalidades
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                  <img 
                    src={`/img/avatar${i}.jpg`} 
                    alt="Usuario" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=User";
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="ml-4">
              <div className="flex items-center text-yellow-500">
                ★★★★★ <span className="ml-1 text-gray-600">4.9/5</span>
              </div>
              <p className="text-sm text-gray-600">Avaliação de mais de 500 utilizadores</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-1/2 relative"
        >
          <div className="overflow-hidden rounded-xl">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover rounded-xl"
            >
              <source src="/video/demo.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
