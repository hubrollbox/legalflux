
import React from 'react';
import { AlertCircle, ArrowRight, CheckCircle, InfoIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Suggestion } from '../types';

interface SuggestionsListProps {
  suggestions: Suggestion[];
  onSelectSuggestion: (suggestion: Suggestion) => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ 
  suggestions,
  onSelectSuggestion
}) => {
  if (!suggestions.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <InfoIcon className="h-10 w-10 mx-auto mb-2 opacity-30" />
        <p>Nenhuma sugestão disponível no momento.</p>
      </div>
    );
  }

  // Helper function to get priority icon
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <InfoIcon className="h-4 w-4 text-amber-500" />;
      case 'low':
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  // Helper function to get type badge class
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'action':
        return 'bg-blue-100 text-blue-800';
      case 'document':
        return 'bg-purple-100 text-purple-800';
      case 'research':
        return 'bg-green-100 text-green-800';
      case 'strategy':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get relevance text class
  const getRelevanceClass = (relevance: string) => {
    const relevanceValue = parseInt(relevance) || 0;
    if (relevanceValue >= 80) return 'text-green-600 font-medium';
    if (relevanceValue >= 50) return 'text-amber-600';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-3">
      {suggestions.map((suggestion) => (
        <div 
          key={suggestion.id}
          className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => onSelectSuggestion(suggestion)}
        >
          <div className="flex justify-between items-start mb-2">
            <span 
              className={cn(
                "text-xs px-2 py-1 rounded-full",
                getTypeBadgeClass(suggestion.type)
              )}
            >
              {suggestion.type}
            </span>
            <div className="flex items-center">
              {getPriorityIcon(suggestion.priority)}
              <span className="text-xs ml-1 text-muted-foreground">
                {suggestion.priority}
              </span>
            </div>
          </div>
          
          <h4 className="font-medium mb-1 line-clamp-1">{suggestion.title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {suggestion.description}
          </p>
          
          <div className="flex justify-between items-center mt-2">
            <span className={cn("text-xs", getRelevanceClass(suggestion.relevance))}>
              Relevância: {suggestion.relevance}%
            </span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestionsList;
