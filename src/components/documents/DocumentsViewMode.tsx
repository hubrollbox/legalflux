
import React from "react";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentsViewModeProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const DocumentsViewMode: React.FC<DocumentsViewModeProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant={viewMode === "grid" ? "default" : "outline"} 
        size="icon"
        onClick={() => setViewMode("grid")}
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button 
        variant={viewMode === "list" ? "default" : "outline"} 
        size="icon"
        onClick={() => setViewMode("list")}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DocumentsViewMode;
