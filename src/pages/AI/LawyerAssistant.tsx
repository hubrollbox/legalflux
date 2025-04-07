
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/PageTransition';
import ContextualAssistantTab from './components/ContextualAssistantTab';
import ResearchTab from './components/ResearchTab';
import DocumentTab from './components/DocumentTab';
import AnalysisTab from './components/AnalysisTab';

const LawyerAssistant = () => {
  const [activeTab, setActiveTab] = useState('assistant');

  return (
    <PageTransition>
      <div className="container mx-auto pb-8">
        <h1 className="text-2xl font-bold mb-6">Assistente Jurídico para Advogados</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="assistant">
              Assistente
            </TabsTrigger>
            <TabsTrigger value="research">
              Pesquisa Jurídica
            </TabsTrigger>
            <TabsTrigger value="document">
              Redação de Documentos
            </TabsTrigger>
            <TabsTrigger value="analysis">
              Análise de Documentos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="assistant" className="mt-0">
            <ContextualAssistantTab />
          </TabsContent>
          
          <TabsContent value="research" className="mt-0">
            <ResearchTab />
          </TabsContent>
          
          <TabsContent value="document" className="mt-0">
            <DocumentTab />
          </TabsContent>
          
          <TabsContent value="analysis" className="mt-0">
            <AnalysisTab />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default LawyerAssistant;
