import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Process } from '@/types';
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"

const Processes = () => {
  const [processes, setProcesses] = useState<Process[]>([
    {
      id: "1",
      title: "Análise Contratual",
      clientName: "Empresa XPTO",
      type: "Contratos",
      deadline: "2024-07-15",
      status: "Em andamento",
      progress: 60,
      responsible: "João Silva",
      priority: "Alta"
    },
    {
      id: "2",
      title: "Defesa em Litígio",
      clientName: "Maria Oliveira",
      type: "Cível",
      deadline: "2024-08-20",
      status: "Pendente",
      progress: 25,
      responsible: "Ana Santos",
      priority: "Média"
    },
    {
      id: "3",
      title: "Consultoria Tributária",
      clientName: "Organização Beta",
      type: "Tributário",
      deadline: "2024-09-10",
      status: "Concluído",
      progress: 100,
      responsible: "Carlos Pereira",
      priority: "Baixa"
    },
  ]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date("2024-12-20"))
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => document.body.style.overflow = 'unset';
  }, [open]);

  const filteredProcesses = processes.filter(process =>
    process.title.toLowerCase().includes(search.toLowerCase()) ||
    process.clientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center">
          <Input
            placeholder="Pesquisar processos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Processo</DialogTitle>
              <DialogDescription>
                Adicione um novo processo à sua lista.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Título
                </Label>
                <Input id="name" value="Teste" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Cliente
                </Label>
                <Input id="username" value="Teste" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Tipo
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Cível</SelectItem>
                    <SelectItem value="dark">Criminal</SelectItem>
                    <SelectItem value="system">Trabalhista</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Data Limite
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP", { locale: pt }) : (
                        <span>Escolha uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) =>
                        date < new Date("2022-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Status
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Em andamento</SelectItem>
                    <SelectItem value="dark">Concluído</SelectItem>
                    <SelectItem value="system">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Descrição
                </Label>
                <Textarea id="bio" value="Teste" className="col-span-3" />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="md:block">
        <ScrollArea>
          <Table>
            <TableCaption>Lista de processos jurídicos.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Processo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data Limite</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcesses.map((process) => (
                <TableRow key={process.id}>
                  <TableCell className="font-medium">{process.title}</TableCell>
                  <TableCell>{process.clientName}</TableCell>
                  <TableCell>{process.type}</TableCell>
                  <TableCell>{format(new Date(process.deadline), 'PP', { locale: pt })}</TableCell>
                  <TableCell>
                    {process.status === "Concluído" ? (
                      <Badge variant="success">Concluído</Badge>
                    ) : process.status === "Em andamento" ? (
                      <Badge variant="default">Em andamento</Badge>
                    ) : (
                      <Badge variant="destructive">Pendente</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setOpen(true)
                            toast({
                              title: "Tem a certeza que quer eliminar este processo?",
                              description: "Esta ação não pode ser revertida.",
                            })
                          }}
                        >
                          Eliminar
                          <Trash2 className="ml-2 h-4 w-4" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
                  Total de processos: {processes.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Processes;
