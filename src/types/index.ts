
export interface Plan {
  id: string;
  name: string;
  price: number | null;
  description: string;
  features: string[];
  maxUsers?: number;
  maxStorage?: number;
  maxCases?: number;
  priceId?: string; // Add priceId to match PlanCard component
}

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
  permission?: string;
}

export interface MenuItem {
  title: string;
  description?: string;
  href?: string;
  disabled?: boolean;
}

export interface MainNavItem {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
}

export interface SidebarNavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type { CalendarEvent, CategoryKey } from './calendar';

export interface MobileNavItemProps {
  children?: React.ReactNode;
  closeMenu: () => void;
  title: string;
  href: string;
}

// Export PriorityLevel enum directly from the main types file
export enum PriorityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}
