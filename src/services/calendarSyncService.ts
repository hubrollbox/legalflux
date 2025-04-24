import { calendarIntegrationService } from './calendarIntegrationService';
import type { CalendarProvider } from './calendarIntegrationService';
import type { CalendarEvent } from '@/types';
import { notifyUsers } from './notificationService';

export interface ExternalCalendarConfig {
  id: string;
  providerId: string;
  name: string;
  color: string;
  syncEnabled: boolean;
  syncDirection: 'import' | 'export' | 'bidirectional';
  eventTypes: ('deadline' | 'hearing' | 'meeting' | 'other')[];
  lastSync?: Date;
  userId: string;
}

export interface SyncResult {
  success: boolean;
  provider: string; // Keep as string to match original declaration
  calendarId?: string;
  eventsImported?: number;
  eventsExported?: number;
  errors?: string[]; // Keep as string[] to match original declaration
}

export interface CalendarSyncOptions {
  syncFrequency: 'manual' | 'hourly' | 'daily' | 'weekly';
  autoCreateReminders: boolean;
  reminderTimes: number[]; // minutos antes do evento
  conflictResolution: 'external_priority' | 'internal_priority' | 'ask_user';
  syncAttendees: boolean;
  syncAttachments: boolean;
  syncNotes: boolean;
  syncCategories: boolean;
}

class CalendarSyncService {
  private externalCalendars: Map<string, ExternalCalendarConfig> = new Map();
  private syncOptions: CalendarSyncOptions = {
    syncFrequency: 'daily',
    autoCreateReminders: true,
    reminderTimes: [30, 60 * 24], // 30 minutos e 1 dia antes
    conflictResolution: 'ask_user',
    syncAttendees: true,
    syncAttachments: false,
    syncNotes: true,
    syncCategories: true
  };

  constructor() {
    // Inicializar com algumas configurações de exemplo
    const exampleCalendars: ExternalCalendarConfig[] = [
      {
        id: crypto.randomUUID(),
        providerId: 'google',
        name: 'Calendário Profissional',
        color: '#4285F4',
        syncEnabled: true,
        syncDirection: 'bidirectional',
        eventTypes: ['deadline', 'hearing', 'meeting'],
        userId: 'user123'
      },
      {
        id: crypto.randomUUID(),
        providerId: 'outlook',
        name: 'Calendário de Audiências',
        color: '#0078D4',
        syncEnabled: true,
        syncDirection: 'export',
        eventTypes: ['hearing'],
        userId: 'user123'
      }
    ];

    exampleCalendars.forEach(calendar => {
      this.externalCalendars.set(calendar.id, calendar);
    });
  }

  /**
   * Obtém todas as configurações de calendários externos
   */
  getExternalCalendars(): ExternalCalendarConfig[] {
    return Array.from(this.externalCalendars.values());
  }

  /**
   * Obtém uma configuração específica de calendário externo pelo ID
   */
  getExternalCalendar(calendarId: string): ExternalCalendarConfig | undefined {
    return this.externalCalendars.get(calendarId);
  }

  /**
   * Cria uma nova configuração de calendário externo
   */
  createExternalCalendar(calendar: Omit<ExternalCalendarConfig, 'id'>): ExternalCalendarConfig {
    const newCalendar: ExternalCalendarConfig = {
      ...calendar,
      id: crypto.randomUUID()
    };
    
    this.externalCalendars.set(newCalendar.id, newCalendar);
    return newCalendar;
  }

  /**
   * Atualiza uma configuração de calendário externo existente
   */
  updateExternalCalendar(calendarId: string, updates: Partial<Omit<ExternalCalendarConfig, 'id'>>): ExternalCalendarConfig {
    const calendar = this.externalCalendars.get(calendarId);
    if (!calendar) {
      throw new Error(`Calendário com ID ${calendarId} não encontrado`);
    }
    
    const updatedCalendar = {
      ...calendar,
      ...updates
    };
    
    this.externalCalendars.set(calendarId, updatedCalendar);
    return updatedCalendar;
  }

