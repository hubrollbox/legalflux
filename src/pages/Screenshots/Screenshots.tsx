
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/layout/SectionHeader";
import ScreenshotsTab from "./ScreenshotsTab";
import SupportTab from "./SupportTab";
import LandingNavbar from "../landing/components/LandingNavbar";
import LandingFooter from "../landing/components/LandingFooter";

const Screenshots = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingNavbar />
      
      <main className="flex-1 container mx-auto py-12 px-4">
        <SectionHeader
          title="Screenshots e Suporte"
          description="Conheça a plataforma LegalFlux e encontre o suporte técnico necessário"
        />

        <Tabs defaultValue="screenshots" className="mt-8">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="screenshots">Capturas de Ecrã</TabsTrigger>
            <TabsTrigger value="support">Suporte Técnico</TabsTrigger>
          </TabsList>
          
          <TabsContent value="screenshots" className="mt-6">
            <ScreenshotsTab />
          </TabsContent>
          
          <TabsContent value="support" className="mt-6">
            <SupportTab />
          </TabsContent>
        </Tabs>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default Screenshots;
