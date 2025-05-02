
export enum UserRole {
  ADMIN = "ADMIN",
  LAWYER = "LAWYER",
  SENIOR_LAWYER = "SENIOR_LAWYER",
  ASSISTANT = "ASSISTANT",
  CLIENT = "CLIENT"
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
}

export interface UserPermission {
  userId: string;
  permissionId: string;
}
