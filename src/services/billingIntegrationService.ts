import { notifyUsers } from './notificationService';

export interface BillingProvider {
  id: string;
  name: string;
  icon: string;
  isConnected: boolean;
  lastSync?: Date;
  features: {
    invoicing: boolean;
    payments: boolean;
    expenses: boolean;
    reports: boolean;
  };
}

export interface Invoice {
  id: string;
  number: string;
  description: string;
  amount: number;
  issueDate: Date;
  dueDate: Date;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'canceled';
  clientId?: string;
  clientName?: string;
  processId?: string;
  processNumber?: string;
  items: InvoiceItem[];
  notes?: string;
  externalId?: string;
  externalSystemId?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  date: Date;
  method: 'bank_transfer' | 'credit_card' | 'debit_card' | 'cash' | 'other';
  reference?: string;
  notes?: string;
  externalId?: string;
  externalSystemId?: string;
}

export interface SyncOptions {
  syncInvoices: boolean;
  syncPayments: boolean;
  syncExpenses: boolean;
  syncClients: boolean;
  autoCreateInvoices: boolean;
  twoWaySync: boolean;
}

export interface BillingIntegrationResult {
  success: boolean;
  message: string;
  provider?: string;
  invoices?: Invoice[];
  payments?: Payment[];
  error?: any;
}

class BillingIntegrationService {
  private providers: Map<string, BillingProvider> = new Map();
  private syncOptions: SyncOptions = {
    syncInvoices: true,
    syncPayments: true,
    syncExpenses: true,
    syncClients: true,
    autoCreateInvoices: false,
    twoWaySync: false
  };

  constructor() {
    // Inicializar provedores de faturação disponíveis
    this.providers.set('invoicexpress', {
      id: 'invoicexpress',
      name: 'InvoiceXpress',
      icon: '/img/integrations/invoicexpress.svg',
      isConnected: false,
      features: {
        invoicing: true,
        payments: true,
        expenses: true,
        reports: true
      }
    });

    this.providers.set('moloni', {
      id: 'moloni',
      name: 'Moloni',
      icon: '/img/integrations/moloni.svg',
      isConnected: false,
      features: {
        invoicing: true,
        payments: true,
        expenses: true,
        reports: true
      }
    });

    this.providers.set('sage', {
      id: 'sage',
      name: 'Sage',
      icon: '/img/integrations/sage.svg',
      isConnected: false,
      features: {
        invoicing: true,
        payments: true,
        expenses: true,
        reports: true
      }
    });

    this.providers.set('primavera', {
      id: 'primavera',
      name: 'Primavera',
      icon: '/img/integrations/primavera.svg',
      isConnected: false,
      features: {
        invoicing: true,
        payments: true,
        expenses: true,
        reports: true
      }
    });
  }

  /**
   * Obtém a lista de provedores de faturação disponíveis
   */
  getProviders(): BillingProvider[] {
    return Array.from(this.providers.values());
  }

  /**
   * Obtém um provedor específico pelo ID
   */
  getProvider(providerId: string): BillingProvider | undefined {
    return this.providers.get(providerId);
  }

  /**
   * Obtém as opções de sincronização atuais
   */
  getSyncOptions(): SyncOptions {
    return { ...this.syncOptions };
  }

  /**
   * Atualiza as opções de sincronização
   */
  updateSyncOptions(options: Partial<SyncOptions>): SyncOptions {
    this.syncOptions = { ...this.syncOptions, ...options };
    return this.syncOptions;
  }

  /**
   * Conecta a um provedor de faturação
   * Em uma implementação real, isso envolveria OAuth ou outro mecanismo de autenticação
   */
  async connectProvider(providerId: string, credentials?: any): Promise<BillingIntegrationResult> {
    const provider = this.providers.get(providerId);
    
    if (!provider) {
      return {
        success: false,
        message: `Provedor de faturação '${providerId}' não encontrado`,
        provider: providerId
      };
    }

    try {
      // Simulação de conexão bem-sucedida
      // Em uma implementação real, isso envolveria OAuth ou outro mecanismo de autenticação
      const updatedProvider = {
        ...provider,
        isConnected: true,
        lastSync: new Date()
      };

      this.providers.set(providerId, updatedProvider);

      // Notificar usuários sobre a conexão bem-sucedida
      await notifyUsers({
        title: 'Sistema de Faturação Conectado',
        message: `O LegalFlux foi conectado com sucesso ao ${provider.name}`,
        type: 'action',
        data: { providerId }
      });

      return {
        success: true,
        message: `Conectado com sucesso ao ${provider.name}`,
        provider: providerId
      };
    } catch (error) {
      console.error(`Erro ao conectar ao ${provider.name}:`, error);
      return {
        success: false,
        message: `Falha ao conectar ao ${provider.name}`,
        provider: providerId,
        error
      };
    }
  }

