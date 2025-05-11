
import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { DocumentFilter } from '@/types/document';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DocumentsSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: DocumentFilter;
  setFilters: (filters: DocumentFilter) => void;
}

const DocumentsSearchBar: React.FC<DocumentsSearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
}) => {
  const handleFilterTypeChange = (type: string) => {
    setFilters({
      ...filters,
      type,
    });
  };

  const handleFilterDateChange = (date: Date | undefined) => {
    setFilters({
      ...filters,
      date,
    });
  };

  const clearFilters = () => {
    setFilters({
      type: 'todos',
      date: undefined,
      tags: [],
    });
  };

  const hasActiveFilters = filters.type !== 'todos' || filters.date !== undefined;

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-4">
      <div className="relative flex-grow">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Pesquisar documentos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Select value={filters.type} onValueChange={handleFilterTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo de documento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="document">Documentos</SelectItem>
            <SelectItem value="contract">Contratos</SelectItem>
            <SelectItem value="petition">Petições</SelectItem>
            <SelectItem value="template">Templates</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[140px]">
              <Calendar className="w-4 h-4 mr-2" />
              {filters.date ? format(filters.date, 'PPP', ptBR) : "Data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              mode="single"
              selected={filters.date}
              onSelect={handleFilterDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} className="px-2">
            <Filter className="w-4 h-4" />
            Limpar filtros
          </Button>
        )}
      </div>
    </div>
  );
};

export default DocumentsSearchBar;
