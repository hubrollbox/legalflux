
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Lightbulb } from "lucide-react";
import { Suggestion } from '../types';
import SuggestionsList from './SuggestionsList';

// Define the correct types for legal suggestions
export interface LegalSuggestion {
  id: string;
  title: string;
  description: string;
  type: string;
  priority: string;
  relevance: string;  // Changed from number to string for compatibility
}

interface SmartSuggestionsProps {
  suggestions: LegalSuggestion[];
  onSelectSuggestion: (suggestion: Suggestion) => void;
  isLoading?: boolean;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ 
  suggestions, 
  onSelectSuggestion,
  isLoading = false 
}) => {
  // Convert LegalSuggestion[] to Suggestion[]
  const convertedSuggestions: Suggestion[] = suggestions.map(suggestion => ({
    id: suggestion.id,
    title: suggestion.title,
    description: suggestion.description,
    type: suggestion.type,
    priority: suggestion.priority,
    relevance: suggestion.relevance
  }));
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
            Sugestões Inteligentes
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-xs">
            Ver todas
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <SuggestionsList 
            suggestions={convertedSuggestions} 
            onSelectSuggestion={onSelectSuggestion}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SmartSuggestions;