  /**
   * Desconecta de um provedor de faturação
   */
  async disconnectProvider(providerId: string): Promise<BillingIntegrationResult> {
    const provider = this.providers.get(providerId);
    
    if (!provider) {
      return {
        success: false,
        message: `Provedor de faturação '${providerId}' não encontrado`,
        provider: providerId
      };
    }

    try {
      // Simulação de desconexão bem-sucedida
      const updatedProvider = {
        ...provider,
        isConnected: false,
        lastSync: undefined
      };

      this.providers.set(providerId, updatedProvider);

      return {
        success: true,
        message: `Desconectado com sucesso do ${provider.name}`,
        provider: providerId
      };
    } catch (error) {
      console.error(`Erro ao desconectar do ${provider.name}:`, error);
      return {
        success: false,
        message: `Falha ao desconectar do ${provider.name}`,
        provider: providerId,
        error
      };
    }
  }

  /**
   * Sincroniza faturas com um provedor de faturação
   */
  async syncInvoices(providerId: string, invoices: Invoice[]): Promise<BillingIntegrationResult> {
    const provider = this.providers.get(providerId);
    
    if (!provider) {
      return {
        success: false,
        message: `Provedor de faturação '${providerId}' não encontrado`,
        provider: providerId
      };
    }

    if (!provider.isConnected) {
      return {
        success: false,
        message: `Provedor de faturação '${provider.name}' não está conectado`,
        provider: providerId
      };
    }

    if (!this.syncOptions.syncInvoices) {
      return {
        success: false,
        message: `Sincronização de faturas não está ativada`,
        provider: providerId
      };
    }

    try {
      // Simulação de sincronização bem-sucedida
      // Em uma implementação real, isso envolveria chamadas à API do provedor de faturação
      const syncedInvoices = invoices.map(invoice => ({
        ...invoice,
        externalId: `ext_${invoice.id}`,
        externalSystemId: providerId
      }));

      // Atualizar o timestamp da última sincronização
      const updatedProvider = {
        ...provider,
        lastSync: new Date()
      };

      this.providers.set(providerId, updatedProvider);

      // Notificar usuários sobre a sincronização bem-sucedida
      await notifyUsers({
        title: 'Faturas Sincronizadas',
        message: `${syncedInvoices.length} faturas foram sincronizadas com ${provider.name}`,
        type: 'action',
        data: { providerId, invoiceCount: syncedInvoices.length }
      });

      return {
        success: true,
        message: `${syncedInvoices.length} faturas sincronizadas com sucesso`,
        provider: providerId,
        invoices: syncedInvoices
      };
    } catch (error) {
      console.error(`Erro ao sincronizar faturas com ${provider.name}:`, error);
      return {
        success: false,
        message: `Falha ao sincronizar faturas com ${provider.name}`,
        provider: providerId,
        error
      };
    }
  }

  /**
   * Sincroniza pagamentos com um provedor de faturação
   */
  async syncPayments(providerId: string, payments: Payment[]): Promise<BillingIntegrationResult> {
    const provider = this.providers.get(providerId);
    
    if (!provider) {
      return {
        success: false,
        message: `Provedor de faturação '${providerId}' não encontrado`,
        provider: providerId
      };
    }

    if (!provider.isConnected) {
      return {
        success: false,
        message: `Provedor de faturação '${provider.name}' não está conectado`,
        provider: providerId
      };
    }

    if (!this.syncOptions.syncPayments) {
      return {
        success: false,
        message: `Sincronização de pagamentos não está ativada`,
        provider: providerId
      };
    }

    try {
      // Simulação de sincronização bem-sucedida
      // Em uma implementação real, isso envolveria chamadas à API do provedor de faturação
      const syncedPayments = payments.map(payment => ({
        ...payment,
        externalId: `ext_${payment.id}`,
        externalSystemId: providerId
      }));

      // Atualizar o timestamp da última sincronização
      const updatedProvider = {
        ...provider,
        lastSync: new Date()
      };

      this.providers.set(providerId, updatedProvider);

      // Notificar usuários sobre a sincronização bem-sucedida
      await notifyUsers({
        title: 'Pagamentos Sincronizados',
        message: `${syncedPayments.length} pagamentos foram sincronizados com ${provider.name}`,
        type: 'action',
        data: { providerId, paymentCount: syncedPayments.length }
      });

      return {
        success: true,
        message: `${syncedPayments.length} pagamentos sincronizados com sucesso`,
        provider: providerId,
        payments: syncedPayments
      };
    } catch (error) {
      console.error(`Erro ao sincronizar pagamentos com ${provider.name}:`, error);
      return {
        success: false,
        message: `Falha ao sincronizar pagamentos com ${provider.name}`,
        provider: providerId,
        error
      };
    }
  }

