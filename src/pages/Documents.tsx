
import React, { useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import { usePermissions } from "@/hooks/usePermissions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import DocumentsHeader from "@/components/documents/DocumentsHeader";
import DocumentTabs from "@/components/documents/DocumentTabs";
import { mockDocuments, mockTemplates } from "@/components/documents/DocumentsData";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DocumentCard from '@/components/documents/DocumentCard';

const Documents = () => {
  const [filterSigned, setFilterSigned] = useState<'all' | 'signed' | 'unsigned'>('all');
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "todos",
    date: undefined as Date | undefined,
    tags: [] as string[]
  });
  const { hasPermission } = usePermissions();
  const canCreateDocument = hasPermission("documents", "create");
  
  const filteredDocuments = useMemo(() => {
    return mockDocuments.filter(doc => {
      const matchesSearch = 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        doc.folder.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.process.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filters.type === "todos" || (doc.type && doc.type.toLowerCase() === filters.type);
      
      const matchesDate = !filters.date || 
        new Date(doc.updatedAt).toDateString() === filters.date.toDateString();
      
      const matchesTags = filters.tags.length === 0 || 
        (doc.tags && filters.tags.every(tag => doc.tags?.includes(tag)));

      return matchesSearch && matchesType && matchesDate && matchesTags;
    });
  }, [searchTerm, filters, mockDocuments]);

  const filteredTemplates = useMemo(() => {
    return mockTemplates.filter(
      template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Component that shows the documents filtering by signature status
  const FilteredDocumentsView = () => {
    const docsToShow = filterSigned === 'all' 
      ? filteredDocuments 
      : filteredDocuments.filter(doc => {
          // Assuming you have a 'signed' property in your document objects
          const isSigned = doc.status === 'signed'; // Adjust based on your actual data structure
          return filterSigned === 'signed' ? isSigned : !isSigned;
        });
    
    return (
      <>
        <div className="mb-4 flex gap-2">
          <Select onValueChange={(v) => setFilterSigned(v as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado de Assinatura" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="signed">Assinados</SelectItem>
              <SelectItem value="unsigned">Por assinar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {docsToShow.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      </>
    );
  };

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-4 sm:p-2 md:p-6 lg:p-8">
          <DocumentsHeader canCreateDocument={canCreateDocument} />
          <DocumentTabs 
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredDocuments={filteredDocuments}
            filteredTemplates={filteredTemplates}
            filters={filters}
            setFilters={setFilters}
          />
          
          {/* You can use the FilteredDocumentsView component here if needed */}
          {/* <FilteredDocumentsView /> */}
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Documents;
