import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/supabase';
import { FileText, Loader2, Upload } from 'lucide-react';
import { useEffect } from 'react';
import Image from 'next/image';


type FilePreview = {
  name: string;
  type: string;
  preview: string;
  size: number;
};

interface FileUploadProps {
  processId: string;
  onUploadSuccess?: (filePaths: string[]) => void;
}

export const FileUpload = ({ processId, onUploadSuccess }: FileUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<FilePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);
    const previews = await Promise.all(
      filesArray.map(async (file) => ({
        name: file.name,
        type: file.type,
        preview: URL.createObjectURL(file),
        size: file.size,
        fileObject: file
      }))
    );

    setUploadedFiles([...uploadedFiles, ...previews]);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    const filePaths: string[] = [];

    try {
      for (const file of uploadedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${processId}/${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;

        const { error } = await supabase.storage
          .from('process-documents')
          .upload(fileName, (file as any).fileObject);

        if (error) throw error;
        filePaths.push(fileName);
      }

      onUploadSuccess?.(filePaths);
      setUploadedFiles([]);
    } catch (error) {
      console.error('Erro no upload:', error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      uploadedFiles.forEach(file => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [uploadedFiles]);

  return (
    <Card>
      <CardHeader className="text-sm font-medium">Anexar Documentos</CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-primary transition-colors">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Arraste arquivos ou clique para selecionar
            </span>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            />
          </label>

          {uploadedFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  {file.type.startsWith('image/') ? (
                    <Image 
                      src={file.preview} 
                      alt={file.name}
                      width={200}
                      height={150}
                      className="h-full w-full object-cover rounded-md"
                      onLoad={() => URL.revokeObjectURL(file.preview)}
                    />
                    ) : (
                    <div className="flex items-center justify-center h-32 w-full bg-muted rounded-md">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-white"
                    >
                      Visualizar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={isUploading || uploadedFiles.length === 0}
            className="self-end"
          >
            {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isUploading ? 'Enviando...' : 'Enviar Documentos'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
