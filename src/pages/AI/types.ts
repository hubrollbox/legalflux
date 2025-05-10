
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: string;
  priority: string;
  relevance: string;
}

export interface LegalResource {
  id: string;
  title: string;
  type: string;
  source: string;
  date: string;
  url?: string;
  content?: string;
}

export interface AISummary {
  key_points: string[];
  recommendations: string[];
  risks: string[];
}
