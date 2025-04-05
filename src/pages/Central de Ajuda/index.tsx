
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import { ArrowRight } from "lucide-react";
import LandingNavbar from "@/pages/landing/components/LandingNavbar";
import LandingFooter from "@/pages/landing/components/LandingFooter";
import ScreenshotsTab from "./ScreenshotsTab";
import SupportTab from "./SupportTab";

const Screenshots = () => {
  const [activeTab, setActiveTab] = useState("screenshots");

  return (
    <PageTransition>
      <LandingNavbar />
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Explore o LegalFlux</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Conheça a interface intuitiva do LegalFlux e descubra como a nossa plataforma pode transformar a gestão do seu escritório.
              </p>
            </div>

            <Tabs
              defaultValue="screenshots"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-12"
            >
              <div className="flex justify-center mb-8">
                <TabsList className="bg-white border grid grid-cols-5">
                  <TabsTrigger value="faqs" className="px-4">
                    FAQs
                  </TabsTrigger>
                  <TabsTrigger value="tutorials" className="px-4">
                    Tutoriais
                  </TabsTrigger>
                  <TabsTrigger value="documentation" className="px-4">
                    Documentação
                  </TabsTrigger>
                  <TabsTrigger value="screenshots" className="px-4">
                    Screenshots
                  </TabsTrigger>
                  <TabsTrigger value="support" className="px-4">
                    Suporte
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="faqs">
                {/* TODO: Import and implement FaqsTab component */}
                <div>FAQs Content Coming Soon</div>
              </TabsContent>
              <TabsContent value="tutorials">
{/* TODO: Import and implement TutorialsTab component */}
<div>Tutorials Content Coming Soon</div>
              </TabsContent>
              <TabsContent value="documentation">
{/* TODO: Import and implement DocumentationTab component */}
<div>Documentation Content Coming Soon</div>
              </TabsContent>
              <TabsContent value="screenshots">
                <ScreenshotsTab />
              </TabsContent>
              <TabsContent value="support">
                <SupportTab />
              </TabsContent>
            </Tabs>

            <div className="text-center mt-16 py-10 px-6 bg-primary text-white rounded-xl">
              <h2 className="text-2xl font-bold mb-4">
                Pronto para experimentar o LegalFlux?
              </h2>
              <p className="mb-6 max-w-2xl mx-auto">
                Registe-se hoje para uma versão de avaliação gratuita e descubra como o LegalFlux pode transformar a gestão do seu escritório.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="text-primary hover:bg-accent hover:text-accent-foreground"
                onClick={() => window.location.href = "/register"}
              >
                Comece Gratuitamente <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <LandingFooter />
    </PageTransition>
  );
};

export default Screenshots;
