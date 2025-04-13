import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, X, Edit2, Users, Clock, FileText, Calendar as CalendarIcon, Briefcase, Gavel, Scale } from 'lucide-react';
import { cn } from "@/lib/utils";

export interface EventCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string | undefined;
}

interface EventCategoryManagerProps {
  categories: EventCategory[];
  onCategoryChange: (categories: EventCategory[]) => void;
  onCategorySelect: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

const defaultCategories: EventCategory[] = [
  { id: 'meeting', name: 'Reunião', color: 'bg-blue-500', icon: 'users' },
  { id: 'deadline', name: 'Prazo', color: 'bg-red-500', icon: 'clock' },
  { id: 'task', name: 'Tarefa', color: 'bg-green-500', icon: 'file-text' },
  { id: 'hearing', name: 'Audiência', color: 'bg-purple-500', icon: 'gavel' },
  { id: 'trial', name: 'Julgamento', color: 'bg-amber-500', icon: 'scale' },
  { id: 'client', name: 'Cliente', color: 'bg-indigo-500', icon: 'briefcase' },
  { id: 'other', name: 'Outro', color: 'bg-gray-500', icon: 'calendar' }
];

const EventCategoryManager: React.FC<EventCategoryManagerProps> = ({
  categories = defaultCategories,
  onCategoryChange,
  onCategorySelect,
  selectedCategory
}) => {
  const [isAddingCategory, setIsAddingCategory] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState<Partial<EventCategory>>({
    name: '',
    color: 'bg-gray-500',
    icon: 'calendar'
  });
  const [editingCategoryId, setEditingCategoryId] = React.useState<string | null>(null);

  // Função para obter o ícone com base no tipo de categoria
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="h-4 w-4" />;
      case 'clock':
        return <Clock className="h-4 w-4" />;
      case 'file-text':
        return <FileText className="h-4 w-4" />;
      case 'gavel':
        return <Gavel className="h-4 w-4" />;
      case 'scale':
        return <Scale className="h-4 w-4" />;
      case 'briefcase':
        return <Briefcase className="h-4 w-4" />;
      case 'calendar':
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.name) return;
    
    const newCategoryComplete: EventCategory = {
      id: `category-${Date.now()}`,
      name: newCategory.name,
      color: newCategory.color || 'bg-gray-500',
      icon: newCategory.icon || 'calendar',
      description: newCategory.description
    };
    
