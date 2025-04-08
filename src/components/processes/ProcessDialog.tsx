import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ProcessForm
          initialData={process}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProcessDialog;