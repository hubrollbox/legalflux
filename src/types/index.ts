
export interface Plan {
  id: string;
  name: string;
  price: number | null;
  description: string;
  features: string[];
  maxUsers?: number;
  maxStorage?: number;
  maxCases?: number;
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

export interface MobileNavItemProps {
  children?: React.ReactNode;
  closeMenu: () => void;
  title: string;
  href: string;
}

export { PriorityLevel } from "./priority-level";