  /**
   * Exclui uma configuração de calendário externo
   */
  deleteExternalCalendar(calendarId: string): boolean {
    return this.externalCalendars.delete(calendarId);
  }

  /**
   * Obtém as opções de sincronização atuais
   */
  getSyncOptions(): CalendarSyncOptions {
    return { ...this.syncOptions };
  }

  /**
   * Atualiza as opções de sincronização
   */
  updateSyncOptions(options: Partial<CalendarSyncOptions>): CalendarSyncOptions {
    this.syncOptions = { ...this.syncOptions, ...options };
    return this.syncOptions;
  }

  /**
   * Sincroniza eventos com um calendário externo específico
   */
  async syncCalendar(calendarId: string, startDate?: Date, endDate?: Date): Promise<SyncResult> {
    const calendar = this.externalCalendars.get(calendarId);
    if (!calendar) {
      return {
        success: false,
        provider: 'unknown',
        errors: [`Calendário com ID ${calendarId} não encontrado`]
      };
    }

    if (!calendar.syncEnabled) {
      return {
        success: false,
        provider: calendar.providerId,
        calendarId,
        errors: ['Sincronização desativada para este calendário']
      };
    }

    try {
      const provider = calendarIntegrationService.getProvider(calendar.providerId);
      if (!provider || !provider.isConnected) {
        return {
          success: false,
          provider: calendar.providerId,
          calendarId,
          errors: [`Provedor ${calendar.providerId} não está conectado`]
        };
      }

      const result: SyncResult = {
        success: true,
        provider: calendar.providerId,
        calendarId,
        eventsImported: 0,
        eventsExported: 0,
        errors: []
      };

      // Importar eventos, se configurado
      if (calendar.syncDirection === 'import' || calendar.syncDirection === 'bidirectional') {
        const importResult = await this.importEvents(calendar, startDate, endDate);
        result.eventsImported = importResult.eventsImported || 0;
        
        if (!importResult.success && importResult.errors) {
          result.errors = [...(result.errors || []), ...importResult.errors];
        }
      }

      // Exportar eventos, se configurado
      if (calendar.syncDirection === 'export' || calendar.syncDirection === 'bidirectional') {
        const exportResult = await this.exportEvents(calendar, startDate, endDate);
        result.eventsExported = exportResult.eventsExported || 0;
        
        if (!exportResult.success && exportResult.errors) {
          result.errors = [...(result.errors || []), ...exportResult.errors];
        }
      }

      // Atualizar timestamp da última sincronização
      calendar.lastSync = new Date();
      this.externalCalendars.set(calendarId, calendar);

      // Determinar sucesso geral com base nos resultados parciais
      result.success = (result.errors?.length || 0) === 0;

      // Notificar usuários sobre a sincronização
      await this.notifySyncResult(result);

      return result;
    } catch (error) {
      console.error(`Erro ao sincronizar calendário ${calendarId}:`, error);
      return {
        success: false,
        provider: calendar.providerId,
        calendarId,
        errors: [error instanceof Error ? error.message : 'Erro desconhecido']
      };
    }
  }

  /**
   * Sincroniza todos os calendários externos ativos
   */
  async syncAllCalendars(startDate?: Date, endDate?: Date): Promise<SyncResult[]> {
    const activeCalendars = Array.from(this.externalCalendars.values())
      .filter(calendar => calendar.syncEnabled);

    const results: SyncResult[] = [];

    for (const calendar of activeCalendars) {
      const result = await this.syncCalendar(calendar.id, startDate, endDate);
      results.push(result);
    }

    return results;
  }

