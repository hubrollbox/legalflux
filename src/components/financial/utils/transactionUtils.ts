
import { FinancialTransaction, TransactionType, TransactionStatus } from "@/types/financial";

// Traduz o tipo de transação para português
export const translateTransactionType = (type: string): string => {
  switch (type) {
    case 'income':
      return "Receita";
    case 'expense':
      return "Despesa";
    case 'payment':
      return "Pagamento";
    case 'invoice':
      return "Fatura";
    case 'refund':
      return "Reembolso";
    default:
      return type;
  }
};

// Traduz o status da transação para português
export const translateTransactionStatus = (status: string): string => {
  switch (status) {
    case 'pending':
      return "Pendente";
    case 'completed':
      return "Concluída";
    case 'cancelled':
    case 'canceled':
      return "Cancelada";
    case 'failed':
      return "Falha";
    case 'processing':
      return "Em processamento";
    default:
      return status;
  }
};

// Retorna a cor do badge baseada no status
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    case 'completed':
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case 'cancelled':
    case 'canceled':
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    case 'failed':
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case 'processing':
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

// Exporta as transações para CSV
export const exportToCSV = (
  transactions: FinancialTransaction[],
  translateType: (type: string) => string,
  translateStatus: (status: string) => string
) => {
  // Cabeçalhos do CSV
  const headers = [
    "ID",
    "Data",
    "Descrição",
    "Valor",
    "Tipo",
    "Status",
    "Categoria",
    "Cliente",
    "Processo",
  ];

  // Converte as transações para o formato CSV
  const csvData = transactions.map((transaction) => [
    transaction.id,
    new Date(transaction.date).toLocaleDateString("pt-PT"),
    transaction.description,
    transaction.amount.toFixed(2),
    translateType(transaction.type),
    translateStatus(transaction.status),
    transaction.category || "",
    transaction.clientName || "",
    transaction.processId || "",
  ]);

  // Combina cabeçalhos e dados
  const csvContent = [headers, ...csvData]
    .map((e) => e.join(","))
    .join("\n");

  // Cria um Blob com o conteúdo CSV
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // Cria um link para download e clica nele
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `transacoes_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
