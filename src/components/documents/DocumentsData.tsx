
// Verificar se este arquivo existe e se contém dados de exemplo
// Se não existir, criamos um com dados mockados
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Dados de exemplo para documentos
export const mockDocuments = [
  {
    id: "doc1",
    name: "Contrato de Prestação de Serviços.pdf",
    type: "pdf",
    size: "2.4 MB",
    updatedAt: new Date(),
    owner: "João Silva",
    folder: "Contratos",
    process: "2023/001",
    tags: ["Contrato", "Cliente"],
    status: "signed"
  },
  {
    id: "doc2",
    name: "Procuração.docx",
    type: "docx",
    size: "1.5 MB",
    updatedAt: new Date(Date.now() - 3600000 * 24), // 1 dia atrás
    owner: "Maria Santos",
    folder: "Documentos Pessoais",
    process: "2023/002",
    tags: ["Procuração"],
    status: "unsigned"
  },
  {
    id: "doc3",
    name: "Petição Inicial.pdf",
    type: "pdf",
    size: "3.2 MB",
    updatedAt: new Date(Date.now() - 3600000 * 48), // 2 dias atrás
    owner: "António Costa",
    folder: "Processos",
    process: "2023/003",
    tags: ["Petição", "Processo"],
    status: "signed"
  },
  {
    id: "doc4",
    name: "Relatório Financeiro.xlsx",
    type: "xlsx",
    size: "1.8 MB",
    updatedAt: new Date(Date.now() - 3600000 * 72), // 3 dias atrás
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
    type: "docx",
    size: "125 KB",
    description: "Template de contrato de trabalho para novos colaboradores",
    updatedAt: format(new Date(), "dd/MM/yyyy", { locale: ptBR }),
    category: "Contratos"
  },
  {
    id: "temp2",
    name: "Petição Inicial Padrão",
    type: "docx",
    size: "345 KB",
    description: "Modelo base para petição inicial em processos civis",
    updatedAt: format(new Date(Date.now() - 3600000 * 24), "dd/MM/yyyy", { locale: ptBR }), // 1 dia atrás
    category: "Petições"
  },
  {
    id: "temp3",
    name: "Procuração Ad Judicia",
    type: "docx",
    size: "98 KB",
    description: "Modelo de procuração para representação judicial",
    updatedAt: format(new Date(Date.now() - 3600000 * 48), "dd/MM/yyyy", { locale: ptBR }), // 2 dias atrás
    category: "Documentos"
  },
  {
    id: "temp4",
    name: "Contrato de Prestação de Serviços",
    type: "docx",
    size: "215 KB",
    description: "Template para contrato de prestação de serviços",
    updatedAt: format(new Date(Date.now() - 3600000 * 72), "dd/MM/yyyy", { locale: ptBR }), // 3 dias atrás
    category: "Contratos"
  }
];

// Função utilizada para formatar datas (se necessário)
export function formatDocumentDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return format(date, "dd/MM/yyyy", { locale: ptBR });
}
