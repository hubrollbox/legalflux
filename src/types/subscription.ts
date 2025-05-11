
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
  priceId: string;
}

export interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'unpaid';
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}
