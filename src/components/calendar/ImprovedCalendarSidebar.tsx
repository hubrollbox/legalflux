import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Users, Clock, FileText, Calendar as CalendarIcon, Briefcase, Gavel, Scale, Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, isToday, isTomorrow, addDays, isWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import type { CalendarEvent } from "@/types";
import MiniCalendarView from "./MiniCalendarView";
import DraggableEvent from "./DraggableEvent";

interface ImprovedCalendarSidebarProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onCategoryFilter: (category: string | null) => void;
  onClientFilter: (client: string | null) => void;
  onProcessFilter: (process: string | null) => void;
  onPriorityFilter: (priority: string | null) => void;
  categoryFilter: string | null;
  clientFilter: string | null;
  processFilter: string | null;
  priorityFilter: string | null;
  onEventClick?: (event: CalendarEvent) => void;
}

const categoryConfig = {
  meeting: { label: "Reuniões", color: "bg-blue-100 text-blue-700 border-blue-200", icon: <Users className="h-4 w-4" /> },
  deadline: { label: "Prazos", color: "bg-red-100 text-red-700 border-red-200", icon: <Clock className="h-4 w-4" /> },
  task: { label: "Tarefas", color: "bg-green-100 text-green-700 border-green-200", icon: <FileText className="h-4 w-4" /> },
  hearing: { label: "Audiências", color: "bg-purple-100 text-purple-700 border-purple-200", icon: <Gavel className="h-4 w-4" /> },
  trial: { label: "Julgamentos", color: "bg-amber-100 text-amber-700 border-amber-200", icon: <Scale className="h-4 w-4" /> },
  client: { label: "Clientes", color: "bg-indigo-100 text-indigo-700 border-indigo-200", icon: <Briefcase className="h-4 w-4" /> },
  other: { label: "Outros", color: "bg-gray-100 text-gray-700 border-gray-200", icon: <CalendarIcon className="h-4 w-4" /> }
};

