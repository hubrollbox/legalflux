
import React from "react";
import { ExternalLink } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";

const LINKS_CATEGORIES = [
  {
    name: "Tribunais",
    links: [
      { name: "Supremo Tribunal de Justiça", url: "https://www.stj.pt/" },
      { name: "Supremo Tribunal Administrativo", url: "https://www.stadministrativo.pt/" },
      { name: "Tribunal Constitucional", url: "https://www.tribunalconstitucional.pt/" },
      { name: "Tribunais Judiciais", url: "https://tribunais.org.pt/" },
    ]
  },
  {
    name: "Entidades Reguladoras",
    links: [
      { name: "Ordem dos Advogados", url: "https://portal.oa.pt/" },
      { name: "Direcção-Geral da Administração da Justiça", url: "https://dgaj.justica.gov.pt/" },
      { name: "Direcção-Geral da Política de Justiça", url: "https://dgpj.justica.gov.pt/" },
      { name: "Procuradoria-Geral da República", url: "https://www.ministeriopublico.pt/" },
    ]
  },
  {
    name: "Bases de Dados Jurídicas",
    links: [
      { name: "Diário da República Eletrónico", url: "https://dre.pt/" },
      { name: "Base Jurídico-Documental", url: "https://jusnet.pt/" },
      { name: "DIGESTO", url: "https://www.dgsi.pt/" },
      { name: "Base de Dados Jurídicas", url: "https://www.datajuris.pt/" },
    ]
  },
  {
    name: "Instituições de Ensino",
    links: [
      { name: "Centro de Estudos Judiciários", url: "https://www.cej.mj.pt/" },
      { name: "Faculdade de Direito da Universidade de Lisboa", url: "https://www.fd.ulisboa.pt/" },
      { name: "Faculdade de Direito da Universidade de Coimbra", url: "https://www.uc.pt/fduc/" },
      { name: "Faculdade de Direito da Universidade do Porto", url: "https://www.direito.up.pt/" },
    ]
  },
  {
    name: "Portais de Serviços",
    links: [
      { name: "Portal CITIUS", url: "https://citius.tribunaisnet.mj.pt/" },
      { name: "Portal das Finanças", url: "https://www.portaldasfinancas.gov.pt/" },
      { name: "Segurança Social Direta", url: "https://app.seg-social.pt/" },
      { name: "ePortugal", url: "https://eportugal.gov.pt/" },
    ]
  },
];

const UsefulLinks = () => {
  const [newLink, setNewLink] = useState({ name: "", url: "" });
  const [links, setLinks] = useState(LINKS_CATEGORIES);

  const handleAddLink = () => {
    if (newLink.name && newLink.url) {
      setLinks((prevLinks) => [
        ...prevLinks,
        { name: "Custom Links", links: [newLink] },
      ]);
      setNewLink({ name: "", url: "" });
    }
  };

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Links Úteis</h1>
            <p className="text-muted-foreground">
              Uma coleção de links para sites e recursos relacionados ao sistema judicial português.
            </p>
          </div>
          <div className="mb-8">
            <input
              type="text"
              placeholder="Nome do Link"
              value={newLink.name}
              onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="url"
              placeholder="URL do Link"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <button
              onClick={handleAddLink}
              className="bg-primary text-white p-2 w-full"
            >
              Adicionar Link
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((category) => (
              <Card key={category.name} className="p-5">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b">{category.name}</h2>
                <ul className="space-y-3">
                  {category.links.map((link) => (
                    <li key={link.name} className="flex items-start">
                      <ExternalLink className="shrink-0 h-5 w-5 mr-2 mt-1 text-primary" />
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default UsefulLinks;
