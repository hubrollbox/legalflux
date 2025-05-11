export const getTransactionsByUser = (userId: string) => {
  // Simulação de dados para transações financeiras
  return [
    {
      id: '1',
      amount: 1500,
      type: 'income',
      description: 'Pagamento de honorários - Processo A',
      category: 'fees',
      date: new Date(2023, 4, 15),
      client: 'Cliente A'
    },
    {
      id: '2',
      amount: 800,
      type: 'income',
      description: 'Pagamento de honorários - Processo B',
      category: 'fees',
      date: new Date(2023, 4, 20),
      client: 'Cliente B'
    },
    {
      id: '3',
      amount: 250,
      type: 'expense',
      description: 'Custas judiciais',
      category: 'court_fees',
      date: new Date(2023, 4, 22),
      client: 'Cliente A'
    },
    {
      id: '4',
      amount: 120,
      type: 'expense',
      description: 'Material de escritório',
      category: 'supplies',
      date: new Date(2023, 4, 25),
      client: null
    }
  ];
};
