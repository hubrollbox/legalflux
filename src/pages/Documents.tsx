import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal"; // Corrected path for the Modal component
import { Input } from "@/components/ui/input"; // Supondo que exista um componente Input

const Documents = () => {
  const [documents, setDocuments] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState("");

  const handleUpload = () => {
    if (newDocument.trim()) {
      setDocuments([...documents, newDocument]);
      setNewDocument("");
      setIsModalOpen(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader
          title="Documentos"
          description="Gerencie todos os seus documentos jurídicos"
        />
        <Button
          className="bg-highlight hover:bg-highlight/90"
          onClick={() => setIsModalOpen(true)}
        >
          <Upload className="mr-2 h-4 w-4" /> Carregar Documento
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Documentos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length > 0 ? (
            <ul className="list-disc pl-5">
              {documents.map((doc, index) => (
                <li key={index} className="text-gray-700">
                  {doc}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              Aqui serão listados todos os seus documentos. Utilize o botão acima para carregar um novo documento.
            </p>
          )}
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold">Carregar Documento</h2>
          <Input
            value={newDocument}
            onChange={(e) => setNewDocument(e.target.value)}
            placeholder="Nome do documento"
            className="mt-4"
          />
          <Button
            className="mt-4 bg-highlight hover:bg-highlight/90"
            onClick={handleUpload}
          >
            Enviar
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Documents;
