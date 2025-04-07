import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LegalSuggestion } from '../hooks/useLegalSuggestions';
import { FileText, AlertTriangle, BookOpen, LightbulbIcon } from 'lucide-react';

interface SuggestionsListProps {
  suggestions: LegalSuggestion[];
}

const SuggestionsList = ({ suggestions }: SuggestionsListProps) => {
  if (!suggestions || suggestions.length === 0) return null;

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
      
      {suggestions.map((suggestion) => {
        // Verificar se a sugestão existe e tem todas as propriedades necessárias
        if (!suggestion) return null;
        
        // Garantir que as propriedades existam, usando valores padrão se necessário
        const type = suggestion?.type || 'action';
        const priority = suggestion?.priority || 'medium';
        const title = suggestion?.title || 'Sugestão';
        const description = suggestion?.description || '';
        const relevance = suggestion?.relevance || 0;
        
        return (
          <Card key={suggestion.id} className="overflow-hidden">
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
                  style={{ width: `${suggestion.relevance}%` }}
                  title={`Relevância: ${suggestion.relevance}%`}
                />
              </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
  );
};

export default SuggestionsList;