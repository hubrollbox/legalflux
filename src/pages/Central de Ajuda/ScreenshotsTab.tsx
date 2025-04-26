import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ScreenshotsTab = () => {
  const screenshots = [
    {
      title: "Dashboard Principal",
      description: "Visão geral dos seus processos jurídicos",
      image: "/screenshots/dashboard.png"
    },
    {
      title: "Gestão de Processos",
      description: "Detalhes e acompanhamento de cada processo",
      image: "/screenshots/processes.png"
    },
    {
      title: "Comunicação",
      description: "Troca de mensagens com sua equipe jurídica",
      image: "/screenshots/messaging.png"
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Screenshots da Plataforma</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {screenshots.map((screenshot, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{screenshot.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Image 
                src={screenshot.image} 
                alt={screenshot.title}
                width={400}
                height={300}
                className="rounded-md border w-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=LegalFlux+Screenshot";
                }}
              />
              <p className="text-sm text-gray-600">{screenshot.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScreenshotsTab;
