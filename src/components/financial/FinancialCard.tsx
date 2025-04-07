import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';

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
    <Card className="financial-card overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-t-4 relative" 
      style={{ borderTopColor: isPositive ? 'var(--green-500)' : 'var(--red-500)' }}>
      <CardContent className="p-6">
        <div className="absolute top-0 right-0 h-24 w-24 opacity-5">
          {icon}
        </div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <div className={`flex items-center mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'} text-sm font-medium`}>
              {isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              <span>{change}</span>
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-2">{description}</p>
            )}
          </div>
          <div className={`h-12 w-12 rounded-full ${isPositive ? 'bg-green-500/10' : 'bg-red-500/10'} flex items-center justify-center`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialCard;