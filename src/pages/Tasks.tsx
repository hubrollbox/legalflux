import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SectionHeader from '@/components/layout/SectionHeader';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit, GripVertical, AlertTriangle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase-client';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'done';
  relatedCase?: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [cases, setCases] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending',
    relatedCase: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const fetchCasesAndTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        // Buscar processos para popular o select de casos
        const { data: processes, error: processesError } = await supabase.from('processes').select('caseNumber');
        if (processesError) throw processesError;
        setCases(processes?.map((p: { caseNumber: string }) => p.caseNumber) || []);
        // Buscar tarefas reais
        const { data: tasksData, error: tasksError } = await supabase.from('tasks').select('*');
        if (tasksError) throw tasksError;
        setTasks(tasksData || []);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };
    fetchCasesAndTasks();
  }, []);

  const onDragEnd = async (result: DropResult): Promise<void> => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (!reorderedItem) return;
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
    // Opcional: atualizar ordem no Supabase se necessário
  };

  const handleAddTask = async () => {
    if (!newTask.title) return;
    setSyncing(true);
    setError(null);
    try {
      const { data, error: insertError } = await supabase.from('tasks').insert([{ ...newTask }]).select();
      if (insertError) throw insertError;
      setTasks([...tasks, data[0]]);
      setNewTask({ title: '', description: '', dueDate: '', priority: 'medium', status: 'pending', relatedCase: '' });
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar tarefa');
    } finally {
      setSyncing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="dashboard-header flex justify-between items-center">
        <SectionHeader
          title="Tarefas"
          description="Gerencie e acompanhe todas as suas tarefas"
        />
        <Button onClick={() => setShowForm(!showForm)} className="bg-highlight hover:bg-highlight/90">
          <Plus className="mr-2 h-4 w-4" /> {showForm ? 'Cancelar' : 'Nova Tarefa'}
        </Button>
      </div>

      {loading && <div className="mt-4 text-center">Carregando tarefas...</div>}
      {error && <div className="mt-4 text-center text-red-600">{error}</div>}
      {syncing && <div className="mt-4 text-center text-blue-600">Sincronizando...</div>}

      {showForm && (
        <Card className="mt-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Título da Tarefa"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            />
            <Textarea
              placeholder="Descrição detalhada"
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            />
            <Input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
            />
            <Select onValueChange={(v: string) => setNewTask({...newTask, priority: v as Task['priority']})}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(v: string) => setNewTask({...newTask, relatedCase: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Vincular a Processo" />
              </SelectTrigger>
              <SelectContent>
                {cases.map(caseNumber => (
                  <SelectItem key={caseNumber} value={caseNumber}>{caseNumber}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddTask} className="mt-4 col-span-full" disabled={syncing}>
              Criar Tarefa
            </Button>
          </div>
        </Card>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided: import('react-beautiful-dnd').DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Lista de Tarefas</span>
                    <div className="flex gap-2">
                      <Button variant="outline">Filtrar por Status</Button>
                      <Button variant="outline">Ordenar por Prazo</Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided: import('react-beautiful-dnd').DraggableProvided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-white p-4 rounded-lg shadow-sm mb-2 border flex items-center"
                        >
                          <div {...provided.dragHandleProps} className="mr-4">
                            <GripVertical className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{task.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                                {task.status}
                              </span>
                            </div>
                            <div className="mt-2 text-sm text-gray-600 flex items-center gap-4">
                              {task.relatedCase && (
                                <span className="flex items-center">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Vinculado a: {task.relatedCase}
                                </span>
                              )}
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {format(new Date(task.dueDate), 'dd/MM/yyyy')}
                              </span>
                              <span className="flex items-center">
                                {task.priority === 'high' ? '🔥 Alta' : task.priority === 'medium' ? '⚠️ Média' : '⬇️ Baixa'}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </CardContent>
              </Card>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </DashboardLayout>
  );
};

export default Tasks;
