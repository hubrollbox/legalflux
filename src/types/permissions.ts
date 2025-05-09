
export interface Permission {
  id: string;
  resource: string;
  action: string;
  name: string;
  description: string;
  module: string;
}

export interface RolePermissions {
  [key: string]: string[];
}

export interface PermissionCheck {
  resource: string;
  action: string;
}
