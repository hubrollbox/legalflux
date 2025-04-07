
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
  }>;
  viewMode: "grid" | "list";
}

const DocumentsContent: React.FC<DocumentsContentProps> = ({ 
  title, 
  description, 
  documents, 
  viewMode 
}) => {
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
            {documents.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        ) : (
          <DocumentList documents={documents} />
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentsContent;
