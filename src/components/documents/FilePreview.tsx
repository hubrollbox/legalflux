
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { FileText, X } from 'lucide-react';
import CustomImage from '@/components/ui/CustomImage';

interface FilePreviewProps {
  fileUrl: string;
  fileName: string;
  onClose?: () => void;
}

export const FilePreview = ({ fileUrl, fileName, onClose }: FilePreviewProps) => {
  const [numPages, setNumPages] = useState<number>();
  const fileType = fileName.split('.').pop()?.toLowerCase() || '';

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const renderPreview = () => {
    if (fileType === 'pdf') {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
          <FileText className="h-12 w-12" />
          <span>Pré-visualização de PDF não disponível neste momento</span>
        </div>
      );
    }

    if (fileType && ['doc', 'docx'].includes(fileType)) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
          <FileText className="h-12 w-12" />
          <span>Pré-visualização de documento não disponível neste momento</span>
        </div>
      );
    }

    if (fileType && ['png', 'jpg', 'jpeg'].includes(fileType)) {
      return (
        <CustomImage
          src={fileUrl}
          alt={fileName}
          width={800}
          height={600}
          className="max-h-screen mx-auto"
        />
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
        <FileText className="h-12 w-12" />
        <span>Pré-visualização não disponível para este formato</span>
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose?.()}>
      <DialogContent className="max-w-4xl h-[90vh]">
        <DialogHeader className="flex flex-row justify-between items-center">
          <span className="text-lg font-medium">{fileName}</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="overflow-auto bg-muted/50 rounded-lg p-4">
          {renderPreview()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
