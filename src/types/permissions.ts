
export enum UserRole {
  CLIENT = "client",
  LAWYER = "lawyer",
  SENIOR_LAWYER = "senior_lawyer",
  ASSISTANT = "assistant",
  ADMIN = "admin"
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export interface RolePermission {
  roleId: UserRole;
  permissionId: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export interface UserPermission {
  userId: string;
  permissionId: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  maxUsers: number;
  isCustom: boolean;
}

export interface SubscriptionFeature {
  id: string;
  name: string;
  description: string;
  planIds: string[];
}
