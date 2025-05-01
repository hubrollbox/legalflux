import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// Remover: import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
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
                  <Image 
                    src={`/img/avatar${i}.jpg`} 
                    alt="Usuario" 
                    width={32} 
                    height={32} 
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
            <iframe 
              src="https://player.vimeo.com/video/1062960326?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&loop=1&autoplay=1&muted=1&controls=0" 
              width="100%" 
              height="100%" 
              className="w-full h-full object-cover rounded-xl aspect-video"
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
              title="Legalflux"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
