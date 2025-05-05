
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number | null;
  recommended: boolean;
  features: string[];
}
