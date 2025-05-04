
import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, ExternalLink, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import DashboardWidget from './DashboardWidget';
import type { Task, PriorityLevel } from '@/types';

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
  const [filterPriority, setFilterPriority] = useState<PriorityLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority'>('dueDate');

  // Filtrar e ordenar tarefas
  const filteredTasks = tasks
    .filter(task => task.status === 'pending' || task.status === 'in-progress' || task.status === 'todo' || task.status === 'in_progress')
    .filter(task => {
      if (filterPriority === 'all') return true;
      return task.priority?.toLowerCase() === filterPriority;
    })
    .filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime();
      } else {
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        return (priorityWeight[b.priority?.toLowerCase() as keyof typeof priorityWeight] || 0) -
               (priorityWeight[a.priority?.toLowerCase() as keyof typeof priorityWeight] || 0);
      }
    })
    .slice(0, 5);

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
        {/* Filtros e Pesquisa */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Pesquisar tarefas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <div className="flex gap-2">
            <Select value={filterPriority} onValueChange={(value: string) => setFilterPriority(value as PriorityLevel | 'all')}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortBy(sortBy === 'dueDate' ? 'priority' : 'dueDate')}
              className="hover:bg-gray-100"
              title={`Ordenar por ${sortBy === 'dueDate' ? 'prioridade' : 'data'}`}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Lista de Tarefas */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
            <CheckCircle className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p>{searchQuery ? 'Nenhuma tarefa encontrada' : 'Nenhuma tarefa pendente'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100 hover:border-gray-200"
              >
                <div className="flex items-start space-x-3">
                  {task.dueDate && new Date(task.dueDate) < new Date() ? (
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  ) : (
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{task.title}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Sem prazo'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {task.priority && (
                    <Badge 
                      className={`${getPriorityColor(task.priority)} transition-colors duration-200`}
                    >
                      {getPriorityText(task.priority)}
                    </Badge>
                  )}
                  {onTaskComplete && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
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
        
        {tasks.filter(t => t.status === 'pending' || t.status === 'in-progress' || t.status === 'todo' || t.status === 'in_progress').length > 0 && onViewAll && (
          <div className="pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-200"
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
