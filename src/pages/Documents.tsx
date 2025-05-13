
import React, { useState, useMemo } from 'react';
import DocumentTabs from '@/components/documents/DocumentTabs';
import DocumentsHeader from '@/components/documents/DocumentsHeader';
import type { Document, DocumentFilter, DocumentTemplate } from '@/types/document';
import { mockDocuments } from '@/components/documents/DocumentsData'; // Import mock data
import { mockTemplates } from '@/components/documents/DocumentsData';
import PageTransition from '@/components/PageTransition';
import { Toaster } from "sonner";

const Documents: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [templates, setTemplates] = useState<DocumentTemplate[]>(mockTemplates);
  const [filters, setFilters] = useState<DocumentFilter>({ type: "todos", date: undefined, tags: [] });

  return (
    <>
      <Toaster position="top-right" richColors />
    </>
  );

  // Filter documents based on search term and filter options
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      // Filter by search term
      const matchesSearch = 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (doc.description || '').toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by document type
      const matchesType = 
        filters.type === "todos" || 
        doc.type === filters.type;

      // Filter by date if a date filter is provided
      const matchesDate = 
        !filters.date ||
        new Date(doc.updatedAt).toDateString() === new Date(filters.date).toDateString();

      return matchesSearch && matchesType && matchesDate;
    });
  }, [documents, searchTerm, filters]);

  // Filter templates based on search term
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      return (
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (template.description || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [templates, searchTerm]);

  return (
    <PageTransition>
      <DocumentsHeader canCreateDocument={true} />
      <DocumentTabs
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        filteredDocuments={filteredDocuments}
        filteredTemplates={filteredTemplates}
      />
    </PageTransition>
  );
};

export default Documents;
