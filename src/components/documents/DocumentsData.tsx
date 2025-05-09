
// Verificar se este arquivo existe e se contém dados de exemplo
// Se não existir, criamos um com dados mockados
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Dados de exemplo para documentos
export const mockDocuments = [
  {
    id: "doc1",
    name: "Contrato de Prestação de Serviços.pdf",
    type: "document",
    size: "2.4 MB",
    updatedAt: new Date().toISOString(),
    owner: "João Silva",
    folder: "Contratos",
    process: "2023/001",
    tags: ["Contrato", "Cliente"],
    status: "signed"
  },
  {
    id: "doc2",
    name: "Procuração.docx",
    type: "document",
    size: "1.5 MB",
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    owner: "Maria Santos",
    folder: "Documentos Pessoais",
    process: "2023/002",
    tags: ["Procuração"],
    status: "unsigned"
  },
  {
    id: "doc3",
    name: "Petição Inicial.pdf",
    type: "document",
    size: "3.2 MB",
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    owner: "António Costa",
    folder: "Processos",
    process: "2023/003",
    tags: ["Petição", "Processo"],
    status: "signed"
  },
  {
    id: "doc4",
    name: "Relatório Financeiro.xlsx",
    type: "document",
    size: "1.8 MB",
    updatedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    owner: "Ana Pereira",
    folder: "Financeiro",
    process: "2023/004",
    tags: ["Financeiro", "Relatório"],
    status: "unsigned"
  }
];

// Dados de exemplo para templates
export const mockTemplates = [
  {
    id: "temp1",
    name: "Contrato de Trabalho",
    type: "document",
    size: "125 KB",
    description: "Template de contrato de trabalho para novos colaboradores",
    updatedAt: format(new Date(), "dd/MM/yyyy", { locale: ptBR }),
    category: "Contratos"
  },
  {
    id: "temp2",
    name: "Petição Inicial Padrão",
    type: "document",
    size: "345 KB",
    description: "Modelo base para petição inicial em processos civis",
    updatedAt: format(new Date(Date.now() - 3600000 * 24), "dd/MM/yyyy", { locale: ptBR }),
    category: "Petições"
  },
  {
    id: "temp3",
    name: "Procuração Ad Judicia",
    type: "document",
    size: "98 KB",
    description: "Modelo de procuração para representação judicial",
    updatedAt: format(new Date(Date.now() - 3600000 * 48), "dd/MM/yyyy", { locale: ptBR }),
    category: "Documentos"
  },
  {
    id: "temp4",
    name: "Contrato de Prestação de Serviços",
    type: "document",
    size: "215 KB",
    description: "Template para contrato de prestação de serviços",
    updatedAt: format(new Date(Date.now() - 3600000 * 72), "dd/MM/yyyy", { locale: ptBR }),
    category: "Contratos"
  }
];

// Função utilizada para formatar datas (se necessário)
export function formatDocumentDate(date: Date | string): string {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return "";
  return format(dateObj, "dd/MM/yyyy");
}
