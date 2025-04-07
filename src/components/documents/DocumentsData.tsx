
// Mock data for documents
export const mockDocuments = [
  {
    id: "doc1",
    name: "Contrato de Arrendamento_v2.pdf",
    type: "pdf",
    size: "2.4 MB",
    updatedAt: "2023-12-05T10:30:00",
    owner: "Maria Costa",
    folder: "Contratos",
    process: "2023/1234",
    tags: ["contrato", "arrendamento"]
  },
  {
    id: "doc2",
    name: "Escritura_Compra_Venda.pdf",
    type: "pdf",
    size: "3.1 MB",
    updatedAt: "2023-12-04T14:15:00",
    owner: "João Silva",
    folder: "Escrituras",
    process: "2023/1235",
    tags: ["escritura", "compra-venda"]
  },
  {
    id: "doc3",
    name: "Procuração_2023.docx",
    type: "docx",
    size: "1.2 MB",
    updatedAt: "2023-12-03T09:45:00",
    owner: "Pedro Santos",
    folder: "Procurações",
    process: "2023/1236",
    tags: ["procuração", "legal"]
  },
  {
    id: "doc4",
    name: "Petição_Inicial.docx",
    type: "docx",
    size: "1.7 MB",
    updatedAt: "2023-12-02T16:20:00",
    owner: "Ana Oliveira",
    folder: "Petições",
    process: "2023/1234",
    tags: ["petição", "inicial"]
  },
  {
    id: "doc5",
    name: "Decisão_Tribunal.pdf",
    type: "pdf",
    size: "4.2 MB",
    updatedAt: "2023-12-01T11:10:00",
    owner: "Carlos Lima",
    tags: ["decisão", "tribunal"],
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

// Mock data for templates
export const mockTemplates = [
  {
    id: "temp1",
    name: "Contrato de Arrendamento",
    type: "docx",
    size: "1.8 MB",
    description: "Modelo padrão para contratos de arrendamento residencial",
    updatedAt: "2023-10-15T14:30:00",
    category: "Contratos"
  },
  {
    id: "temp2",
    name: "Procuração Geral",
    type: "docx",
    size: "1.2 MB",
    description: "Procuração com poderes gerais para representação",
    updatedAt: "2023-10-10T09:20:00",
    category: "Procurações"
  },
  {
    id: "temp3",
    name: "Petição Inicial - Processo Civil",
    type: "docx",
    size: "2.5 MB",
    description: "Modelo básico para petição inicial em processo civil",
    updatedAt: "2023-09-28T11:45:00",
    category: "Petições"
  },
  {
    id: "temp4",
    name: "Contestação",
    type: "docx",
    size: "2.1 MB",
    description: "Modelo de contestação para processos cíveis",
    updatedAt: "2023-09-15T16:20:00",
    category: "Contestações"
  },
  {
    id: "temp5",
    name: "Contrato de Prestação de Serviços",
    type: "docx",
    size: "1.9 MB",
    description: "Modelo para contrato de prestação de serviços",
    updatedAt: "2023-09-05T10:10:00",
    category: "Contratos"
  },
  {
    id: "temp6",
    name: "Declaração de Testemunha",
    type: "docx",
    size: "0.8 MB",
    description: "Modelo para declarações de testemunhas em processos",
    updatedAt: "2023-08-22T14:30:00",
    category: "Declarações"
  }
];
