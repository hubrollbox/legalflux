
import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import DocumentsSearchBar from "./DocumentsSearchBar";
import DocumentsViewMode from "./DocumentsViewMode";
import DocumentsContent from "./DocumentsContent";
import TemplatesContent from "./TemplatesContent";
import type { Document as DocumentType } from "@/types/document";

interface DocumentTabsProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: {
    type?: string;
    date?: Date;
    tags?: string[];
  };
  setFilters: (filters: any) => void;
  filteredDocuments: DocumentType[];
  filteredTemplates: Array<{
    id: string;
    name: string;
    type: "document" | "action" | "precedent" | "strategy";
    size?: string;
    description?: string;
    updatedAt?: string | Date;
    category?: string;
    tags?: string[];
  }>;
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
          documents={filteredDocuments.map(doc => ({
            ...doc,
            status: doc.status ?? "draft",
            updatedAt: doc.updatedAt ?? new Date(),
            tags: doc.tags ?? [],
            type: doc.type ?? "document"
          }))}
          viewMode={viewMode}
        />
      </TabsContent>
      <TabsContent value="templates" className="mt-6">
        <TemplatesContent templates={filteredTemplates.map(template => ({
          ...template,
          updatedAt: template.updatedAt ?? new Date(),
          size: template.size ?? "-",
          description: template.description ?? "",
          category: template.category ?? "document",
          tags: template.tags ?? []
        }))} viewMode={viewMode} />
      </TabsContent>
      
      <TabsContent value="recent">
        <Card className="">
          <CardHeader className="">
            <CardTitle className="">Documentos Recentes</CardTitle>
            <CardDescription className="">
              Documentos atualizados nas últimas 72 horas
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <div className="text-center py-8 text-muted-foreground">
              Esta secção mostrará os documentos mais recentemente modificados.
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="shared">
        <Card className="">
          <CardHeader className="">
            <CardTitle className="">Documentos Partilhados</CardTitle>
            <CardDescription className="">
              Documentos partilhados consigo por outros utilizadores
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <div className="text-center py-8 text-muted-foreground">
              Esta secção mostrará os documentos partilhados com o utilizador.
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="deleted">
        <Card className="">
          <CardHeader className="">
            <CardTitle className="">Documentos Eliminados</CardTitle>
            <CardDescription className="">
              Documentos na reciclagem (serão eliminados permanentemente após 30 dias)
            </CardDescription>
          </CardHeader>
          <CardContent className="">
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
