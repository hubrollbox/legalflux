
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { DocumentFilter } from "@/types/document";

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
  // Generic handler for filter changes
  const handleFilterChange = (key: keyof DocumentFilter, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Pesquisar documentos..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" /> Filtros
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Tipo de Documento</h4>
              <Select
                value={filters.type || "todos"}
                onValueChange={(value) => handleFilterChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
                  <SelectItem value="document">Documentos</SelectItem>
                  <SelectItem value="contract">Contratos</SelectItem>
                  <SelectItem value="petition">Petições</SelectItem>
                  <SelectItem value="template">Templates</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium leading-none">Data</h4>
              <Calendar
                mode="single"
                selected={filters.date}
                onSelect={(date) => handleFilterChange("date", date)}
                className="border rounded-md p-3"
              />
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button
                variant="ghost"
                onClick={() =>
                  setFilters({
                    type: "todos",
                    tags: []
                  })
                }
                className="mr-2"
              >
                Limpar
              </Button>
              <Button onClick={() => console.log("Filtros aplicados:", filters)}>
                Aplicar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DocumentsSearchBar;
