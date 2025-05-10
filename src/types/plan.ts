
export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number | null;
  description: string;
  features: PlanFeature[];
  highlight: boolean;
  recommended?: boolean;
  priceId: string;
}
