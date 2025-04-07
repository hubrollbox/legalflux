
import React from "react";
import { Search, Calendar, Tag, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DocumentsSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: {
    type: string;
    date: Date | undefined;
    tags: string[];
  };
  setFilters: (filters: any) => void;
}

const DocumentsSearchBar: React.FC<DocumentsSearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm,
  filters,
  setFilters 
}) => {
  const documentTypes = ["Todos", "PDF", "DOCX", "JPG", "PNG", "ZIP"];
  const availableTags = ["Contrato", "Processo", "Petição", "Recurso", "Parecer"];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome, tipo ou processo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={filters.type}
            onValueChange={(value) => setFilters({ ...filters, type: value })}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-[130px] justify-start text-left font-normal ${
                  filters.date ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {filters.date ? (
                  format(filters.date, "dd/MM/yyyy")
                ) : (
                  <span>Data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={filters.date}
                onSelect={(date) => setFilters({ ...filters, date })}
                initialFocus
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[130px] justify-start text-left font-normal">
                <Tag className="mr-2 h-4 w-4" />
                <span>Tags</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2">
              <div className="space-y-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        const newTags = filters.tags.includes(tag)
                          ? filters.tags.filter((t) => t !== tag)
                          : [...filters.tags, tag];
                        setFilters({ ...filters, tags: newTags });
                      }}
                    >
                      {tag}
                    </Button>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Filtros ativos */}
      {(filters.type !== "todos" || filters.date || filters.tags.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {filters.type !== "todos" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Tipo: {filters.type.toUpperCase()}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 hover:bg-transparent"
                onClick={() => setFilters({ ...filters, type: "todos" })}
              >
                ×
              </Button>
            </Badge>
          )}
          {filters.date && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(filters.date, "dd/MM/yyyy")}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 hover:bg-transparent"
                onClick={() => setFilters({ ...filters, date: undefined })}
              >
                ×
              </Button>
            </Badge>
          )}
          {filters.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {tag}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 hover:bg-transparent"
                onClick={() =>
                  setFilters({
                    ...filters,
                    tags: filters.tags.filter((t) => t !== tag),
                  })
                }
              >
                ×
              </Button>
            </Badge>
          ))}
          {(filters.type !== "todos" || filters.date || filters.tags.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() =>
                setFilters({ type: "todos", date: undefined, tags: [] })
              }
            >
              Limpar filtros
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentsSearchBar;
