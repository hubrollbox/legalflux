
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import { usePermissions } from "@/hooks/usePermissions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import DocumentsHeader from "@/components/documents/DocumentsHeader";
import DocumentTabs from "@/components/documents/DocumentTabs";
import { mockDocuments, mockTemplates } from "@/components/documents/DocumentsData";

const Documents = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const { hasPermission } = usePermissions();
  const canCreateDocument = hasPermission("documents", "create");
  
  const filteredDocuments = mockDocuments.filter(
    doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.folder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.process.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTemplates = mockTemplates.filter(
    template => 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-4 sm:p-2 md:p-6 lg:p-8"> // Ajuste de padding para responsividade
          <DocumentsHeader canCreateDocument={canCreateDocument} />
          <DocumentTabs 
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredDocuments={filteredDocuments}
            filteredTemplates={filteredTemplates}
          />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Documents;
