
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import PricingSection from "./sections/PricingSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import CTASection from "./sections/CTASection";
import LandingNavbar from "./components/LandingNavbar";
import LandingFooter from "./components/LandingFooter";

const LandingPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in, redirect to dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

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
        <LandingNavbar />
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
        <LandingFooter />
      </div>
    </div>
  );
};

export default LandingPage;
