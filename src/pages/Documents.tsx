
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Documents = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader
          title="Documentos"
          description="Gerencie todos os seus documentos jurídicos"
        />
        <Button className="bg-highlight hover:bg-highlight/90">
          <Upload className="mr-2 h-4 w-4" /> Carregar Documento
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Documentos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Aqui serão listados todos os seus documentos. Utilize o botão acima para carregar um novo documento.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Documents;
