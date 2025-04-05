
import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FileUploaderProps {
  onFilesUploaded: (files: File[]) => void;
  maxSize?: number; // in MB
  allowedTypes?: string[];
  disabled?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesUploaded,
  maxSize = 10, // Default max size: 10MB
  allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.png', '.xlsx'],
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const validateFiles = useCallback((files: File[]): { valid: File[], invalid: File[], errors: string[] } => {
    const valid: File[] = [];
    const invalid: File[] = [];
    const errors: string[] = [];
    
    for (const file of files) {
      const extension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      const isValidType = allowedTypes.includes(extension) || allowedTypes.includes('*');
      const isValidSize = file.size <= maxSize * 1024 * 1024;
      
      if (!isValidType) {
        invalid.push(file);
        errors.push(`Tipo de ficheiro não permitido: ${file.name}`);
      } else if (!isValidSize) {
        invalid.push(file);
        errors.push(`Ficheiro excede o tamanho máximo (${maxSize}MB): ${file.name}`);
      } else {
        valid.push(file);
      }
    }
    
    return { valid, invalid, errors };
  }, [allowedTypes, maxSize]);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileList = Array.from(e.dataTransfer.files);
      const { valid, errors } = validateFiles(fileList);
      
      if (errors.length > 0) {
        errors.forEach(error => console.error(error));
      }
      
      if (valid.length > 0) {
        setSelectedFiles(valid);
      }
    }
  }, [disabled, validateFiles]);
  
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      const { valid, errors } = validateFiles(fileList);
      
      if (errors.length > 0) {
        errors.forEach(error => console.error(error));
      }
      
      if (valid.length > 0) {
        setSelectedFiles(valid);
      }
    }
  }, [disabled, validateFiles]);
  
  const removeFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);
  
  const handleUpload = useCallback(() => {
    if (selectedFiles.length > 0) {
      onFilesUploaded(selectedFiles);
      setSelectedFiles([]);
    }
  }, [selectedFiles, onFilesUploaded]);
  
  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <Upload className={`h-10 w-10 mb-4 ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
        <p className="text-lg font-medium mb-1">Arraste e solte os seus documentos aqui</p>
        <p className="text-sm text-muted-foreground mb-4">ou clique para selecionar ficheiros</p>
        <p className="text-xs text-muted-foreground">
          Formatos permitidos: {allowedTypes.join(', ')} | Tamanho máximo: {maxSize}MB
        </p>
        
        <input
          type="file"
          className="hidden"
          multiple
          onChange={handleFileInputChange}
          accept={allowedTypes.join(',')}
          disabled={disabled}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button 
            type="button" 
            variant="outline" 
            className="mt-4"
            disabled={disabled}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Selecionar Ficheiros
          </Button>
        </label>
      </div>
      
      {selectedFiles.length > 0 && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Ficheiros Selecionados ({selectedFiles.length})</h3>
            <Button variant="outline" size="sm" onClick={handleUpload} disabled={disabled}>
              Carregar Todos
            </Button>
          </div>
          
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <li key={`${file.name}-${index}`} className="flex justify-between items-center p-2 bg-muted rounded">
                <div className="flex items-center">
                  <File className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({(file.size / (1024 * 1024)).toFixed(1)} MB)
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};
