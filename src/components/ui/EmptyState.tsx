import React from "react";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="text-center text-gray-500">
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
