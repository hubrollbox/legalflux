import React from 'react';
import { CheckCircle, Clock, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardWidget from './DashboardWidget';
import { Task } from '@/types';

interface PendingTasksWidgetProps {
  tasks: Task[];
  className?: string;
  onViewAll?: () => void;
  onTaskComplete?: (taskId: string) => void;
}

const PendingTasksWidget: React.FC<PendingTasksWidgetProps> = ({
  tasks,
  className = '',
  onViewAll,
  onTaskComplete,
}) => {
  // Filtrar apenas tarefas pendentes
  const pendingTasks = tasks.filter(task => task.status === 'todo' || task.status === 'in_progress').slice(0, 5);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return priority;
    }
  };

  return (
    <DashboardWidget 
      title="Tarefas Pendentes" 
      description="Tarefas que precisam de atenção"
      className={className}
      collapsible
    >
      <div className="space-y-4">
        {pendingTasks.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <CheckCircle className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p>Nenhuma tarefa pendente</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-start justify-between p-2 rounded-md hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  {task.dueDate && new Date(task.dueDate) < new Date() ? (
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  ) : (
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{task.title}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Sem prazo'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {task.priority && (
                    <Badge className={getPriorityColor(task.priority)}>
                      {getPriorityText(task.priority)}
                    </Badge>
                  )}
                  {onTaskComplete && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full hover:bg-green-50 hover:text-green-600"
                      onClick={() => onTaskComplete(task.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {tasks.filter(t => t.status === 'todo' || t.status === 'in_progress').length > 0 && onViewAll && (
          <div className="pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={onViewAll}
            >
              Ver todas as tarefas
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </DashboardWidget>
  );
};

export default PendingTasksWidget;