
import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import SectionHeader from "../components/layout/SectionHeader";
import { Container } from "../components/ui/container";

const Analytics: React.FC = () => {
  return (
    <DashboardLayout>
      <Container>
        <SectionHeader 
          title="Análise de Dados" 
          description="Visualize e analise os dados do seu escritório jurídico"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Processos por Estado</h3>
            <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
              Gráfico de Processos
            </div>
          </div>
          
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Faturação Mensal</h3>
            <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
              Gráfico de Faturação
            </div>
          </div>
          
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Tempo por Cliente</h3>
            <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
              Gráfico de Tempo
            </div>
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default Analytics;