  /**
   * Importa faturas de um provedor de faturação
   * Usado quando a sincronização bidirecional está ativada
   */
  async importInvoices(providerId: string, startDate?: Date, endDate?: Date): Promise<BillingIntegrationResult> {
    const provider = this.providers.get(providerId);
    
    if (!provider) {
      return {
        success: false,
        message: `Provedor de faturação '${providerId}' não encontrado`,
        provider: providerId
      };
    }

    if (!provider.isConnected) {
      return {
        success: false,
        message: `Provedor de faturação '${provider.name}' não está conectado`,
        provider: providerId
      };
    }

    if (!this.syncOptions.twoWaySync) {
      return {
        success: false,
        message: `Sincronização bidirecional não está ativada`,
        provider: providerId
      };
    }

    try {
      // Simulação de importação bem-sucedida
      // Em uma implementação real, isso envolveria chamadas à API do provedor de faturação
      const now = new Date();
      const mockInvoices: Invoice[] = [
        {
          id: crypto.randomUUID(),
          number: 'FT 2023/123',
          description: 'Honorários Advocatícios',
          amount: 1500.00,
          issueDate: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000), // 15 dias atrás
          dueDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000), // 15 dias à frente
          status: 'pending',
          clientName: 'Cliente Exemplo, Lda.',
          processNumber: '2023/12345',
          items: [
            {
              id: crypto.randomUUID(),
              description: 'Honorários - Processo 2023/12345',
              quantity: 1,
              unitPrice: 1500.00,
              taxRate: 23,
              total: 1500.00
            }
          ],
          externalId: 'ext_123',
          externalSystemId: providerId
        },
        {
          id: crypto.randomUUID(),
          number: 'FT 2023/124',
          description: 'Custas Processuais',
          amount: 350.00,
          issueDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 dias atrás
          dueDate: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000), // 20 dias à frente
          status: 'pending',
          clientName: 'Cliente Exemplo, Lda.',
          processNumber: '2023/12345',
          items: [
            {
              id: crypto.randomUUID(),
              description: 'Custas Processuais - Processo 2023/12345',
              quantity: 1,
              unitPrice: 350.00,
              taxRate: 23,
              total: 350.00
            }
          ],
          externalId: 'ext_456',
          externalSystemId: providerId
        }
      ];

      // Notificar usuários sobre a importação bem-sucedida
      await notifyUsers({
        title: 'Faturas Importadas',
        message: `${mockInvoices.length} faturas foram importadas de ${provider.name}`,
        type: 'action',
        data: { providerId, invoiceCount: mockInvoices.length }
      });

      return {
        success: true,
        message: `${mockInvoices.length} faturas importadas com sucesso`,
        provider: providerId,
        invoices: mockInvoices
      };
    } catch (error) {
      console.error(`Erro ao importar faturas de ${provider.name}:`, error);
      return {
        success: false,
        message: `Falha ao importar faturas de ${provider.name}`,
        provider: providerId,
        error
      };
    }
  }

  /**
   * Gera uma fatura a partir de dados do processo
   */
  async generateInvoiceFromProcess(processId: string, description: string, amount: number, items: Partial<InvoiceItem>[]): Promise<Invoice> {
    // Em uma implementação real, isso buscaria dados do processo e do cliente
    const processNumber = `2023/${Math.floor(Math.random() * 10000)}`;
    const clientName = 'Cliente Exemplo, Lda.';
    const clientId = crypto.randomUUID();
    
    const now = new Date();
    const dueDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 dias à frente
    
    // Calcular o próximo número de fatura
    const invoiceNumber = `FT ${now.getFullYear()}/${Math.floor(Math.random() * 1000)}`;
    
    // Criar itens da fatura com IDs
    const invoiceItems = items.map(item => ({
      id: crypto.randomUUID(),
      description: item.description || 'Serviços jurídicos',
      quantity: item.quantity || 1,
      unitPrice: item.unitPrice || amount,
      taxRate: item.taxRate || 23,
      total: item.quantity && item.unitPrice ? item.quantity * item.unitPrice : amount
    }));
    
    // Criar a fatura
    const invoice: Invoice = {
      id: crypto.randomUUID(),
      number: invoiceNumber,
      description,
      amount,
      issueDate: now,
      dueDate,
      status: 'draft',
      clientId,
      clientName,
      processId,
      processNumber,
      items: invoiceItems,
      notes: 'Gerado automaticamente pelo LegalFlux'
    };
    
    // Notificar usuários sobre a criação da fatura
    await notifyUsers({
      title: 'Fatura Criada',
      message: `Fatura ${invoiceNumber} criada para o processo ${processNumber}`,
      type: 'action',
      data: { invoiceId: invoice.id, processId }
    });
    
    return invoice;
  }

  /**
   * Registra um pagamento para uma fatura
   */
  async registerPayment(invoiceId: string, amount: number, method: Payment['method'], reference?: string): Promise<Payment> {
    // Em uma implementação real, isso verificaria se a fatura existe e atualizaria seu status
    
    const payment: Payment = {
      id: crypto.randomUUID(),
      invoiceId,
      amount,
      date: new Date(),
      method,
      reference,
      notes: 'Pagamento registrado manualmente'
    };
    
    // Notificar usuários sobre o registro do pagamento
    await notifyUsers({
      title: 'Pagamento Registrado',
      message: `Pagamento de €${amount.toFixed(2)} registrado para a fatura ${invoiceId}`,
      type: 'action',
      data: { paymentId: payment.id, invoiceId }
    });
    
    return payment;
  }
}

export const billingIntegrationService = new BillingIntegrationService();