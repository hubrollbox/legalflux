
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/dateUtils";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

interface FinancialReportsProps {
  // Add the required props here
}

export const FinancialReports: React.FC<FinancialReportsProps> = () => {
  // Generate sample reports
  const generateSampleReport = (month: string) => {
    // Fixed date format here
    return {
      id: `report-${month}`,
      title: `Relatório Financeiro - ${month}`,
      date: formatDate(new Date()), // Corrected to use only one argument
      type: 'PDF',
      size: '2.4 MB',
    };
  };

  const reports = [
    generateSampleReport('Janeiro'),
    generateSampleReport('Fevereiro'),
    generateSampleReport('Março'),
  ];

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <CardTitle>Relatórios Financeiros</CardTitle>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <div className="font-medium">{report.title}</div>
                <div className="text-sm text-muted-foreground">
                  {report.date} • {report.type} • {report.size}
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
