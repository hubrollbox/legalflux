import Navbar from "@/pages/landing/components/LandingNavbar";
import Features from "@/pages/landing/sections/FeaturesSection";
import Footer from "@/pages/landing/components/LandingFooter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-grow">
        <div className="container mx-auto px-4 py-12 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Funcionalidades</h1>
            <p className="text-xl text-muted-foreground">
              Conheça todos os recursos que o LegalFlux oferece para otimizar a gestão do seu escritório de advocacia.
            </p>
          </motion.div>
        </div>
        
        <Features />
        
        <div className="container mx-auto px-4 py-16 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Pronto para transformar seu escritório?</h2>
            <Link to="/login">
              <Button size="lg" className="px-8">
                Comece agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