    onCategoryChange([...categories, newCategoryComplete]);
    setNewCategory({ name: '', color: 'bg-gray-500', icon: 'calendar' });
    setIsAddingCategory(false);
  };

  const handleUpdateCategory = (id: string) => {
    const updatedCategories = categories.map(category => {
      if (category.id === id) {
        return {
          ...category,
          name: newCategory.name || category.name,
          color: newCategory.color || category.color,
          icon: newCategory.icon || category.icon,
          description: newCategory.description
        };
      }
      return category;
    });
    
    onCategoryChange(updatedCategories);
    setEditingCategoryId(null);
    setNewCategory({ name: '', color: 'bg-gray-500', icon: 'calendar' });
  };

  const handleDeleteCategory = (id: string) => {
    // Não permitir excluir categorias padrão
    if (['meeting', 'deadline', 'task', 'other'].includes(id)) return;
    
    const updatedCategories = categories.filter(category => category.id !== id);
    onCategoryChange(updatedCategories);
    
    // Se a categoria excluída estava selecionada, limpar a seleção
    if (selectedCategory === id) {
      onCategorySelect(null);
    }
  };

  const startEditCategory = (category: EventCategory) => {
    setEditingCategoryId(category.id);
    setNewCategory({
      name: category.name,
      color: category.color,
      icon: category.icon,
      description: category.description
    });
  };

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Azul' },
    { value: 'bg-red-500', label: 'Vermelho' },
    { value: 'bg-green-500', label: 'Verde' },
    { value: 'bg-yellow-500', label: 'Amarelo' },
    { value: 'bg-purple-500', label: 'Roxo' },
    { value: 'bg-pink-500', label: 'Rosa' },
    { value: 'bg-indigo-500', label: 'Índigo' },
    { value: 'bg-amber-500', label: 'Âmbar' },
    { value: 'bg-gray-500', label: 'Cinza' }
  ];

  const iconOptions = [
    { value: 'users', label: 'Pessoas' },
    { value: 'clock', label: 'Relógio' },
    { value: 'file-text', label: 'Documento' },
    { value: 'gavel', label: 'Martelo' },
    { value: 'scale', label: 'Balança' },
    { value: 'briefcase', label: 'Pasta' },
    { value: 'calendar', label: 'Calendário' }
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Categorias</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsAddingCategory(!isAddingCategory)}
            className="h-8 w-8 p-0"
          >
            {isAddingCategory ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <div className="p-4 space-y-2">
            {isAddingCategory && (
              <div className="space-y-3 p-3 border rounded-lg mb-4">
                <div className="space-y-1">
                  <Label htmlFor="category-name">Nome</Label>
                  <Input
                    id="category-name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="Nome da categoria"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label>Cor</Label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map(color => (
                      <div 
                        key={color.value}
                        className={cn(
                          "h-6 w-6 rounded-full cursor-pointer border-2",
                          color.value,
                          newCategory.color === color.value ? "border-black dark:border-white" : "border-transparent"
                        )}
                        onClick={() => setNewCategory({ ...newCategory, color: color.value })}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label>Ícone</Label>
                  <div className="flex flex-wrap gap-2">
                    {iconOptions.map(icon => (
                      <div 
                        key={icon.value}
                        className={cn(
                          "h-8 w-8 rounded-md cursor-pointer border-2 flex items-center justify-center",
                          newCategory.icon === icon.value ? "border-black bg-muted dark:border-white" : "border-transparent"
                        )}
                        onClick={() => setNewCategory({ ...newCategory, icon: icon.value })}
                        title={icon.label}
                      >
                        {getCategoryIcon(icon.value)}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2 flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setIsAddingCategory(false);
                      setNewCategory({ name: '', color: 'bg-gray-500', icon: 'calendar' });
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleAddCategory}
                    disabled={!newCategory.name}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            )}
            
            <div 
              className={cn(
                "flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-accent",
                !selectedCategory && "bg-accent"
              )}
              onClick={() => onCategorySelect(null)}
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Todas as categorias</span>
              </div>
              <Badge variant="secondary">{categories.length}</Badge>
            </div>
            
            {categories.map(category => (
              <div key={category.id} className="mb-1">
                {editingCategoryId === category.id ? (
                  <div className="space-y-3 p-3 border rounded-lg">
                    <div className="space-y-1">
                      <Label htmlFor={`edit-name-${category.id}`}>Nome</Label>
                      <Input
                        id={`edit-name-${category.id}`}
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        placeholder="Nome da categoria"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label>Cor</Label>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map(color => (
                          <div 
                            key={color.value}
                            className={cn(
                              "h-6 w-6 rounded-full cursor-pointer border-2",
                              color.value,
                              newCategory.color === color.value ? "border-black dark:border-white" : "border-transparent"
                            )}
                            onClick={() => setNewCategory({ ...newCategory, color: color.value })}
                            title={color.label}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label>Ícone</Label>
                      <div className="flex flex-wrap gap-2">
                        {iconOptions.map(icon => (
                          <div 
                            key={icon.value}
                            className={cn(
                              "h-8 w-8 rounded-md cursor-pointer border-2 flex items-center justify-center",
                              newCategory.icon === icon.value ? "border-black bg-muted dark:border-white" : "border-transparent"
                            )}
                            onClick={() => setNewCategory({ ...newCategory, icon: icon.value })}
                            title={icon.label}
                          >
                            {getCategoryIcon(icon.value)}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-2 flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setEditingCategoryId(null);
                          setNewCategory({ name: '', color: 'bg-gray-500', icon: 'calendar' });
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleUpdateCategory(category.id)}
                        disabled={!newCategory.name}
                      >
                        Atualizar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className={cn(
                      "flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-accent",
                      selectedCategory === category.id && "bg-accent"
                    )}
                    onClick={() => onCategorySelect(category.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn("h-3 w-3 rounded-full", category.color)} />
                      <div className="text-muted-foreground">
                        {getCategoryIcon(category.icon)}
                      </div>
                      <span>{category.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {!['meeting', 'deadline', 'task', 'other'].includes(category.id) && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent side="left" className="w-auto p-2">
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => startEditCategory(category)}
                              >
                                <Edit2 className="h-3.5 w-3.5 mr-1" /> Editar
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                onClick={() => handleDeleteCategory(category.id)}
                              >
                                <X className="h-3.5 w-3.5 mr-1" /> Excluir
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EventCategoryManager;