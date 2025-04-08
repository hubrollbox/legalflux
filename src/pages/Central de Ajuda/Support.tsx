import React from 'react';
import LandingNavbar from "@/pages/landing/components/LandingNavbar";
import LandingFooter from "@/pages/landing/components/LandingFooter";
import { Container } from "@/components/ui/container";

const Support = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <div className="flex-grow pt-24 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Suporte</h1>
            <p className="text-lg text-muted-foreground mb-8">Bem-vindo à página de suporte. Aqui você pode encontrar ajuda e recursos para utilizar o LegalFlux.</p>
            
            <div className="space-y-8">
              <div className="bg-card rounded-lg p-6 border">
                <h2 className="text-xl font-semibold mb-4">Como podemos ajudar?</h2>
                <p className="mb-4">Nossa equipe de suporte está disponível para ajudar com qualquer dúvida ou problema que você possa ter.</p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Suporte por Email</h3>
                    <p className="text-sm text-muted-foreground mb-2">Para questões não urgentes</p>
                    <p className="text-primary">suporte@legalflux.pt</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Suporte por Telefone</h3>
                    <p className="text-sm text-muted-foreground mb-2">Para assistência imediata</p>
                    <p className="text-primary">+351 220 145 169</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <LandingFooter />
    </div>
  );
};

export default Support;