
import { RefObject } from 'react';

// Handle HTMLDivElement | null in RefObject
declare module 'react' {
  interface RefObject<T> {
    readonly current: T | null;
  }
}

// Add interfaces for AI components
export interface MessageProps {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface SuggestionProps {
  id: string;
  type: string;
  priority: string;
  title: string;
  description: string;
  relevance: number;
}

export {};
