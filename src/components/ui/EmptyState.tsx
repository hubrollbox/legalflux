import React from "react";

interface EmptyStateProps {
  message: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, action }) => {
  return (
    <div className="text-center text-gray-500 flex flex-col items-center gap-4">
      <p>{message}</p>
      {action}
    </div>
  );
};

export default EmptyState;
