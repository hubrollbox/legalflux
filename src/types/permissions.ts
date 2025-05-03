
export enum UserRole {
  ADMIN = "admin",
  LAWYER = "lawyer",
  SENIOR_LAWYER = "senior_lawyer",
  ASSISTANT = "assistant",
  CLIENT = "client",
}

export enum Permission {
  // Admin access
  ADMIN_ACCESS = "ADMIN_ACCESS",

  // User management
  USER_CREATE = "USER_CREATE",
  USER_READ = "USER_READ",
  USER_UPDATE = "USER_UPDATE",
  USER_DELETE = "USER_DELETE",

  // Process management
  PROCESS_CREATE = "PROCESS_CREATE",
  PROCESS_READ = "PROCESS_READ",
  PROCESS_UPDATE = "PROCESS_UPDATE",
  PROCESS_DELETE = "PROCESS_DELETE",

  // Client management
  CLIENT_CREATE = "CLIENT_CREATE",
  CLIENT_READ = "CLIENT_READ",
  CLIENT_UPDATE = "CLIENT_UPDATE",
  CLIENT_DELETE = "CLIENT_DELETE",

  // Document management
  DOCUMENT_CREATE = "DOCUMENT_CREATE",
  DOCUMENT_READ = "DOCUMENT_READ",
  DOCUMENT_UPDATE = "DOCUMENT_UPDATE",
  DOCUMENT_DELETE = "DOCUMENT_DELETE",

  // Financial management
  FINANCE_CREATE = "FINANCE_CREATE",
  FINANCE_READ = "FINANCE_READ",
  FINANCE_UPDATE = "FINANCE_UPDATE",
  FINANCE_DELETE = "FINANCE_DELETE",

  // Calendar management
  CALENDAR_CREATE = "CALENDAR_CREATE",
  CALENDAR_READ = "CALENDAR_READ",
  CALENDAR_UPDATE = "CALENDAR_UPDATE",
  CALENDAR_DELETE = "CALENDAR_DELETE",

  // Communication
  COMMUNICATION_CREATE = "COMMUNICATION_CREATE",
  COMMUNICATION_READ = "COMMUNICATION_READ",
  COMMUNICATION_UPDATE = "COMMUNICATION_UPDATE",
  COMMUNICATION_DELETE = "COMMUNICATION_DELETE",
}

export const DEFAULT_ROLE_PERMISSIONS: Record<string, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.ADMIN_ACCESS,
    // Admin has all permissions
  ],
  [UserRole.LAWYER]: [
    // Process management
    Permission.PROCESS_CREATE,
    Permission.PROCESS_READ,
    Permission.PROCESS_UPDATE,
    
    // Client management
    Permission.CLIENT_CREATE,
    Permission.CLIENT_READ,
    Permission.CLIENT_UPDATE,
    
    // Document management
    Permission.DOCUMENT_CREATE,
    Permission.DOCUMENT_READ,
    Permission.DOCUMENT_UPDATE,
    
    // Financial management (limited)
    Permission.FINANCE_READ,
    
    // Calendar management
    Permission.CALENDAR_CREATE,
    Permission.CALENDAR_READ,
    Permission.CALENDAR_UPDATE,
    
    // Communication
    Permission.COMMUNICATION_CREATE,
    Permission.COMMUNICATION_READ,
    Permission.COMMUNICATION_UPDATE,
  ],
  [UserRole.SENIOR_LAWYER]: [
    // Process management (full)
    Permission.PROCESS_CREATE,
    Permission.PROCESS_READ,
    Permission.PROCESS_UPDATE,
    Permission.PROCESS_DELETE,
    
    // Client management (full)
    Permission.CLIENT_CREATE,
    Permission.CLIENT_READ,
    Permission.CLIENT_UPDATE,
    Permission.CLIENT_DELETE,
    
    // Document management
    Permission.DOCUMENT_CREATE,
    Permission.DOCUMENT_READ,
    Permission.DOCUMENT_UPDATE,
    Permission.DOCUMENT_DELETE,
    
    // Financial management
    Permission.FINANCE_CREATE,
    Permission.FINANCE_READ,
    Permission.FINANCE_UPDATE,
    
    // Calendar management (full)
    Permission.CALENDAR_CREATE,
    Permission.CALENDAR_READ,
    Permission.CALENDAR_UPDATE,
    Permission.CALENDAR_DELETE,
    
    // Communication (full)
    Permission.COMMUNICATION_CREATE,
    Permission.COMMUNICATION_READ,
    Permission.COMMUNICATION_UPDATE,
    Permission.COMMUNICATION_DELETE,
  ],
  [UserRole.ASSISTANT]: [
    // Process management (limited)
    Permission.PROCESS_READ,
    
    // Client management (limited)
    Permission.CLIENT_READ,
    
    // Document management (limited)
    Permission.DOCUMENT_READ,
    Permission.DOCUMENT_CREATE,
    
    // Calendar management (limited)
    Permission.CALENDAR_READ,
    Permission.CALENDAR_CREATE,
    
    // Communication (limited)
    Permission.COMMUNICATION_READ,
    Permission.COMMUNICATION_CREATE,
  ],
  [UserRole.CLIENT]: [
    // Process management (very limited - only own)
    Permission.PROCESS_READ,
    
    // Document management (very limited - only own)
    Permission.DOCUMENT_READ,
    
    // Calendar management (very limited - only own)
    Permission.CALENDAR_READ,
    
    // Communication
    Permission.COMMUNICATION_CREATE,
    Permission.COMMUNICATION_READ,
  ],
};

export type UserType = "individual" | "professional" | "company";
