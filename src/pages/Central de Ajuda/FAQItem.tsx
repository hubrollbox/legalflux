
import React from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  );
};
