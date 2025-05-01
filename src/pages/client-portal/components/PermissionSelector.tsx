
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';
import { InfoIcon } from 'lucide-react';

export type AccessLevel = 'none' | 'read' | 'write' | 'full';

interface PermissionSelectorProps {
  label: string;
  description?: string;
  value: AccessLevel;
  onChange: (value: AccessLevel) => void;
  disabled?: boolean;
}

const PermissionSelector: React.FC<PermissionSelectorProps> = ({
  label,
  description,
  value,
  onChange,
  disabled = false
}) => {
  
  const getAccessColor = (access: AccessLevel): string => {
    switch (access) {
      case 'none':
        return 'bg-gray-100 text-gray-800';
      case 'read':
        return 'bg-blue-100 text-blue-800';
      case 'write':
        return 'bg-green-100 text-green-800';
      case 'full':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getAccessLabel = (access: AccessLevel): string => {
    switch (access) {
      case 'none':
        return 'Sem Acesso';
      case 'read':
        return 'Apenas Leitura';
      case 'write':
        return 'Leitura/Escrita';
      case 'full':
        return 'Acesso Total';
      default:
        return 'Indefinido';
    }
  };
  
  return (
    <div className="flex items-center justify-between py-2 border-b">
      <div className="flex items-center gap-2">
        <div>
          <div className="flex items-center">
            <span className="font-medium">{label}</span>
            {description && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge className={getAccessColor(value)}>
          {getAccessLabel(value)}
        </Badge>
        <Select 
          value={value} 
          onValueChange={(val) => onChange(val as AccessLevel)}
          disabled={disabled}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Sem Acesso</SelectItem>
            <SelectItem value="read">Apenas Leitura</SelectItem>
            <SelectItem value="write">Leitura/Escrita</SelectItem>
            <SelectItem value="full">Acesso Total</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PermissionSelector;
