import { notifyUsers } from './notificationService';

export interface CalendarProvider {
  id: string;
  name: string;
  icon: string;
  isConnected: boolean;
  lastSync?: Date;
  exportEvent: (calendarId: string, event: CalendarEvent) => Promise<{ success: boolean; errors?: string[] }>;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  type: 'deadline' | 'hearing' | 'meeting' | 'other';
  processId?: string;
  clientId?: string;
  externalId?: string;
  externalCalendarId?: string;
  attendees?: string[];
  notes?: string;
  category?: string;
}

export interface SyncOptions {
  syncDeadlines: boolean;
  syncHearings: boolean;
  syncMeetings: boolean;
  syncInternalEvents: boolean;
  twoWaySync: boolean;
  reminderMinutes: number[];
}

export interface CalendarIntegrationResult {
  success: boolean;
  message: string;
  provider?: string;
  events?: CalendarEvent[];
  error?: any;
}

class CalendarIntegrationService {
  private providers: Map<string, CalendarProvider> = new Map();
  private syncOptions: SyncOptions = {
    syncDeadlines: true,
    syncHearings: true,
    syncMeetings: true,
    syncInternalEvents: false,
    twoWaySync: false,
    reminderMinutes: [30, 60 * 24] // 30 minutos e 1 dia
  };

  constructor() {
    // Inicializar provedores de calendário disponíveis
    this.providers.set('google', {
      id: 'google',
      name: 'Google Calendar',
      icon: '/img/integrations/google-calendar.svg',
      isConnected: false,
      exportEvent: async (calendarId: string, event: CalendarEvent) => { return { success: true }; }
    });

    this.providers.set('outlook', {
      id: 'outlook',
      name: 'Microsoft Outlook',
      icon: '/img/integrations/outlook.svg',
      isConnected: false,
      exportEvent: async (calendarId: string, event: CalendarEvent) => { return { success: true }; }
    });

    this.providers.set('apple', {
      id: 'apple',
      name: 'Apple Calendar',
      icon: '/img/integrations/apple-calendar.svg',
      isConnected: false,
      exportEvent: async (calendarId: string, event: CalendarEvent) => { return { success: true }; }
    });
  }

  /**
   * Obtém a lista de provedores de calendário disponíveis
   */
  getProviders(): CalendarProvider[] {
    return Array.from(this.providers.values());
  }

  /**
   * Obtém um provedor específico pelo ID
   */
  getProvider(providerId: string): CalendarProvider | undefined {
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
   * Conecta a um provedor de calendário
   * Em uma implementação real, isso envolveria OAuth ou outro mecanismo de autenticação
   */
  async connectProvider(providerId: string): Promise<CalendarIntegrationResult> {
    const provider = this.providers.get(providerId);
    
    if (!provider) {
      return {
        success: false,
        message: `Provedor de calendário '${providerId}' não encontrado`,
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
        title: 'Calendário Conectado',
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
   * Desconecta de um provedor de calendário
   */
  async disconnectProvider(providerId: string): Promise<CalendarIntegrationResult> {
    const provider = this.providers.get(providerId);
    
    if (!provider) {
      return {
        success: false,
        message: `Provedor de calendário '${providerId}' não encontrado`,
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
   * Sincroniza eventos com um provedor de calendário
   */
  async syncEvents(providerId: string, events: CalendarEvent[]): Promise<CalendarIntegrationResult> {
    const provider = this.providers.get(providerId);
    
    if (!provider) {
      return {
        success: false,
        message: `Provedor de calendário '${providerId}' não encontrado`,
        provider: providerId
      };
    }

    if (!provider.isConnected) {
      return {
        success: false,
        message: `Provedor de calendário '${provider.name}' não está conectado`,
        provider: providerId
      };
    }

    try {
      // Filtrar eventos com base nas opções de sincronização
      const filteredEvents = events.filter(event => {
        if (event.type === 'deadline' && !this.syncOptions.syncDeadlines) return false;
        if (event.type === 'hearing' && !this.syncOptions.syncHearings) return false;
        if (event.type === 'meeting' && !this.syncOptions.syncMeetings) return false;
        if (event.type === 'other' && !this.syncOptions.syncInternalEvents) return false;
        return true;
      });

      // Simulação de sincronização bem-sucedida
      // Em uma implementação real, isso envolveria chamadas à API do provedor de calendário
      const syncedEvents = filteredEvents.map(event => ({
        ...event,
        externalId: `ext_${event.id}`,
        externalCalendarId: providerId
      }));

      // Atualizar o timestamp da última sincronização
      const updatedProvider = {
        ...provider,
        lastSync: new Date()
      };

      this.providers.set(providerId, updatedProvider);

      // Notificar usuários sobre a sincronização bem-sucedida
      await notifyUsers({
        title: 'Calendário Sincronizado',
        message: `${syncedEvents.length} eventos foram sincronizados com ${provider.name}`,
        type: 'action',
        data: { providerId, eventCount: syncedEvents.length }
      });

      return {
        success: true,
        message: `${syncedEvents.length} eventos sincronizados com sucesso`,
        provider: providerId,
        events: syncedEvents
      };
    } catch (error) {
      console.error(`Erro ao sincronizar eventos com ${provider.name}:`, error);
      return {
        success: false,
        message: `Falha ao sincronizar eventos com ${provider.name}`,
        provider: providerId,
        error
      };
    }
  }

  /**
   * Importa eventos de um provedor de calendário
   * Usado quando a sincronização bidirecional está ativada
   */
  async importEvents(providerId: string, startDate?: Date, endDate?: Date): Promise<CalendarIntegrationResult> {
    const provider = this.providers.get(providerId);
    
    if (!provider) {
      return {
        success: false,
        message: `Provedor de calendário '${providerId}' não encontrado`,
        provider: providerId
      };
    }

    if (!provider.isConnected) {
      return {
        success: false,
        message: `Provedor de calendário '${provider.name}' não está conectado`,
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
      // Em uma implementação real, isso envolveria chamadas à API do provedor de calendário
      const now = new Date();
      const mockEvents: CalendarEvent[] = [
        {
          id: crypto.randomUUID(),
          title: 'Reunião importada do calendário externo',
          description: 'Esta é uma reunião importada do calendário externo',
          startDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Amanhã
          endDate: new Date(now.getTime() + 25 * 60 * 60 * 1000), // Amanhã + 1h
          type: 'meeting',
          externalId: 'ext_123',
          externalCalendarId: providerId
        },
        {
          id: crypto.randomUUID(),
          title: 'Prazo importado do calendário externo',
          description: 'Este é um prazo importado do calendário externo',
          startDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // Daqui a 3 dias
          endDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // Mesmo dia
          type: 'deadline',
          externalId: 'ext_456',
          externalCalendarId: providerId
        }
      ];

      // Notificar usuários sobre a importação bem-sucedida
      await notifyUsers({
        title: 'Eventos Importados',
        message: `${mockEvents.length} eventos foram importados de ${provider.name}`,
        type: 'action',
        data: { providerId, eventCount: mockEvents.length }
      });

      return {
        success: true,
        message: `${mockEvents.length} eventos importados com sucesso`,
        provider: providerId,
        events: mockEvents
      };
    } catch (error) {
      console.error(`Erro ao importar eventos de ${provider.name}:`, error);
      return {
        success: false,
        message: `Falha ao importar eventos de ${provider.name}`,
        provider: providerId,
        error
      };
    }
  }
}

export const calendarIntegrationService = new CalendarIntegrationService();