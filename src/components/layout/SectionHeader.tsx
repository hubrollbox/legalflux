
import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`text-center max-w-3xl mx-auto ${className}`}>
      <h1 className="text-3xl font-bold text-primary-950 sm:text-4xl">{title}</h1>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
