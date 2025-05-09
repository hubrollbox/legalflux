
import { TransactionStatus, TransactionType } from '@/types/financial';

export const translateTransactionType = (type: string): string => {
  const translations: Record<string, string> = {
    'invoice': 'Fatura',
    'payment': 'Pagamento',
    'refund': 'Reembolso',
    'income': 'Receita',
    'expense': 'Despesa',
    'other': 'Outro'
  };
  
  return translations[type] || type;
};

export const translateTransactionStatus = (status: string): string => {
  const translations: Record<string, string> = {
    'pending': 'Pendente',
    'completed': 'Concluído',
    'failed': 'Falhou',
    'cancelled': 'Cancelado',
    'refunded': 'Reembolsado',
    'overdue': 'Vencido'
  };
  
  return translations[status] || status;
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    'pending': 'text-amber-600 bg-amber-100',
    'completed': 'text-green-600 bg-green-100',
    'failed': 'text-red-600 bg-red-100',
    'cancelled': 'text-gray-600 bg-gray-100',
    'refunded': 'text-purple-600 bg-purple-100',
    'overdue': 'text-red-600 bg-red-100'
  };
  
  return colors[status] || 'text-gray-600 bg-gray-100';
};

export const exportToCSV = (
  transactions: any[], 
  translateType: (type: string) => string,
  translateStatus: (status: string) => string
) => {
  // Preparar os dados
  const headers = ['ID', 'Data', 'Descrição', 'Tipo', 'Status', 'Valor'];
  
  const rows = transactions.map(t => [
    t.id,
    typeof t.date === 'object' ? t.date.toLocaleDateString() : new Date(t.date).toLocaleDateString(),
    t.description || '',
    translateType(t.type),
    translateStatus(t.status),
    `${t.amount.toFixed(2)} €`
  ]);
  
  // Criar o conteúdo CSV
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Criar e baixar o arquivo
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `transacoes_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
