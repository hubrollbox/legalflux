import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DocumentationTab = () => {
  const sections = [
    {
      title: "Arquitetura Técnica",
      content: "Plataforma desenvolvida em React com TypeScript no frontend e Node.js no backend"
    },
    {
      title: "Segurança",
      content: "Todos os dados são encriptados em trânsito e em repouso. Autenticação via JWT com 2FA"
    },
    {
      title: "API",
      content: "Documentação completa da API disponível para desenvolvedores em api.legalflux.pt/docs"
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Documentação Técnica</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentationTab;