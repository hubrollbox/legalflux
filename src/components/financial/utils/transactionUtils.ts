
import { FinancialTransaction, TransactionType, TransactionStatus } from "@/types/financial";

// Traduz o tipo de transação para português
export const translateTransactionType = (type: string): string => {
  switch (type) {
    case TransactionType.INCOME:
      return "Receita";
    case TransactionType.EXPENSE:
      return "Despesa";
    case TransactionType.PAYMENT:
      return "Pagamento";
    case TransactionType.INVOICE:
      return "Fatura";
    case TransactionType.REFUND:
      return "Reembolso";
    default:
      return type;
  }
};

// Traduz o status da transação para português
export const translateTransactionStatus = (status: string): string => {
  switch (status) {
    case TransactionStatus.PENDING:
      return "Pendente";
    case TransactionStatus.COMPLETED:
      return "Concluída";
    case TransactionStatus.CANCELLED:
    case TransactionStatus.CANCELED:
      return "Cancelada";
    case TransactionStatus.FAILED:
      return "Falha";
    case TransactionStatus.PROCESSING:
      return "Em processamento";
    default:
      return status;
  }
};

// Retorna a cor do badge baseada no status
export const getStatusColor = (status: string): string => {
  switch (status) {
    case TransactionStatus.PENDING:
      return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    case TransactionStatus.COMPLETED:
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case TransactionStatus.CANCELLED:
    case TransactionStatus.CANCELED:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    case TransactionStatus.FAILED:
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case TransactionStatus.PROCESSING:
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

  // Junta os cabeçalhos e os dados em um string CSV
  const csv = [headers, ...csvData].map((row) => row.join(",")).join("\n");

  // Cria um blob e download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `transacoes_${new Date().toLocaleDateString("pt-PT").replace(/\//g, "-")}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
