
import { RefObject } from 'react';

// Fix for HTMLDivElement | null in RefObject
declare module 'react' {
  interface RefObject<T> {
    readonly current: T | null;
  }
}

export {};
