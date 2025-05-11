
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PageTransition from '@/components/PageTransition';
import { mockTemplates } from '@/components/documents/DocumentsData';
import TemplatesContent from '@/components/documents/TemplatesContent';
import { DocumentType } from "@/types/document";

// Filter types for the templates
type FilterType = 'all' | 'contracts' | 'petitions' | 'proceedings' | 'other';

const DocumentTypes = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterType>('all');

  // Filter templates based on search term and category filter
  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (template.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'contracts' && template.category.toLowerCase().includes('contrato')) ||
      (filter === 'petitions' && template.category.toLowerCase().includes('petição')) ||
      (filter === 'proceedings' && template.category.toLowerCase().includes('processo')) ||
      (filter === 'other' && !['contrato', 'petição', 'processo'].some(
        cat => template.category.toLowerCase().includes(cat)
      ));
    
    return matchesSearch && matchesFilter;
  });

  // Format templates to match what TemplatesContent expects
  const formattedTemplates = filteredTemplates.map(template => ({
    id: template.id,
    name: template.name,
    description: template.description || '',
    category: template.category,
    type: template.type,
    updatedAt: template.updatedAt ? 
      (template.updatedAt instanceof Date ? template.updatedAt.toISOString() : String(template.updatedAt)) 
      : new Date().toISOString(),
    size: typeof template.size === 'number' ? `${template.size} KB` : (template.size?.toString() || "1MB")
  }));

  return (
    <PageTransition>
      <div className="space-y-6">
        <DocumentTypesHeader 
          setSearchTerm={setSearchTerm} 
          searchTerm={searchTerm} 
          viewMode={viewMode}
          setViewMode={setViewMode}
          filter={filter}
          setFilter={setFilter}
        />
        
        <TemplatesContent 
          templates={formattedTemplates} 
          viewMode={viewMode} 
        />
      </div>
    </PageTransition>
  );
};

// Header component with search and filters
interface DocumentTypesHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

const DocumentTypesHeader: React.FC<DocumentTypesHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  filter,
  setFilter
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Modelos de Documentos</CardTitle>
        <CardDescription>
          Utilize estes modelos para criar novos documentos para os seus processos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Pesquisar modelos..."
              className="w-full px-3 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-sm ${filter === 'all' ? 'bg-primary text-white' : 'bg-background'}`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter('contracts')}
                className={`px-3 py-1.5 text-sm ${filter === 'contracts' ? 'bg-primary text-white' : 'bg-background'}`}
              >
                Contratos
              </button>
              <button
                onClick={() => setFilter('petitions')}
                className={`px-3 py-1.5 text-sm ${filter === 'petitions' ? 'bg-primary text-white' : 'bg-background'}`}
              >
                Petições
              </button>
              <button
                onClick={() => setFilter('proceedings')}
                className={`px-3 py-1.5 text-sm ${filter === 'proceedings' ? 'bg-primary text-white' : 'bg-background'}`}
              >
                Processos
              </button>
              <button
                onClick={() => setFilter('other')}
                className={`px-3 py-1.5 text-sm ${filter === 'other' ? 'bg-primary text-white' : 'bg-background'}`}
              >
                Outros
              </button>
            </div>
            
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 text-sm ${viewMode === "grid" ? 'bg-primary text-white' : 'bg-background'}`}
              >
                Grelha
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 text-sm ${viewMode === "list" ? 'bg-primary text-white' : 'bg-background'}`}
              >
                Lista
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentTypes;
