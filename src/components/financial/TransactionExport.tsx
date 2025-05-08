
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

interface TransactionExportProps {
  onExport: (format: 'csv' | 'pdf' | 'excel') => void;
}

const TransactionExport: React.FC<TransactionExportProps> = ({ onExport }) => {
  return (
    <div className="flex justify-end mb-4 gap-2">
      <Button variant="outline" onClick={() => onExport('csv')}>
        <Download className="mr-2 h-4 w-4" />
        CSV
      </Button>
      <Button variant="outline" onClick={() => onExport('pdf')}>
        <Download className="mr-2 h-4 w-4" />
        PDF
      </Button>
      <Button variant="outline" onClick={() => onExport('excel')}>
        <Download className="mr-2 h-4 w-4" />
        Excel
      </Button>
    </div>
  );
};

export default TransactionExport;
