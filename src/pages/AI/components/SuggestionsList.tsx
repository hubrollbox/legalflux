
import React from 'react';
import { Suggestion } from '../types';

interface SuggestionsListProps {
  suggestions: Suggestion[];
  onSelectSuggestion: (suggestion: Suggestion) => void;
}

// Funções auxiliares para obter cores com base no tipo e prioridade
const getSuggestionTypeColor = (type: string) => {
  const typeColors: Record<string, string> = {
    legal: "text-blue-600",
    case: "text-green-600",
    document: "text-violet-600",
    action: "text-amber-600",
    default: "text-gray-600"
  };
  return typeColors[type] || typeColors.default;
};

const getPriorityBadgeColor = (priority: string) => {
  const priorityColors: Record<string, string> = {
    high: "bg-red-100 text-red-800",
    medium: "bg-amber-100 text-amber-800",
    low: "bg-green-100 text-green-800",
    default: "bg-gray-100 text-gray-800"
  };
  return priorityColors[priority] || priorityColors.default;
};

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions, onSelectSuggestion }) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Nenhuma sugestão disponível no momento.</p>
      </div>
    );
  }

  // Garantindo que cada item tenha todas as propriedades necessárias
  const safeSuggestions = suggestions.map(suggestion => ({
    id: suggestion?.id || `suggestion-${Math.random().toString(36).substring(7)}`,
    title: suggestion?.title || "Sugestão sem título",
    description: suggestion?.description || "",
    type: suggestion?.type || "default",
    priority: suggestion?.priority || "medium",
    relevance: suggestion?.relevance || "medium"
  }));

  return (
    <div className="space-y-3">
      {safeSuggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="bg-card border rounded-md p-3 hover:bg-accent/10 transition-colors cursor-pointer"
          onClick={() => onSelectSuggestion(suggestion)}
        >
          <div className="flex items-center justify-between mb-1">
            <div className={`font-medium ${getSuggestionTypeColor(suggestion.type)}`}>
              {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
            </div>
            <div className={`text-xs px-2 py-0.5 rounded-full ${getPriorityBadgeColor(suggestion.priority)}`}>
              {suggestion.priority.charAt(0).toUpperCase() + suggestion.priority.slice(1)}
            </div>
          </div>
          <h4 className="text-sm font-medium mb-1">{suggestion.title}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2">{suggestion.description}</p>
          <div className="flex justify-end mt-2">
            <span className="text-xs text-muted-foreground">
              Relevância: {suggestion.relevance === 'high' ? 'Alta' : suggestion.relevance === 'medium' ? 'Média' : 'Baixa'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestionsList;
