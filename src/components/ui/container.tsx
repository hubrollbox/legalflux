
import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div
      className={cn(
        "w-full px-4 sm:px-6 md:px-8 lg:px-12 mx-auto max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
