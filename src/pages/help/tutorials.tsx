import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Tutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: "Como criar um novo documento",
      description: "Aprenda a criar e configurar novos documentos no sistema",
      videoUrl: "/videos/create-document.mp4",
      duration: "5:30"
    },
    {
      id: 2,
      title: "Como assinar documentos digitalmente",
      description: "Guia passo a passo para assinatura digital de documentos",
      videoUrl: "/videos/digital-signature.mp4",
      duration: "4:15"
    },
    {
      id: 3,
      title: "Gerenciando permissões de documentos",
      description: "Aprenda a controlar quem pode acessar seus documentos",
      videoUrl: "/videos/document-permissions.mp4",
      duration: "6:45"
    }
  ];

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-4 sm:p-2 md:p-6 lg:p-8">
          <h1 className="text-3xl font-bold mb-6">Tutoriais</h1>
          <p className="text-muted-foreground mb-8">
            Aprenda a utilizar todas as funcionalidades do LegalFlux com nossos tutoriais em vídeo.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground">Prévia do vídeo</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{tutorial.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{tutorial.duration}</span>
                    <button className="text-primary hover:underline">Assistir</button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Tutorials;