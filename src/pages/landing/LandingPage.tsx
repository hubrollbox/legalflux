
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
    <div className="flex flex-col min-h-screen bg-white">

      <LandingNavbar />
      <main className="flex flex-col flex-1 bg-white text-gray-900">
        <div className="container mx-auto px-4 py-16">
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <TestimonialsSection />
          <CTASection />
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
