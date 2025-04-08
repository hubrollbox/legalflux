
import React, { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className = "",
  children,
}) => {
  return (
    <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 ${className}`}>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
        {description && (
          <p className="text-sm md:text-base text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="w-full sm:w-auto mt-2 sm:mt-0">{children}</div>}
    </div>
  );
};

export default SectionHeader;
