
import React, { useState } from "react";
import { Upload, FolderPlus, Search, Grid, List, FileText, FileCode, File, FileImage, MoreHorizontal } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePermissions } from "@/hooks/usePermissions";

// Mock data for documents
const mockDocuments = [
  {
    id: "doc1",
    name: "Contrato de Arrendamento_v2.pdf",
    type: "pdf",
    size: "2.4 MB",
    updatedAt: "2023-12-05T10:30:00",
    owner: "Maria Costa",
    folder: "Contratos",
    process: "2023/1234"
  },
  {
    id: "doc2",
    name: "Escritura_Compra_Venda.pdf",
    type: "pdf",
    size: "3.1 MB",
    updatedAt: "2023-12-04T14:15:00",
    owner: "João Silva",
    folder: "Escrituras",
    process: "2023/1235"
  },
  {
    id: "doc3",
    name: "Procuração_2023.docx",
    type: "docx",
    size: "1.2 MB",
    updatedAt: "2023-12-03T09:45:00",
    owner: "Pedro Santos",
    folder: "Procurações",
    process: "2023/1236"
  },
  {
    id: "doc4",
    name: "Petição_Inicial.docx",
    type: "docx",
    size: "1.7 MB",
    updatedAt: "2023-12-02T16:20:00",
    owner: "Ana Oliveira",
    folder: "Petições",
    process: "2023/1234"
  },
  {
    id: "doc5",
    name: "Decisão_Tribunal.pdf",
    type: "pdf",
    size: "4.2 MB",
    updatedAt: "2023-12-01T11:10:00",
    owner: "Carlos Lima",
    folder: "Decisões",
    process: "2023/1237"
  },
  {
    id: "doc6",
    name: "Testemunhas_Lista.xlsx",
    type: "xlsx",
    size: "0.8 MB",
    updatedAt: "2023-11-30T13:50:00",
    owner: "Marta Ferreira",
    folder: "Listas",
    process: "2023/1238"
  },
  {
    id: "doc7",
    name: "Cálculo_Indemnização.xlsx",
    type: "xlsx",
    size: "1.5 MB",
    updatedAt: "2023-11-29T15:30:00",
    owner: "Rui Vieira",
    folder: "Cálculos",
    process: "2023/1234"
  },
  {
    id: "doc8",
    name: "Parecer_Jurídico.pdf",
    type: "pdf",
    size: "2.9 MB",
    updatedAt: "2023-11-28T10:00:00",
    owner: "Sofia Martins",
    folder: "Pareceres",
    process: "2023/1235"
  }
];

// Function to get the appropriate icon based on file type
const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <File className="h-10 w-10 text-red-500" />;
    case "docx":
      return <FileText className="h-10 w-10 text-blue-500" />;
    case "xlsx":
      return <FileCode className="h-10 w-10 text-green-500" />;
    case "jpg":
    case "png":
      return <FileImage className="h-10 w-10 text-purple-500" />;
    default:
      return <FileText className="h-10 w-10 text-gray-500" />;
  }
};

// Function to format the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const Documents = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const { hasPermission } = usePermissions();
  const canCreateDocument = hasPermission("documents", "create");
  
  const filteredDocuments = mockDocuments.filter(
    doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.folder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.process.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Documentos</h1>
              <p className="text-muted-foreground">
                Gerencie todos os documentos dos seus processos jurídicos
              </p>
            </div>
            {canCreateDocument && (
              <div className="flex space-x-2">
                <Button>
                  <Upload className="mr-2 h-4 w-4" /> Carregar
                </Button>
                <Button variant="outline">
                  <FolderPlus className="mr-2 h-4 w-4" /> Nova Pasta
                </Button>
              </div>
            )}
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="recent">Recentes</TabsTrigger>
                <TabsTrigger value="shared">Partilhados</TabsTrigger>
                <TabsTrigger value="deleted">Eliminados</TabsTrigger>
              </TabsList>
              <div className="flex space-x-2">
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="my-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar documentos..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="all" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Todos os Documentos</CardTitle>
                  <CardDescription>
                    {filteredDocuments.length} documento(s) encontrado(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredDocuments.map((doc) => (
                        <Card key={doc.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="p-4 flex flex-col items-center text-center">
                              {getFileIcon(doc.type)}
                              <h3 className="mt-2 font-medium truncate w-full">{doc.name}</h3>
                              <p className="text-sm text-muted-foreground">{doc.size}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Atualizado: {formatDate(doc.updatedAt)}
                              </p>
                            </div>
                            <div className="bg-muted p-2 flex justify-between items-center">
                              <span className="text-xs truncate">{doc.process}</span>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Ver</DropdownMenuItem>
                                  <DropdownMenuItem>Descarregar</DropdownMenuItem>
                                  <DropdownMenuItem>Partilhar</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Eliminar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted">
                            <th className="text-left py-3 px-4">Nome</th>
                            <th className="text-left py-3 px-4">Tipo</th>
                            <th className="text-left py-3 px-4">Tamanho</th>
                            <th className="text-left py-3 px-4">Atualizado</th>
                            <th className="text-left py-3 px-4">Processo</th>
                            <th className="text-right py-3 px-4">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDocuments.map((doc) => (
                            <tr key={doc.id} className="border-t">
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  {getFileIcon(doc.type)}
                                  <span className="ml-2">{doc.name}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 uppercase">{doc.type}</td>
                              <td className="py-3 px-4">{doc.size}</td>
                              <td className="py-3 px-4">{formatDate(doc.updatedAt)}</td>
                              <td className="py-3 px-4">{doc.process}</td>
                              <td className="py-3 px-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Ver</DropdownMenuItem>
                                    <DropdownMenuItem>Descarregar</DropdownMenuItem>
                                    <DropdownMenuItem>Partilhar</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      Eliminar
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {filteredDocuments.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          Nenhum documento encontrado com os critérios de pesquisa atuais.
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recent">
              <Card>
                <CardHeader>
                  <CardTitle>Documentos Recentes</CardTitle>
                  <CardDescription>
                    Documentos atualizados nas últimas 72 horas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Esta secção mostrará os documentos mais recentemente modificados.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shared">
              <Card>
                <CardHeader>
                  <CardTitle>Documentos Partilhados</CardTitle>
                  <CardDescription>
                    Documentos partilhados consigo por outros utilizadores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Esta secção mostrará os documentos partilhados com o utilizador.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="deleted">
              <Card>
                <CardHeader>
                  <CardTitle>Documentos Eliminados</CardTitle>
                  <CardDescription>
                    Documentos na reciclagem (serão eliminados permanentemente após 30 dias)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Esta secção mostrará os documentos que foram eliminados e podem ser recuperados.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Documents;
