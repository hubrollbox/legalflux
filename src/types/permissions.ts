
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


export const DEFAULT_ROLE_PERMISSIONS: { [key: string]: string[] } = {
  ADMIN: ["ADMIN_ACCESS", "VIEW_ALL", "EDIT_ALL"],
  LAWYER: ["VIEW_CLIENTS", "EDIT_CASES"],
  SENIOR_LAWYER: ["VIEW_CLIENTS", "EDIT_CASES", "APPROVE_CASES"],
  ASSISTANT: ["VIEW_CLIENTS"],
  CLIENT: ["VIEW_SELF", "EDIT_SELF"]
};
