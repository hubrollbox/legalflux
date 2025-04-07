import React, { useState, useEffect } from "react";
import { ExternalLink, Plus, Search, Edit, Trash2, Save, X, FolderPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Link {
  id: string;
  name: string;
  url: string;
  description?: string;
  favorite?: boolean;
  tags?: string[];
}

interface Category {
  id: string;
  name: string;
  description?: string;
  links: Link[];
  icon?: string;
}

// Dados de exemplo
const INITIAL_CATEGORIES: Category[] = [
  {
    id: "tribunais",
    name: "Tribunais",
    description: "Links para os principais tribunais portugueses",
    icon: "⚖️",
    links: [
      { id: "1", name: "Supremo Tribunal de Justiça", url: "https://www.stj.pt/", tags: ["tribunal", "supremo"] },
      { id: "2", name: "Supremo Tribunal Administrativo", url: "https://www.stadministrativo.pt/", tags: ["tribunal", "administrativo"] },
      { id: "3", name: "Tribunal Constitucional", url: "https://www.tribunalconstitucional.pt/", tags: ["tribunal", "constitucional"] },
      { id: "4", name: "Tribunais Judiciais", url: "https://tribunais.org.pt/", tags: ["tribunal", "judicial"] },
    ]
  },
  {
    id: "entidades",
    name: "Entidades Reguladoras",
    description: "Entidades que regulam a prática jurídica",
    icon: "🏛️",
    links: [
      { id: "5", name: "Ordem dos Advogados", url: "https://portal.oa.pt/", favorite: true, tags: ["ordem", "advogados"] },
      { id: "6", name: "Direcção-Geral da Administração da Justiça", url: "https://dgaj.justica.gov.pt/", tags: ["dgaj"] },
      { id: "7", name: "Direcção-Geral da Política de Justiça", url: "https://dgpj.justica.gov.pt/", tags: ["dgpj"] },
      { id: "8", name: "Procuradoria-Geral da República", url: "https://www.ministeriopublico.pt/", tags: ["pgr", "ministério público"] },
    ]
  },
  {
    id: "bases",
    name: "Bases de Dados Jurídicas",
    description: "Repositórios de informação jurídica",
    icon: "📚",
    links: [
      { id: "9", name: "Diário da República Eletrónico", url: "https://dre.pt/", favorite: true, tags: ["dre", "legislação"] },
      { id: "10", name: "Base Jurídico-Documental", url: "https://jusnet.pt/", tags: ["jusnet", "documentos"] },
      { id: "11", name: "DIGESTO", url: "https://www.dgsi.pt/", tags: ["dgsi", "jurisprudência"] },
      { id: "12", name: "Base de Dados Jurídicas", url: "https://www.datajuris.pt/", tags: ["datajuris"] },
    ]
  },
  {
    id: "ensino",
    name: "Instituições de Ensino",
    description: "Faculdades e centros de estudo jurídico",
    icon: "🎓",
    links: [
      { id: "13", name: "Centro de Estudos Judiciários", url: "https://www.cej.mj.pt/", tags: ["cej", "formação"] },
      { id: "14", name: "Faculdade de Direito da Universidade de Lisboa", url: "https://www.fd.ulisboa.pt/", tags: ["fdul", "universidade"] },
      { id: "15", name: "Faculdade de Direito da Universidade de Coimbra", url: "https://www.uc.pt/fduc/", tags: ["fduc", "universidade"] },
      { id: "16", name: "Faculdade de Direito da Universidade do Porto", url: "https://www.direito.up.pt/", tags: ["fdup", "universidade"] },
    ]
  },
  {
    id: "servicos",
    name: "Portais de Serviços",
    description: "Serviços online para profissionais jurídicos",
    icon: "🖥️",
    links: [
      { id: "17", name: "Portal CITIUS", url: "https://citius.tribunaisnet.mj.pt/", favorite: true, tags: ["citius", "processo"] },
      { id: "18", name: "Portal das Finanças", url: "https://www.portaldasfinancas.gov.pt/", tags: ["finanças", "impostos"] },
      { id: "19", name: "Segurança Social Direta", url: "https://app.seg-social.pt/", tags: ["segurança social"] },
      { id: "20", name: "ePortugal", url: "https://eportugal.gov.pt/", tags: ["serviços públicos"] },
    ]
  },
];

const ImprovedLinksInterface: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [newLink, setNewLink] = useState<Partial<Link>>({ name: '', url: '', description: '', tags: [] });
  const [newCategory, setNewCategory] = useState<Partial<Category>>({ name: '', description: '', icon: '' });
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [newTagInput, setNewTagInput] = useState('');
  
  // Filtrar links com base na pesquisa e na aba ativa
  const filteredCategories = categories.map(category => {
    const filteredLinks = category.links.filter(link => {
      const matchesSearch = 
        link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (link.description && link.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (link.tags && link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesTab = 
        activeTab === 'all' ||
        (activeTab === 'favorites' && link.favorite) ||
        (activeTab === 'recent' && isRecent(link));
      
      return matchesSearch && matchesTab;
    });
    
    return {
      ...category,
      links: filteredLinks
    };
  }).filter(category => category.links.length > 0);
  
  // Função auxiliar para verificar se um link é recente (exemplo: adicionado nos últimos 7 dias)
  // Em uma aplicação real, você teria um timestamp para cada link
  const isRecent = (link: Link) => {
    // Simulação: links com IDs maiores que 15 são considerados recentes
    return parseInt(link.id) > 15;
  };

  const handleAddLink = () => {
    if (!newLink.name || !newLink.url || !selectedCategory) return;
    
    const updatedCategories = categories.map(category => {
      if (category.id === selectedCategory) {
        return {
          ...category,
          links: [
            ...category.links,
            {
              id: `new-${Date.now()}`,
              name: newLink.name,
              url: newLink.url,
              description: newLink.description,
              tags: newLink.tags,
              favorite: false
            } as Link
          ]
        };
      }
      return category;
    });
    
    setCategories(updatedCategories);
    setNewLink({ name: '', url: '', description: '', tags: [] });
    setSelectedCategory('');
  };

  const handleAddCategory = () => {
    if (!newCategory.name) return;
    
    const newCategoryObj: Category = {
      id: `cat-${Date.now()}`,
      name: newCategory.name,
      description: newCategory.description,
      icon: newCategory.icon,
      links: []
    };
    
    setCategories([...categories, newCategoryObj]);
    setNewCategory({ name: '', description: '', icon: '' });
  };

  const handleEditLink = (categoryId: string, linkId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    const link = category.links.find(l => l.id === linkId);
    if (!link) return;
    
    setEditingLink(link);
    setSelectedCategory(categoryId);
  };

  const handleSaveEditedLink = () => {
    if (!editingLink || !selectedCategory) return;
    
    const updatedCategories = categories.map(category => {
      if (category.id === selectedCategory) {
        return {
          ...category,
          links: category.links.map(link => 
            link.id === editingLink.id ? editingLink : link
          )
        };
      }
      return category;
    });
    
    setCategories(updatedCategories);
    setEditingLink(null);
    setSelectedCategory('');
  };

  const handleDeleteLink = (categoryId: string, linkId: string) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          links: category.links.filter(link => link.id !== linkId)
        };
      }
      return category;
    });
    
    setCategories(updatedCategories);
  };

  const handleToggleFavorite = (categoryId: string, linkId: string) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          links: category.links.map(link => {
            if (link.id === linkId) {
              return { ...link, favorite: !link.favorite };
            }
            return link;
          })
        };
      }
      return category;
    });
    
    setCategories(updatedCategories);
  };

  const handleAddTag = () => {
    if (!newTagInput.trim() || !editingLink) return;
    
    const newTags = [...(editingLink.tags || []), newTagInput.trim()];
    setEditingLink({ ...editingLink, tags: newTags });
    setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (!editingLink) return;
    
    const newTags = (editingLink.tags || []).filter(tag => tag !== tagToRemove);
    setEditingLink({ ...editingLink, tags: newTags });
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho e Pesquisa */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Links Úteis</h2>
          <p className="text-muted-foreground">Acesse rapidamente recursos jurídicos importantes</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquisar links..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Link</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoria</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome</label>
                  <Input 
                    value={newLink.name} 
                    onChange={(e) => setNewLink({...newLink, name: e.target.value})} 
                    placeholder="Nome do link"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL</label>
                  <Input 
                    value={newLink.url} 
                    onChange={(e) => setNewLink({...newLink, url: e.target.value})} 
                    placeholder="https://exemplo.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descrição (opcional)</label>
                  <Input 
                    value={newLink.description || ''} 
                    onChange={(e) => setNewLink({...newLink, description: e.target.value})} 
                    placeholder="Breve descrição do link"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddLink} disabled={!newLink.name || !newLink.url || !selectedCategory}>
                  Adicionar Link
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="h-4 w-4 mr-2" /> Nova Categoria
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Categoria</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome</label>
                  <Input 
                    value={newCategory.name} 
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})} 
                    placeholder="Nome da categoria"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descrição (opcional)</label>
                  <Input 
                    value={newCategory.description || ''} 
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})} 
                    placeholder="Breve descrição da categoria"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ícone (emoji)</label>
                  <Input 
                    value={newCategory.icon || ''} 
                    onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})} 
                    placeholder="Emoji para representar a categoria"
                    maxLength={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddCategory} disabled={!newCategory.name}>
                  Criar Categoria
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="favorites">Favoritos</TabsTrigger>
          <TabsTrigger value="recent">Recentes</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Lista de Links */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(category => (
            <Card key={category.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </CardTitle>
                {category.description && (
                  <CardDescription>{category.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[250px] pr-4">
                  <ul className="space-y-3">
                    {category.links.map(link => (
                      <li key={link.id} className="group relative border rounded-md p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <ExternalLink className="shrink-0 h-4 w-4 text-primary" />
                              <a 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {link.name}
                              </a>
                              {link.favorite && (
                                <Badge variant="secondary" className="ml-auto">Favorito</Badge>
                              )}
                            </div>
                            
                            {link.description && (
                              <p className="text-sm text-muted-foreground mt-1 ml-6">{link.description}</p>
                            )}
                            
                            {link.tags && link.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2 ml-6">
                                {link.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7" 
                              onClick={() => handleToggleFavorite(category.id, link.id)}
                            >
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill={link.favorite ? "currentColor" : "none"} 
                                stroke="currentColor" 
                                className="h-4 w-4 text-yellow-500"
                                strokeWidth={link.favorite ? "0" : "2"}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                              </svg>
                            </Button>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Editar Link</DialogTitle>
                                </DialogHeader>
                                {editingLink && (
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Nome</label>
                                      <Input 
                                        value={editingLink.name} 
                                        onChange={(e) => setEditingLink({...editingLink, name: e.target.value})} 
                                      />
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">URL</label>
                                      <Input 
                                        value={editingLink.url} 
                                        onChange={(e) => setEditingLink({...editingLink, url: e.target.value})} 
                                      />
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Descrição</label>
                                      <Input 
                                        value={editingLink.description || ''} 
                                        onChange={(e) => setEditingLink({...editingLink, description: e.target.value})} 
                                      />
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Tags</label>
                                      <div className="flex flex-wrap gap-1 mb-2">
                                        {editingLink.tags && editingLink.tags.map(tag => (
                                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                            {tag}
                                            <button 
                                              onClick={() => handleRemoveTag(tag)}
                                              className="ml-1 h-3 w-3 rounded-full bg-muted-foreground/30 flex items-center justify-center hover:bg-muted-foreground/50"
                                            >
                                              <X className="h-2 w-2" />
                                            </button>
                                          </Badge>
                                        ))}
                                      </div>
                                      <div className="flex gap-2">
                                        <Input 
                                          value={newTagInput} 
                                          onChange={(e) => setNewTagInput(e.target.value)} 
                                          placeholder="Nova tag"
                                          onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                                        />
                                        <Button 
                                          type="button" 
                                          variant="outline" 
                                          onClick={handleAddTag}
                                          disabled={!newTagInput.trim()}
                                        >
                                          Adicionar
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <Button onClick={handleSaveEditedLink}>
                                    Salvar Alterações
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10" 
                              onClick={() => handleDeleteLink(category.id, link.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="rounded-full bg-muted p-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Nenhum link encontrado</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 
                `Não encontramos links correspondentes a "${searchTerm}".` : 
                "Não há links disponíveis nesta categoria."}
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setActiveTab('all');
              }}
            >
              Mostrar todos os links
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ImprovedLinksInterface;