
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import DocumentCard from "./DocumentCard";
import DocumentList from "./DocumentList";
import { Document } from "@/types/document";

interface DocumentsContentProps {
  title: string;
  description: string;
  documents: Document[];
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

  // Função para converter documentos para o formato correto
  const formatDocumentForCards = (doc: Document) => {
    return {
      id: doc.id,
      name: doc.name,
      title: doc.title,
      type: doc.type,
      // Ensure size is a string (for display purposes)
      size: typeof doc.size === 'number' ? `${doc.size} KB` : (doc.size?.toString() || "0 KB"),
      // Ensure updatedAt is in the correct format
      updatedAt: doc.updatedAt ? doc.updatedAt : doc.createdAt,
      owner: doc.owner || "",
      folder: doc.folder || "",
      process: doc.process || "",
      description: doc.description,
      tags: doc.tags,
      fileUrl: doc.url
    };
  };

  const formattedDocuments = safeDocuments.map(doc => formatDocumentForCards(doc));

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
            {formattedDocuments.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        ) : (
          <DocumentList documents={formattedDocuments} />
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentsContent;
