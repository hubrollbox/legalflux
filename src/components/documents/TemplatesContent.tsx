
import React from "react";
import { FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import TemplateCard from "./TemplateCard";
import TemplateList from "./TemplateList";

interface TemplatesContentProps {
  templates: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    description: string;
    updatedAt: string;
    category: string;
  }>;
  viewMode: "grid" | "list";
}

const TemplatesContent: React.FC<TemplatesContentProps> = ({ templates, viewMode }) => {
  return (
    <Card className="border-2 border-accent shadow-md">
      <CardHeader className="bg-accent/5">
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-accent" />
          Templates de Documentos
        </CardTitle>
        <CardDescription className="">
          {templates.length} template(s) disponível(is) para utilização
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <TemplateList templates={templates} />
        )}
      </CardContent>
    </Card>
  );
};

export default TemplatesContent;
