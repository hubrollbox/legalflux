
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import MessageInput from '../components/MessageInput';

interface ResearchTabProps {
  onSearch: (query: string) => void;
  results: any[];
  isLoading: boolean;
}

const ResearchTab: React.FC<ResearchTabProps> = ({ onSearch, results, isLoading }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  
  // Create a single messagesEndRef
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setSearchCount(prev => prev + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [results]);

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50 pb-3">
          <CardTitle className="text-lg">Pesquisa Jurídica</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <MessageInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pesquise legislação, jurisprudência e doutrina..."
                disabled={isLoading}
                className="pl-8"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={isLoading || !query.trim()}
              className="shrink-0"
            >
              Pesquisar
            </Button>
          </div>

          {searchCount > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-sm">
                    {searchCount} pesquisa{searchCount !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50 pb-3">
            <CardTitle className="text-lg">Resultados</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                  <h4 className="font-medium">{result.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{result.excerpt}</p>
                  {result.source && (
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="rounded-sm text-xs">
                        {result.source}
                      </Badge>
                      {result.date && <span className="text-xs text-muted-foreground">{result.date}</span>}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef as React.RefObject<HTMLDivElement>} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResearchTab;
