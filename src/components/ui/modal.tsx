
import * as React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = ""
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className={`relative bg-background rounded-lg shadow-lg max-w-lg w-full mx-4 ${className}`}>
        {title && (
          <div className="flex justify-between items-center border-b p-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
        )}
        
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
