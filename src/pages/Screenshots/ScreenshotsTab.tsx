
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScreenshotCard } from "./ScreenshotCard";

const screenshots = [
  {
    title: "Painel de Controlo",
    description: "Visão geral da plataforma com todas as informações relevantes.",
    imageSrc: "/lovable-uploads/7d5dafdf-943b-4a8b-96ee-92d8df87460b.png",
    imageAlt: "Painel de Controlo da Plataforma"
  },
  {
    title: "Gestão de Processos",
    description: "Interface intuitiva para gestão de todos os processos jurídicos.",
    imageSrc: "/lovable-uploads/7d5dafdf-943b-4a8b-96ee-92d8df87460b.png",
    imageAlt: "Gestão de Processos"
  },
  {
    title: "Gestão Documental",
    description: "Sistema completo para organização e controlo de documentos.",
    imageSrc: "/lovable-uploads/7d5dafdf-943b-4a8b-96ee-92d8df87460b.png",
    imageAlt: "Documentos"
  },
  {
    title: "Agenda e Prazos",
    description: "Calendário interativo para gestão de prazos processuais.",
    imageSrc: "/lovable-uploads/7d5dafdf-943b-4a8b-96ee-92d8df87460b.png",
    imageAlt: "Calendário"
  },
  {
    title: "Gestão de Utilizadores",
    description: "Controlo granular de permissões e perfis de acesso.",
    imageSrc: "/lovable-uploads/7d5dafdf-943b-4a8b-96ee-92d8df87460b.png",
    imageAlt: "Utilizadores"
  },
  {
    title: "Gestão Financeira",
    description: "Controlo completo das finanças do escritório.",
    imageSrc: "/lovable-uploads/5f9e9260-2a46-4bc3-a26b-93a0e41be3d6.png",
    imageAlt: "Análise Financeira"
  }
];

const ScreenshotsTab = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenshots.map((screenshot, index) => (
          <ScreenshotCard
            key={index}
            title={screenshot.title}
            description={screenshot.description}
            imageSrc={screenshot.imageSrc}
            imageAlt={screenshot.imageAlt}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button onClick={() => navigate("/register")} size="lg" className="bg-highlight hover:bg-highlight/90">
          Experimente Gratuitamente
        </Button>
      </div>
    </>
  );
};

export default ScreenshotsTab;