  /**
   * Importa eventos de um calendário externo
   */
  private async importEvents(calendar: ExternalCalendarConfig, startDate?: Date, endDate?: Date): Promise<SyncResult> {
    try {
      // Importar eventos do provedor de calendário
      const importResult = await calendarIntegrationService.importEvents(
        calendar.providerId,
        startDate,
        endDate
      );

      if (!importResult.success) {
        return {
          success: false,
          provider: calendar.providerId,
          calendarId: calendar.id,
          errors: [importResult.message]
        };
      }

      // Filtrar eventos pelos tipos configurados com type guard
      const filteredEvents = (importResult.events || []).filter(event => {
        if (!event.type || !calendar.eventTypes.includes(event.type as 'deadline' | 'hearing' | 'meeting' | 'other')) {
          return false;
        }
        return true;
      });

      // Processar eventos importados
      console.log(`Importados ${filteredEvents.length} eventos do calendário ${calendar.name}`);

      return {
        success: true,
        provider: calendar.providerId,
        calendarId: calendar.id,
        eventsImported: filteredEvents.length
      };
    } catch (error) {
      console.error(`Erro ao importar eventos do calendário ${calendar.id}:`, error);
      return {
        success: false,
        provider: calendar.providerId,
        calendarId: calendar.id,
        errors: [error instanceof Error ? error.message : 'Erro desconhecido']
      };
    }
  }

  /**
   * Exporta eventos para um calendário externo
   */
  private async exportEvents(calendar: ExternalCalendarConfig, startDate?: Date /* TODO: implement date filtering */, endDate?: Date): Promise<SyncResult> {
    try {
      // Em uma implementação real, isso buscaria eventos do banco de dados
      // Aqui estamos simulando alguns eventos para exportar
      const eventsToExport = this.generateMockEvents(calendar, 3);

      // Filtrar eventos pelos tipos configurados
      const filteredEvents = eventsToExport.filter(event => 
        calendar.eventTypes.includes(event.type)
      );

      // Exportar eventos para o provedor de calendário
      const exportResult = await calendarIntegrationService.syncEvents(
        calendar.providerId,
        filteredEvents
      );

      if (!exportResult.success) {
        return {
          success: false,
          provider: calendar.providerId,
          calendarId: calendar.id,
          errors: [exportResult.message]
        };
      }

      return {
        success: true,
        provider: calendar.providerId,
        calendarId: calendar.id,
        eventsExported: filteredEvents.length
      };
    } catch (error) {
      console.error(`Erro ao exportar eventos para o calendário ${calendar.id}:`, error);
      return {
        success: false,
        provider: calendar.providerId,
        calendarId: calendar.id,
        errors: [error instanceof Error ? error.message : 'Erro desconhecido']
      };
    }
  }

  /**
   * Gera eventos de exemplo para simulação
   */
  // Update the generateMockEvents method to match CalendarEvent interface
  private generateMockEvents(calendar: ExternalCalendarConfig, count: number): CalendarEvent[] {
      const events: CalendarEvent[] = [];
      const now = new Date();
      const eventTypes: ('deadline' | 'hearing' | 'meeting' | 'other')[] = ['deadline', 'hearing', 'meeting', 'other'];
  
      for (let i = 0; i < count; i++) {
        const start = new Date(now.getTime() + (i + 1) * 24 * 60 * 60 * 1000); // dias à frente
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 horas depois
        const type = eventTypes[i % eventTypes.length];
  
        events.push({
          id: crypto.randomUUID(),
          title: `Evento de ${type} ${i + 1}`,
          description: `Descrição do evento de ${type} ${i + 1}`,
          start,
          end,
          location: type === 'hearing' ? 'Tribunal de Justiça' : 'Escritório',
          type,
          processId: crypto.randomUUID(),
          clientId: crypto.randomUUID()
        });
      }
  
      return events;
  }

