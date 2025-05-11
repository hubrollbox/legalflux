
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FinancialCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  description?: string;
}

const FinancialCard: React.FC<FinancialCardProps> = ({ 
  title, 
  value, 
  change, 
  isPositive, 
  icon,
  description 
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          <div className="h-8 w-8 rounded-full bg-highlight bg-opacity-10 flex items-center justify-center">
            {icon}
          </div>
        </div>
        
        <div className="mt-1">
          <h4 className="text-2xl font-semibold">{value}</h4>
          
          <div className="mt-1 flex items-center">
            <span className={cn(
              "text-xs font-medium flex items-center",
              isPositive ? "text-green-500" : "text-red-500"
            )}>
              {isPositive ? (
                <ArrowUpIcon className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3" />
              )}
              {change}
            </span>
            
            {description && (
              <span className="ml-2 text-xs text-gray-500">
                {description}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialCard;