const priorityConfig = {
  high: { label: "Alta", color: "bg-red-100 text-red-700 border-red-200" },
  medium: { label: "Média", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  low: { label: "Baixa", color: "bg-green-100 text-green-700 border-green-200" }
};

const ImprovedCalendarSidebar: React.FC<ImprovedCalendarSidebarProps> = ({
  events,
  selectedDate,
  onDateChange,
  onCategoryFilter,
  onClientFilter,
  onProcessFilter,
  onPriorityFilter,
  categoryFilter,
  clientFilter,
  processFilter,
  priorityFilter,
  onEventClick
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Obter eventos próximos (hoje, amanhã e próximos dias)
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    const nextWeek = addDays(today, 7);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.start);
        return isWithinInterval(eventDate, { 
          start: today, 
          end: nextWeek 
        });
      })
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .slice(0, 10);
  }, [events]);

  // Agrupar eventos por categoria
  const eventsByCategory = useMemo(() => {
    return events.reduce((acc, event) => {
      const category = event.category || 'other';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [events]);

  // Obter clientes únicos
  const uniqueClients = useMemo(() => {
    const clients = events
      .filter(event => event.client)
      .map(event => event.client as string);
    
    return [...new Set(clients)];
  }, [events]);

  // Obter processos únicos
  const uniqueProcesses = useMemo(() => {
    const processes = events
      .filter(event => event.process)
      .map(event => event.process as string);
    
    return [...new Set(processes)];
  }, [events]);

  // Filtrar eventos por termo de pesquisa
  const filteredUpcomingEvents = useMemo(() => {
    if (!searchTerm) return upcomingEvents;
    
    const term = searchTerm.toLowerCase();
    return upcomingEvents.filter(event => 
      event.title.toLowerCase().includes(term) ||
      (event.description && event.description.toLowerCase().includes(term)) ||
      (event.client && event.client.toLowerCase().includes(term)) ||
      (event.process && event.process.toLowerCase().includes(term)) ||
      (event.location && event.location.toLowerCase().includes(term))
    );
  }, [upcomingEvents, searchTerm]);

  // Função para limpar todos os filtros
  const clearAllFilters = () => {
    onCategoryFilter(null);
    onClientFilter(null);
    onProcessFilter(null);
    onPriorityFilter(null);
    setSearchTerm("");
  };

  // Verificar se algum filtro está ativo
  const hasActiveFilters = categoryFilter || clientFilter || processFilter || priorityFilter || searchTerm;

  return (
    <div className="w-80 space-y-4">
      <MiniCalendarView 
        events={events}
        selectedDate={selectedDate}
        onDateChange={onDateChange}
      />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">Filtros</CardTitle>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-red-500 hover:text-red-700" 
                  onClick={clearAllFilters}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar eventos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {showFilters && (
              <>
                <Separator className="my-2" />
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Categorias</h4>
                  <div className="grid grid-cols-2 gap-1">
                    <div
                      onClick={() => onCategoryFilter(null)}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100",
                        !categoryFilter && "bg-gray-100"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="text-sm">Todos</span>
                      </div>
                    </div>
                    {Object.entries(categoryConfig).map(([category, config]) => (
                      <div
                        key={category}
                        onClick={() => onCategoryFilter(category)}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-md cursor-pointer",
                          categoryFilter === category ? config.color : "hover:bg-gray-100"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {config.icon}
                          <span className="text-sm truncate">{config.label}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {eventsByCategory[category] || 0}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-2" />
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Prioridade</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge 
                      variant={priorityFilter === null ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => onPriorityFilter(null)}
                    >
                      Todas
                    </Badge>
                    {Object.entries(priorityConfig).map(([priority, config]) => (
                      <Badge 
                        key={priority}
                        variant="outline"
                        className={cn(
                          "cursor-pointer",
                          priorityFilter === priority ? config.color : ""
                        )}
                        onClick={() => onPriorityFilter(priority)}
                      >
                        {config.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {uniqueClients.length > 0 && (
                  <>
                    <Separator className="my-2" />
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Clientes</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge 
                          variant={clientFilter === null ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => onClientFilter(null)}
                        >
                          Todos
                        </Badge>
                        {uniqueClients.slice(0, 5).map(client => (
                          <Badge 
                            key={client}
                            variant="outline"
                            className={cn(
                              "cursor-pointer",
                              clientFilter === client ? "bg-indigo-100 text-indigo-700 border-indigo-200" : ""
                            )}
                            onClick={() => onClientFilter(client)}
                          >
                            {client}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {uniqueProcesses.length > 0 && (
                  <>
                    <Separator className="my-2" />
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Processos</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge 
                          variant={processFilter === null ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => onProcessFilter(null)}
                        >
                          Todos
                        </Badge>
                        {uniqueProcesses.slice(0, 5).map(process => (
                          <Badge 
                            key={process}
                            variant="outline"
                            className={cn(
                              "cursor-pointer",
                              processFilter === process ? "bg-blue-100 text-blue-700 border-blue-200" : ""
                            )}
                            onClick={() => onProcessFilter(process)}
                          >
                            {process}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            {filteredUpcomingEvents.length > 0 ? (
              <div className="px-4 py-2 space-y-3">
                {filteredUpcomingEvents.map(event => {
                  const eventDate = new Date(event.start);
                  const isEventToday = isToday(eventDate);
                  const isEventTomorrow = isTomorrow(eventDate);
                  
                  return (
                    <div key={event.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <Badge variant="outline" className={cn(
                          "text-xs",
                          isEventToday ? "bg-blue-100 text-blue-700 border-blue-200" :
                          isEventTomorrow ? "bg-amber-100 text-amber-700 border-amber-200" :
                          "bg-gray-100"
                        )}>
                          {isEventToday ? "Hoje" : 
                           isEventTomorrow ? "Amanhã" : 
                           format(eventDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                        </Badge>
                        <span>{format(eventDate, "HH:mm")}</span>
                      </div>
                      <DraggableEvent 
                        event={event} 
                        onClick={() => onEventClick && onEventClick(event)}
                        isDraggable={false}
                        showDetails={true}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <CalendarIcon className="mx-auto h-8 w-8 text-muted-foreground opacity-50" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchTerm ? "Nenhum evento encontrado" : "Nenhum evento próximo"}
                </p>
                {searchTerm && (
                  <Button 
                    variant="link" 
                    className="mt-2 text-xs" 
                    onClick={() => setSearchTerm("")}
                  >
                    Limpar pesquisa
                  </Button>
                )}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImprovedCalendarSidebar;