
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import DocumentCard from "./DocumentCard";
import DocumentList from "./DocumentList";

interface DocumentsContentProps {
  title: string;
  description: string;
  documents: Array<{
    id: string;
    name: string;
    type: "document" | "action" | "precedent" | "strategy";
    size: string;
    updatedAt: Date;
    owner: string;
    folder: string;
    process: string;
    tags?: string[];
    status?: string;
  }>;
  viewMode: "grid" | "list";
}

const DocumentsContent: React.FC<DocumentsContentProps> = ({ 
  title, 
  description, 
  documents, 
  viewMode 
}) => {
  // Certifique-se de que documents nunca seja undefined
  const safeDocuments = documents || [];
  
  // Se não houver documentos, mostra uma mensagem
  if (safeDocuments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Nenhum documento encontrado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Não foram encontrados documentos com os critérios de busca atuais.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="">
      <CardHeader className="">
        <CardTitle className="">{title}</CardTitle>
        <CardDescription className="">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {safeDocuments.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        ) : (
          <DocumentList documents={safeDocuments.map(doc => ({
            ...doc,
            updatedAt: doc.updatedAt.toISOString()
          }))} />
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentsContent;
