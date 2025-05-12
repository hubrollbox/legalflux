
// Este hook foi ajustado para evitar erros de importação do pacote 'sonner'.
// Utilize o componente <Toaster /> diretamente onde desejar exibir notificações.

import { Toaster as SonnerToaster } from "sonner";

export function useToast() {
  throw new Error("A função 'toast' não está disponível. Utilize o componente <Toaster /> do pacote 'sonner'. Consulte a documentação.");
}

export const Toaster = SonnerToaster;
