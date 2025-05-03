
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: number;
  text?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = 24, 
  text = "A carregar...", 
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className="animate-spin" size={size} />
      {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};
