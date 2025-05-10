import React from "react";
import { 
  Card, CardHeader, CardTitle, CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle } from "lucide-react";
import { AlertTriangle, BookOpen, FileText, LightbulbIcon } from "lucide-react"; // Import the missing icons

// Define a proper suggestion type
interface Suggestion {
  id: string;
  type: string;
  priority: string;
  title: string;
  description: string;
  relevance: number;
}

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

const SuggestionsList = ({ suggestions }: SuggestionsListProps) => {
  // Verifica se há sugestões válidas e completas antes de prosseguir
  // Primeiro, garantimos que suggestions é um array
  const suggestionsArray = Array.isArray(suggestions) ? suggestions : [];
  
  // Filtramos para garantir que cada sugestão é um objeto válido
  const validSuggestions = suggestionsArray.filter(suggestion => {
    // Verificação completa para garantir que o objeto suggestion existe e tem todas as propriedades necessárias
    if (!suggestion || typeof suggestion !== 'object' || suggestion === null) return false;
    
    // Criamos uma cópia segura da sugestão para não modificar o objeto original
    const safeSuggestion = { ...suggestion };
    
    // Ensure type safety by validating against LegalSuggestion interface
    // Verificamos se type existe e é válido, caso contrário definimos um valor padrão
    const suggestionType = safeSuggestion.type && typeof safeSuggestion.type === 'string' && 
      ['action', 'document', 'precedent', 'strategy'].includes(safeSuggestion.type)
      ? safeSuggestion.type
      : 'action';
    
    const suggestionPriority = safeSuggestion.priority && typeof safeSuggestion.priority === 'string' && 
      ['high', 'medium', 'low'].includes(safeSuggestion.priority)
      ? safeSuggestion.priority
      : 'medium';
    
    // Ensure all required properties exist with default values
    safeSuggestion.id = safeSuggestion.id || '';
    safeSuggestion.title = safeSuggestion.title || '';
    safeSuggestion.description = safeSuggestion.description || '';
    safeSuggestion.type = suggestionType;
    safeSuggestion.priority = suggestionPriority;
    safeSuggestion.relevance = typeof safeSuggestion.relevance === 'number' ? safeSuggestion.relevance : 0;
    
    // Atualizamos o objeto original com os valores seguros
    Object.assign(suggestion, safeSuggestion);
    
    return true;
  }) || [];
  if (validSuggestions.length === 0) return null;

  // Função para obter o ícone com base no tipo de sugestão
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'precedent':
        return <BookOpen className="h-4 w-4" />;
      case 'strategy':
        return <LightbulbIcon className="h-4 w-4" />;
      case 'action':
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  // Função para obter a cor do badge com base na prioridade
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Função para traduzir o tipo de sugestão
  const translateType = (type: string) => {
    switch (type) {
      case 'document':
        return 'Documento';
      case 'precedent':
        return 'Precedente';
      case 'strategy':
        return 'Estratégia';
      case 'action':
        return 'Ação';
      default:
        return type;
    }
  };

  // Função para traduzir a prioridade
  const translatePriority = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return priority;
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Sugestões Jurídicas</h3>
      
      {validSuggestions.map((suggestion) => {
        // Garantir que as propriedades existam, usando valores padrão se necessário
        // Usamos uma verificação mais robusta para garantir que suggestion é um objeto válido
        const safeObj = suggestion && typeof suggestion === 'object' ? suggestion : {};
        
        // Extraímos as propriedades com valores padrão seguros
        const type = safeObj.type && typeof safeObj.type === 'string' ? safeObj.type : 'action';
        const priority = safeObj.priority && typeof safeObj.priority === 'string' ? safeObj.priority : 'medium';
        const title = safeObj.title && typeof safeObj.title === 'string' ? safeObj.title : 'Sugestão';
        const description = safeObj.description && typeof safeObj.description === 'string' ? safeObj.description : '';
        const relevance = safeObj.relevance && typeof safeObj.relevance === 'number' ? safeObj.relevance : 0;
        const id = safeObj.id && typeof safeObj.id === 'string' ? safeObj.id : `suggestion-${Math.random().toString(36).substr(2, 9)}`;

        return (
          <Card key={id} className="overflow-hidden">
            <div className="flex items-stretch">
              <div 
                className={`w-1 flex-shrink-0 ${priority === 'high' ? 'bg-red-500' : priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
              />
              <CardContent className="p-4 w-full">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="mr-2 text-primary">
                      {getSuggestionIcon(type)}
                    </div>
                    <h4 className="font-medium">{title}</h4>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className={getPriorityColor(priority)}>
                      {translatePriority(priority)}
                    </Badge>
                    <Badge variant="outline">
                      {translateType(type)}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-primary h-1.5 rounded-full" 
                  style={{ width: `${relevance}%` }}
                  title={`Relevância: ${relevance}%`}
                />
              </div>
              </CardContent>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default SuggestionsList;
