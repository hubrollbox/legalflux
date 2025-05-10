
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Process } from "@/types/process";
import ProcessForm from "./ProcessForm";

interface ProcessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  process?: Process;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  title: string;
  description: string;
}

const ProcessDialog: React.FC<ProcessDialogProps> = ({
  open,
  onOpenChange,
  process,
  onSubmit,
  isSubmitting,
  title,
  description,
}) => {
  // Ensure the initialData is created with proper types for deadline
  const initialData = process ? {
    ...process,
    deadline: process.startDate ? new Date(process.startDate) : undefined
  } : {
    id: '',
    title: '',
    number: '',
    type: 'other',
    status: 'new',
    clientId: '',
    startDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ProcessForm
          initialData={initialData}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProcessDialog;
