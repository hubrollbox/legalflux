
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import DocumentsSearchBar from "./DocumentsSearchBar";
import DocumentsViewMode from "./DocumentsViewMode";
import DocumentsContent from "./DocumentsContent";
import TemplatesContent from "./TemplatesContent";
import { Document, DocumentTemplate, DocumentType, DocumentFilter } from "@/types/document";

interface DocumentTabsProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: DocumentFilter;
  setFilters: (filters: DocumentFilter) => void;
  filteredDocuments: Document[];
  filteredTemplates: DocumentTemplate[];
}

const DocumentTabs: React.FC<DocumentTabsProps> = ({
  viewMode,
  setViewMode,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  filteredDocuments = [],
  filteredTemplates = []
}) => {
  // Convert template objects to match the expected format in TemplatesContent
  const formattedTemplates = filteredTemplates.map(template => ({
    id: template.id,
    name: template.name,
    description: template.description || '',
    category: template.category || '',
    type: template.type,
    createdAt: template.createdAt,
    updatedAt: template.updatedAt || template.createdAt,
    tags: template.tags || [],
    size: typeof template.size === 'number' ? `${template.size} KB` : (template.size?.toString() || "1MB"),
  }));

  // Ensure updatedAt is always a string for the TemplatesContent component
  const templateFormatted = formattedTemplates.map(template => ({
    ...template,
    updatedAt: template.updatedAt instanceof Date ? template.updatedAt.toISOString() : template.updatedAt
  }));

  return (
    <Tabs defaultValue="all" className="mb-6">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="templates" className="relative">
            Templates
            <Badge variant="secondary" className="ml-1 bg-accent text-white absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
              {filteredTemplates.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="recent">Recentes</TabsTrigger>
          <TabsTrigger value="shared">Partilhados</TabsTrigger>
          <TabsTrigger value="deleted">Eliminados</TabsTrigger>
        </TabsList>
        <DocumentsViewMode viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      
      <DocumentsSearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
      />

      <TabsContent value="all" className="mt-6">
        <DocumentsContent
          title="Todos os Documentos"
          description={`${filteredDocuments.length} documento(s) encontrado(s)`}
          documents={filteredDocuments}
          viewMode={viewMode}
        />
      </TabsContent>
      
      <TabsContent value="templates" className="mt-6">
        <TemplatesContent 
          templates={templateFormatted} 
          viewMode={viewMode} 
        />
      </TabsContent>
      
      <TabsContent value="recent">
        <Card>
          <CardHeader>
            <CardTitle>Documentos Recentes</CardTitle>
            <CardDescription>
              Documentos atualizados nas últimas 72 horas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Esta secção mostrará os documentos mais recentemente modificados.
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="shared">
        <Card>
          <CardHeader>
            <CardTitle>Documentos Partilhados</CardTitle>
            <CardDescription>
              Documentos partilhados consigo por outros utilizadores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Esta secção mostrará os documentos partilhados com o utilizador.
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="deleted">
        <Card>
          <CardHeader>
            <CardTitle>Documentos Eliminados</CardTitle>
            <CardDescription>
              Documentos na reciclagem (serão eliminados permanentemente após 30 dias)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Esta secção mostrará os documentos que foram eliminados e podem ser recuperados.
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentTabs;
