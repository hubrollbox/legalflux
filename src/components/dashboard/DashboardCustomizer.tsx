import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface WidgetOption {
  id: string;
  name: string;
  description: string;
  defaultEnabled: boolean;
}

interface DashboardCustomizerProps {
  availableWidgets: WidgetOption[];
  activeWidgets: string[];
  onSaveLayout: (widgetIds: string[]) => void;
}

const DashboardCustomizer: React.FC<DashboardCustomizerProps> = ({
  availableWidgets,
  activeWidgets,
  onSaveLayout,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>(activeWidgets);

  const handleToggleWidget = (widgetId: string) => {
    setSelectedWidgets((prev) =>
      prev.includes(widgetId)
        ? prev.filter((id) => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  const handleSave = () => {
    onSaveLayout(selectedWidgets);
    setOpen(false);
  };

  const handleCancel = () => {
    setSelectedWidgets(activeWidgets);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Personalizar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Personalizar Dashboard</DialogTitle>
          <DialogDescription>
            Selecione os widgets que deseja exibir no seu painel de controlo.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {availableWidgets.map((widget) => (
            <div key={widget.id} className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50">
              <Checkbox
                id={`widget-${widget.id}`}
                checked={selectedWidgets.includes(widget.id)}
                onCheckedChange={() => handleToggleWidget(widget.id)}
              />
              <div className="grid gap-1.5">
                <Label
                  htmlFor={`widget-${widget.id}`}
                  className="font-medium cursor-pointer"
                >
                  {widget.name}
                </Label>
                <p className="text-sm text-gray-500">{widget.description}</p>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            <span>Cancelar</span>
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span>Guardar</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardCustomizer;