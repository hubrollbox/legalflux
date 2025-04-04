
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/layout/SectionHeader";
import ScreenshotsTab from "./ScreenshotsTab"; // Adjust the path if necessary
import SupportTab from "./SupportTab";
import FaqsTab from "@/components/tabs/FaqsTab";
import DocumentationTab from "./DocumentationTab"; // Adjust the path if necessary
import TutorialsTab from "./TutorialsTab";
import LandingNavbar from "../landing/components/LandingNavbar";
import LandingFooter from "../landing/components/LandingFooter";

// Ensure DocumentationTab is imported only once
// Ensure the file DocumentationTab.tsx exists at the specified path

const Screenshots = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingNavbar />
      
      <main className="flex-1 container mx-auto py-12 px-4">
        <SectionHeader
          title="Central de Ajuda"
          description="Encontre toda a informação necessária para utilizar a plataforma LegalFlux"
        />

        <Tabs defaultValue="support" className="mt-8">
          <TabsList className="grid w-full md:w-[600px] grid-cols-5">
            <TabsTrigger value="support">Suporte</TabsTrigger>
            <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="tutorials">Tutoriais</TabsTrigger>
            <TabsTrigger value="documentation">Documentação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="support" className="mt-6">
            <SupportTab />
          </TabsContent>
          
          <TabsContent value="screenshots" className="mt-6">
            <ScreenshotsTab />
          </TabsContent>

          <TabsContent value="faqs" className="mt-6">
            <FaqsTab />
          </TabsContent>

          <TabsContent value="tutorials" className="mt-6">
            <TutorialsTab />
          </TabsContent>

          <TabsContent value="documentation" className="mt-6">
            <DocumentationTab />
          </TabsContent>
        </Tabs>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default Screenshots;
