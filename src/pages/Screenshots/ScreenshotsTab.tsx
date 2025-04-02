
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScreenshotCard } from "./ScreenshotCard";

const screenshots = [
  {
    title: "Dashboard Principal",
    description: "Visão geral da plataforma com todas as informações relevantes.",
    imageSrc: "/placeholder.svg",
    imageAlt: "Dashboard da Plataforma"
  },
  {
    title: "Gestão de Processos",
    description: "Interface intuitiva para gestão de todos os processos jurídicos.",
    imageSrc: "/placeholder.svg",
    imageAlt: "Gestão de Processos"
  },
  {
    title: "Gestão Documental",
    description: "Sistema completo para organização e controlo de documentos.",
    imageSrc: "/placeholder.svg",
    imageAlt: "Documentos"
  },
  {
    title: "Agenda e Prazos",
    description: "Calendário interativo para gestão de prazos processuais.",
    imageSrc: "/placeholder.svg",
    imageAlt: "Calendário"
  },
  {
    title: "Gestão de Utilizadores",
    description: "Controlo granular de permissões e perfis de acesso.",
    imageSrc: "/placeholder.svg",
    imageAlt: "Utilizadores"
  },
  {
    title: "Gestão Financeira",
    description: "Controlo completo das finanças do escritório.",
    imageSrc: "/placeholder.svg",
    imageAlt: "Financeiro"
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
        <Button onClick={() => navigate("/register")} size="lg">
          Experimente Gratuitamente
        </Button>
      </div>
    </>
  );
};

export default ScreenshotsTab;
