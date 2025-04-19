import { useState } from 'react';
import { Document as PdfDocument, Page as PdfPage } from 'react-pdf';
import { DocViewer, PDFRenderer } from '@cyntler/react-doc-viewer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { FileText, X } from 'lucide-react';

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
        <PdfDocument file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (_, index) => (
            <PdfPage key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </PdfDocument>
      );
    }

    if (fileType && ['doc', 'docx'].includes(fileType)) {
      return (
        <div className="h-full">
          <DocViewerRef
            documents={[{ uri: fileUrl }]}
            pluginRenderers={[PDFRenderer]}
            config={{ header: { disableHeader: true } }}
          />
        </div>
      );
    }

    if (fileType && ['png', 'jpg', 'jpeg'].includes(fileType)) {
      return <img src={fileUrl} alt={fileName} className="max-h-screen mx-auto" />;
    }

    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
        <FileText className="h-12 w-12" />
        <span>Pré-visualização não disponível para este formato</span>
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
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