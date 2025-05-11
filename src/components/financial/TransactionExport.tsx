
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface TransactionExportProps {
  onExport: (format: 'csv' | 'pdf' | 'excel') => void;
}

const TransactionExport: React.FC<TransactionExportProps> = ({ onExport }) => {
  return (
    <div className="mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onExport('csv')}>CSV</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('pdf')}>PDF</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('excel')}>Excel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TransactionExport;
