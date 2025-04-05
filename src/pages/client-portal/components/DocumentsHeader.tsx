
import React from 'react';

interface DocumentsHeaderProps {
  title?: string;
  description?: string;
}

export const DocumentsHeader: React.FC<DocumentsHeaderProps> = ({ 
  title = "Documentos", 
  description = "Gerencie todos os documentos relacionados aos seus processos jurídicos." 
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
