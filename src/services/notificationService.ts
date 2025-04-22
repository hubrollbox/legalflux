import { create } from 'zustand';
import type { Notification, NotificationPreference } from '@/types';



interface NotificationState {
  notifications: Notification[];
  preferences: NotificationPreference;
  unreadCount: number;
  isConnected: boolean;
  lastSyncTimestamp: number | null;
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  updatePreferences: (preferences: NotificationPreference) => void;
  setConnectionStatus: (status: boolean) => void;
  removeNotification: (id: string) => void;
}

const defaultPreferences: NotificationPreference = {
  deadlines: true,
  messages: true,
  processes: true,
  sound: true,
  priority: {
    high: true,
    medium: true,
    low: true,
  },
  deliveryMethod: 'all',
};

export const useNotificationStore = create<NotificationState>(((set, get) => ({
  notifications: [],
  preferences: defaultPreferences,
  unreadCount: 0,
  isConnected: false,
  lastSyncTimestamp: null,

  setNotifications: (notifications: Notification[]) => {
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    });
  },

  addNotification: (notification: Notification) => {
    const { notifications, preferences } = get();
    const { priority: priorityPrefs, deliveryMethod } = preferences;

    // Verificar se a notificação deve ser adicionada com base nas preferências
    if (
      deliveryMethod === 'none' ||
      (notification.priority === 'high' && !priorityPrefs.high) ||
      (notification.priority === 'medium' && !priorityPrefs.medium) ||
      (notification.priority === 'low' && !priorityPrefs.low)
    ) {
      return;
    }

    set({
      notifications: [notification, ...notifications],
      unreadCount: get().unreadCount + 1,
    });

    // Reproduzir som se estiver habilitado
    if (preferences.sound) {
      const audio = new Audio('/notification-sound.mp3');
      audio.play().catch(console.error);
    }
  },

  markAsRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: state.notifications.filter((n) => !n.read && n.id !== id).length,
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },

  updatePreferences: (preferences) => {
    set({ preferences });
  },

  setConnectionStatus: (status: boolean) => {
    set({ isConnected: status });
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
      unreadCount: state.notifications.filter((n) => !n.read && n.id !== id).length,
    }));
  },
}));

// Classe para gerenciar a conexão WebSocket
class NotificationWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000; // Tempo inicial de reconexão em ms

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      // Change WebSocket connection URL to use environment variable
      const socket = new WebSocket(
        process.env.NODE_ENV === 'production' 
          ? 'wss://your-production-url.com/notifications'
          : 'ws://localhost:3001/notifications'
      );

      this.ws.onopen = () => {
        useNotificationStore.getState().setConnectionStatus(true);
        this.reconnectAttempts = 0;
        this.reconnectTimeout = 1000;
      };

      this.ws.onmessage = (event) => {
        try {
          const notification = JSON.parse(event.data);
          useNotificationStore.getState().addNotification(notification);
        } catch (error) {
          console.error('Erro ao processar notificação:', error);
        }
      };

      this.ws.onclose = () => {
        useNotificationStore.getState().setConnectionStatus(false);
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('Erro na conexão WebSocket:', error);
        useNotificationStore.getState().setConnectionStatus(false);
      };
    } catch (error) {
      console.error('Erro ao estabelecer conexão WebSocket:', error);
      this.handleReconnect();
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnectAttempts++;
        this.reconnectTimeout *= 2; // Exponential backoff
        this.connect();
      }, this.reconnectTimeout);
    }
  }

  public close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Exportar uma instância do WebSocket para ser usada na aplicação
export const notificationWS = new NotificationWebSocket();


export async function notifyUsers(notification: {
  title: string;
  message: string;
  type: "message" | "deadline" | "process" | "action";
  recipients?: string[];
  priority?: "high" | "medium" | "low";
  data: any;
}) {
  try {
    const notificationId = crypto.randomUUID();
    const now = new Date();
    
    useNotificationStore.getState().addNotification({
      id: notificationId,
      title: notification.title,
      content: notification.message, // Change property name from 'message' to 'content'
      type: notification.type,
      priority: notification.priority || 'medium',
      timestamp: now,
      read: false,
      data: notification.data
    });
    
    // Em uma implementação real, aqui enviaríamos a notificação para os destinatários
    // através de WebSockets, push notifications, e-mail, etc.
    if (notification.recipients && notification.recipients.length > 0) {
      console.log(`Enviando notificação para destinatários específicos: ${notification.recipients.join(', ')}`);
    }
    
    return notificationId;
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    return null;
  }
}