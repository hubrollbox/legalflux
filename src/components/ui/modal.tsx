
import React from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className, title }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className={cn(
          "relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-h-[90vh] overflow-auto",
          "w-full max-w-3xl mx-4 border border-border",
          className
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {title && (
            <h2 className="text-lg font-semibold">{title}</h2>
          )}
          <button
            className="p-1 ml-auto rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export { Modal };
