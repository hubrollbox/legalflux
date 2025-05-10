
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Card } from "@/components/ui/card";
import { AnalysisTab } from "./components/AnalysisTab";
import AssistantTab from "./components/AssistantTab";
import ContextualAssistantTab from "./components/ContextualAssistantTab";

const LawyerAssistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState("assistant");

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader
          title="Assistente Jurídico"
          description="Assistência jurídica com inteligência artificial"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="assistant">Assistente</TabsTrigger>
          <TabsTrigger value="contextual">Contextual</TabsTrigger>
          <TabsTrigger value="analysis">Análise</TabsTrigger>
        </TabsList>
        <TabsContent value="assistant" className="space-y-6">
          <Card>
            <AssistantTab />
          </Card>
        </TabsContent>
        <TabsContent value="contextual" className="space-y-6">
          <Card>
            <ContextualAssistantTab contextText="" />
          </Card>
        </TabsContent>
        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <AnalysisTab />
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default LawyerAssistant;
