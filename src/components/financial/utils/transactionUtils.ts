
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
    'pending': 'bg-yellow-500',
    'completed': 'bg-green-500',
    'failed': 'bg-red-500',
    'cancelled': 'bg-gray-500',
    'refunded': 'bg-blue-500',
    'overdue': 'bg-orange-500'
  };
  return colors[status] || 'bg-gray-500';
};

export const exportToCSV = (
  data: Array<{ id: string; amount: number; type: string; status: string; date: string | Date; description?: string }>,
  translateType: (type: string) => string,
  translateStatus: (status: string) => string
): void => {
  const headers = ['ID', 'Valor', 'Tipo', 'Status', 'Data', 'Descrição'];
  const csvData = data.map(t => [
    t.id,
    `${t.amount}`,
    translateType(t.type as string),
    translateStatus(t.status as string),
    new Date(t.date).toLocaleDateString('pt-PT'),
    t.description || ''
  ]);
  
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `transacoes_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
