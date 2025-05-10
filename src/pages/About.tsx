import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";

interface ProgressProps {
  percentage: number;
  description: string;
}

const Progress: React.FC<ProgressProps> = ({ percentage, description }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{description}</span>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-highlight h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader
          title="Sobre o LegalFlux"
          description="Conheça mais sobre a plataforma e suas funcionalidades"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Nossa Missão</h2>
          <p className="text-gray-600 mb-4">
            O LegalFlux foi criado com a missão de simplificar a gestão de escritórios de advocacia,
            permitindo que advogados e suas equipes foquem no que realmente importa: oferecer
            serviços jurídicos de excelência aos seus clientes.
          </p>
          <p className="text-gray-600">
            Através de uma plataforma intuitiva e completa, buscamos transformar a maneira como os
            profissionais do direito gerenciam seus processos, documentos e relacionamentos com
            clientes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Desenvolvimento Contínuo</h2>
          <p className="text-gray-600 mb-4">
            Estamos constantemente aprimorando o LegalFlux com base no feedback dos nossos usuários
            e nas tendências do mercado jurídico.
          </p>
          <h3 className="font-semibold mt-4 mb-2">Progresso do Roadmap 2023</h3>
          <Progress percentage={100} description="Gestão de Processos" />
          <Progress percentage={85} description="Automação de Documentos" />
          <Progress percentage={70} description="Integração com Tribunais" />
          <Progress percentage={60} description="Análise de Dados Avançada" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Recursos Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Gestão de Processos</h3>
              <p className="text-gray-600">
                Acompanhe todos os seus processos em um só lugar, com alertas de prazos e
                organização intuitiva.
              </p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Automação de Documentos</h3>
              <p className="text-gray-600">
                Crie modelos e gere documentos automaticamente, economizando tempo e reduzindo
                erros.
              </p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Gestão Financeira</h3>
              <p className="text-gray-600">
                Controle faturamento, honorários e despesas com relatórios detalhados e
                visualização clara.
              </p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Portal do Cliente</h3>
              <p className="text-gray-600">
                Ofereça aos seus clientes acesso seguro aos seus processos e documentos.
              </p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Agenda Integrada</h3>
              <p className="text-gray-600">
                Sincronize compromissos, audiências e prazos com seu calendário pessoal.
              </p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Assistente IA</h3>
              <p className="text-gray-600">
                Utilize inteligência artificial para pesquisas jurídicas e análise de documentos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Nossa Equipe</h2>
        <p className="text-gray-600 mb-6">
          O LegalFlux é desenvolvido por uma equipe multidisciplinar de profissionais com
          experiência em direito, tecnologia e design de produto.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-2"></div>
            <h3 className="font-semibold">Ana Silva</h3>
            <p className="text-gray-600">CEO & Advogada</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-2"></div>
            <h3 className="font-semibold">Pedro Santos</h3>
            <p className="text-gray-600">CTO</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-2"></div>
            <h3 className="font-semibold">Marta Costa</h3>
            <p className="text-gray-600">UX Designer</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-2"></div>
            <h3 className="font-semibold">João Pereira</h3>
            <p className="text-gray-600">Desenvolvedor</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default About;