  /**
   * Notifica os usuários sobre o resultado da sincronização
   */
  private async notifySyncResult(result: SyncResult): Promise<void> {
    const provider = calendarIntegrationService.getProvider(result.provider);
    const providerName = provider?.name || result.provider;
    const calendar = result.calendarId ? this.externalCalendars.get(result.calendarId) : undefined;
    const calendarName = calendar?.name || 'Calendário';

    if (result.success) {
      await notifyUsers({
        title: 'Sincronização de Calendário Concluída',
        message: `A sincronização com ${calendarName} (${providerName}) foi concluída com sucesso. ` +
                 `${result.eventsImported || 0} eventos importados, ${result.eventsExported || 0} eventos exportados.`,
        type: 'action',
        data: { result }
      });
    } else {
      await notifyUsers({
        title: 'Falha na Sincronização de Calendário',
        message: `A sincronização com ${calendarName} (${providerName}) falhou. ` +
                 `Erros: ${result.errors?.join('; ') || 'Erro desconhecido'}`,
        type: 'action', // Changed from 'error' to 'action'
        data: { result }
      });
    }
  }

  /**
   * Configura sincronização automática com base na frequência definida
   */
  setupAutomaticSync(): void {
    // Em uma implementação real, isso configuraria jobs de sincronização
    // com base na frequência definida em syncOptions.syncFrequency
    console.log(`Sincronização automática configurada com frequência: ${this.syncOptions.syncFrequency}`);
  }

  /**
   * Resolve conflitos entre eventos locais e externos
   */
  resolveConflict(localEvent: CalendarEvent, externalEvent: CalendarEvent): CalendarEvent {
    // Em uma implementação real, isso aplicaria a estratégia de resolução de conflitos
    // com base em syncOptions.conflictResolution
    switch (this.syncOptions.conflictResolution) {
      case 'external_priority':
        return externalEvent;
      case 'internal_priority':
        return localEvent;
      case 'ask_user':
        // Em uma implementação real, isso criaria uma notificação para o usuário decidir
        console.log('Conflito detectado, aguardando decisão do usuário');
        return localEvent; // Por padrão, manter o evento local até a decisão
      default:
        return localEvent;
    }
  }

  /**
   * Cria lembretes para eventos com base nas configurações
   */
  createReminders(event: CalendarEvent): void {
    if (!this.syncOptions.autoCreateReminders) return;

    // Em uma implementação real, isso criaria lembretes no sistema
    console.log(`Criando lembretes para o evento ${event.title}`);
    
    this.syncOptions.reminderTimes.forEach(minutes => {
      const reminderTime = new Date(event.startDate.getTime() - minutes * 60 * 1000);
      console.log(`- Lembrete configurado para ${reminderTime.toLocaleString()} (${minutes} minutos antes)`);
    });
  }
}

export const calendarSyncService = new CalendarSyncService();


export async function syncDeadlinesWithExternalCalendar(
  calendarId: string, 
  deadlines: Date[]
): Promise<SyncResult> {
  try {
    const calendar = calendarSyncService.getExternalCalendar(calendarId);
    if (!calendar || !calendar.syncEnabled) {
      throw new Error('Calendário não encontrado ou sincronização desativada');
    }

    const provider = calendarIntegrationService.getProvider(calendar.providerId);
    if (!provider || !provider.isConnected) {
      throw new Error('Provedor não está conectado');
    }

    const syncResult: SyncResult = {
      success: true,
      provider: calendar.providerId,
      calendarId,
      eventsImported: 0,
      eventsExported: 0,
      errors: []
    };

    const events: CalendarEvent[] = deadlines.map(deadline => ({
      id: crypto.randomUUID(),
      title: 'Prazo Legal',
      start: deadline,
      end: deadline,
      type: 'deadline',
      attendees: [],
      notes: 'Sincronizado automaticamente',
      category: 'deadline',
      processId: crypto.randomUUID(),
      clientId: crypto.randomUUID()
    }));

    const exportResult = await provider.syncEvents(calendarId, events);
    if (!exportResult.success && exportResult.errors) {
      syncResult.errors.push(...exportResult.errors);
      syncResult.success = false;
    } else {
      syncResult.eventsExported = events.length;
    }

    return syncResult;
  } catch (error) {
    console.error('Erro ao sincronizar prazos:', error);
    return {
      success: false,
      provider: 'unknown',
      errors: [error instanceof Error ? error.message : 'Erro desconhecido']
    };
  }
}