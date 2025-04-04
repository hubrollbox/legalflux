
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DocumentsSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const DocumentsSearchBar: React.FC<DocumentsSearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="my-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Pesquisar documentos..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DocumentsSearchBar;
