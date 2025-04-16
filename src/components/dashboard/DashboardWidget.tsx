import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';

interface DashboardWidgetProps {
  title: string;
  description?: string;
  children: ReactNode;
  collapsible?: boolean;
  className?: string;
  onRemove?: () => void;
  onMaximize?: () => void;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  description,
  children,
  collapsible = false,
  className = '',
  onRemove,
  onMaximize,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (onMaximize) onMaximize();
  };

  return (
    <Card className={`dashboard-widget ${isMaximized ? 'fixed inset-4 z-50 overflow-auto' : ''} ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex items-center space-x-1">
          {collapsible && (
            <Button variant="ghost" size="icon" onClick={toggleCollapse} className="h-8 w-8">
              {isCollapsed ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
          )}
          {onMaximize && (
            <Button variant="ghost" size="icon" onClick={toggleMaximize} className="h-8 w-8">
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
          {onRemove && (
            <Button variant="ghost" size="icon" onClick={onRemove} className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      {!isCollapsed && <CardContent>{children}</CardContent>}
    </Card>
  );
};

export default DashboardWidget;