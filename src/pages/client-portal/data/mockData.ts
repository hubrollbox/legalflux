
// Processos simulados
export const ProcessesData = [
  {
    id: "proc-001",
    title: "Ação de Indemnização",
    type: "Cível",
    status: "Em Curso",
    description: "Processo sobre pedido de indemnização por danos materiais resultantes de acidente de viação ocorrido em 12/03/2023 na A1. O valor da causa é de 25.000€.",
    lastUpdate: "2023-11-15",
    documents: 12,
    nextHearing: "2024-05-20"
  },
  {
    id: "proc-002",
    title: "Processo de Divórcio",
    type: "Família",
    status: "Em Curso",
    description: "Processo de divórcio por mútuo consentimento, com regulação das responsabilidades parentais de dois filhos menores. Inclui partilha de bens comuns.",
    lastUpdate: "2023-12-03",
    documents: 8,
    nextHearing: "2024-04-18"
  },
  {
    id: "proc-003",
    title: "Contrato de Arrendamento",
    type: "Imobiliário",
    status: "Concluído",
    description: "Contrato de arrendamento comercial para estabelecimento no centro de Lisboa, com duração de 5 anos e renda mensal de 1.500€.",
    lastUpdate: "2023-10-10",
    documents: 4,
    nextHearing: null
  },
  {
    id: "proc-004",
    title: "Impugnação Fiscal",
    type: "Tributário",
    status: "Em Espera",
    description: "Processo de impugnação de liquidação adicional de IRS referente ao ano de 2021, no valor de 12.450€, por divergências na consideração de despesas de saúde.",
    lastUpdate: "2023-09-22",
    documents: 15,
    nextHearing: "2024-06-12"
  },
  {
    id: "proc-005",
    title: "Processo Laboral",
    type: "Trabalho",
    status: "Em Curso",
    description: "Ação de impugnação de despedimento por alegada justa causa, com pedido de reintegração e pagamento de salários em atraso desde janeiro de 2023.",
    lastUpdate: "2023-12-18",
    documents: 10,
    nextHearing: "2024-04-30"
  }
];

// Mensagens simuladas
export const MessageMockData = [
  {
    id: "msg-001",
    subject: "Actualização do Processo",
    content: "Informamos que a audiência preliminar foi agendada para o dia 20 de Maio de 2024, pelas 10h00, no Tribunal de Comarca de Lisboa.",
    sender: "Dr. António Ribeiro",
    date: "2024-03-28",
    read: true,
    processId: "proc-001"
  },
  {
    id: "msg-002",
    subject: "Documentos necessários",
    content: "Para a próxima fase do processo, solicitamos que nos envie os seguintes documentos: comprovativo de morada atual, declaração de IRS de 2023 e extratos bancários dos últimos 3 meses.",
    sender: "Dra. Maria Lopes",
    date: "2024-04-01",
    read: false,
    processId: "proc-002"
  },
  {
    id: "msg-003",
    subject: "Proposta de acordo",
    content: "Recebemos uma proposta de acordo da contraparte que gostaríamos de discutir consigo. A proposta inclui um pagamento de 15.000€ como compensação total.",
    sender: "Dr. José Silva",
    date: "2024-04-02",
    read: false,
    processId: "proc-001"
  }
];
