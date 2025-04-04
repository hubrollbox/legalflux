import React from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

const TutorialsTab = () => {
  const tutorials = [
    {
      title: "Introdução ao Portal do Cliente",
      duration: "5 min"
    },
    {
      title: "Gestão de Processos Jurídicos",
      duration: "8 min"
    },
    {
      title: "Comunicação com Advogados",
      duration: "4 min"
    },
    {
      title: "Upload de Documentos",
      duration: "3 min"
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Tutoriais em Vídeo</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {tutorials.map((tutorial, index) => (
          <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
            <div>
              <h4 className="font-medium">{tutorial.title}</h4>
              <p className="text-sm text-gray-500">{tutorial.duration}</p>
            </div>
            <Button variant="ghost" size="icon">
              <PlayCircle className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialsTab;