
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const PDFViewer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        toast({
          title: "Erro de formato",
          description: "Por favor, selecione um ficheiro PDF válido.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Visualizador de PDF</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange}
                id="pdf-upload"
                className="hidden"
              />
              <Button 
                variant="outline" 
                onClick={() => document.getElementById("pdf-upload")?.click()}
                className="w-full"
              >
                <FileUp className="mr-2 h-4 w-4" />
                Selecionar PDF
              </Button>
              {selectedFile && (
                <Button variant="outline" onClick={() => window.open(previewUrl!, "_blank")}>
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
              )}
            </div>
            
            {selectedFile && (
              <div className="mt-4">
                <p className="text-sm font-medium">Ficheiro selecionado:</p>
                <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
              </div>
            )}
            
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Faça upload de documentos PDF para visualizá-los diretamente na plataforma.
                Suporta anotações, marcações e partilha com clientes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pré-visualização</CardTitle>
        </CardHeader>
        <CardContent>
          {previewUrl ? (
            <div className="aspect-video overflow-hidden rounded-md border bg-muted">
              <iframe 
                src={previewUrl} 
                className="h-full w-full" 
                title="PDF Preview"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-md border">
              <p className="text-muted-foreground">Selecione um PDF para visualizar</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFViewer;
