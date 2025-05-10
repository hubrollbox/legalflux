
import { FinancialTransaction } from "@/types/financial";
import { formatDate } from "@/utils/dateUtils";

export const translateTransactionType = (type: string): string => {
  switch (type) {
    case 'invoice':
      return 'Fatura';
    case 'payment':
      return 'Pagamento';
    case 'refund':
      return 'Reembolso';
    case 'income':
      return 'Receita';
    case 'expense':
      return 'Despesa';
    default:
      return type;
  }
};

export const translateTransactionStatus = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'completed':
      return 'Concluído';
    case 'failed':
      return 'Falhou';
    case 'cancelled':
      return 'Cancelado';
    case 'canceled':
      return 'Cancelado';
    case 'refunded':
      return 'Reembolsado';
    case 'overdue':
      return 'Vencido';
    default:
      return status;
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'completed':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'failed':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'cancelled':
    case 'canceled':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    case 'refunded':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    case 'overdue':
      return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
    default:
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
  }
};

export const exportToCSV = (
  transactions: FinancialTransaction[], 
  translateType: (type: string) => string,
  translateStatus: (status: string) => string
) => {
  // Cabeçalhos do CSV
  const headers = [
    'ID', 
    'Valor', 
    'Tipo', 
    'Status', 
    'Data', 
    'Descrição', 
    'Cliente', 
    'Processo'
  ].join(',');
  
  // Dados do CSV
  const csvData = transactions.map(t => {
    const data = [
      t.id,
      typeof t.amount === 'number' ? t.amount.toString() : t.amount,
      translateType(t.type.toString()),
      translateStatus(t.status.toString()),
      typeof t.date === 'string' ? t.date : formatDate(new Date(t.date), 'dd/MM/yyyy'),
      t.description ? `"${t.description.replace(/"/g, '""')}"` : '',
      t.clientName || t.client || '',
      t.processId || t.process || ''
    ];
    return data.join(',');
  }).join('\n');
  
  // Combina cabeçalhos e dados
  const csvString = `${headers}\n${csvData}`;
  
  // Cria um blob e um link para download
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `transacoes_${formatDate(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
