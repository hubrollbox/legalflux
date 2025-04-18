import * as React from 'react';

type FileUploadProps = {
  onUploadSuccess: (files: File[]) => void;
};

export const FileUpload = ({ onUploadSuccess }: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUploadSuccess(Array.from(e.target.files));
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        Anexar documentos
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </label>
      <p className="text-xs text-muted-foreground">
        Formatos suportados: PDF, DOCX, XLSX (max. 25MB)
      </p>
    </div>
  );
};