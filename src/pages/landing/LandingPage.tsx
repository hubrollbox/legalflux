
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LandingNavbar from "./components/LandingNavbar";
import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import PricingSection from "./sections/PricingSection";
import CTASection from "./sections/CTASection";
import LandingFooter from "./components/LandingFooter";

const LandingPage: React.FC = () => {
  const { isAuthenticated, user, getRedirectPath } = useAuth();
  const redirectPath = getRedirectPath();

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNavbar />
      <main>
        <HeroSection />
        
        {/* Banner de boas-vindas para utilizadores autenticados */}
        {isAuthenticated && user && (
          <section className="w-full bg-primary py-4 text-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Bem-vindo, {user.name}!</h3>
                  <p>
                    {user.role === "client" 
                      ? "Aceda ao seu Portal de Cliente para gerir os seus processos jurídicos."
                      : "Aceda ao seu Dashboard para continuar o seu trabalho."}
                  </p>
                </div>
                <Link to={redirectPath}>
                  <Button 
                    className="mt-3 md:mt-0 bg-white text-primary hover:bg-gray-100"
                  >
                    {user.role === "client" ? "Portal do Cliente" : "Dashboard"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
        
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
