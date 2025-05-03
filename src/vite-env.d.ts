
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly NODE_ENV: 'development' | 'production' | 'test';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// React JSX types
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Declare modules for packages that don't have type definitions
declare module 'sonner' {
  export const Toaster: React.FC<{
    position?: string;
    [key: string]: any;
  }>;
}

declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: any;
  export interface HTMLMotionProps<T extends keyof JSX.IntrinsicElements> {
    children?: React.ReactNode;
    [key: string]: any;
  }
}
