import * as React from "react";
// import { motion } from "framer-motion";
import LandingNavbar from "./landing/components/LandingNavbar";
import HeroSection from "./landing/sections/HeroSection";
import FeaturesSection from "./landing/sections/FeaturesSection";
import TestimonialsSection from "./landing/sections/TestimonialsSection";
import CTASection from "./landing/sections/CTASection";
import LandingFooter from "./landing/components/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}