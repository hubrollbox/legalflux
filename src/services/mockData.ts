
import { UserRole } from "@/types/permissions";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  hasTwoFactorEnabled: boolean;
  phone?: string;
  organizationId?: string;
  lastLogin?: string;
  avatar?: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "1",
    name: "Ana Pereira",
    email: "ana.pereira@example.com",
    role: UserRole.ADMIN,
    isActive: true,
    createdAt: "2023-01-15T10:30:00Z",
    hasTwoFactorEnabled: true,
    phone: "+351 912 345 678",
    organizationId: "org-123",
    lastLogin: "2023-04-10T14:22:00Z",
    avatar: "/avatars/ana.jpg"
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao.silva@example.com",
    role: UserRole.LAWYER,
    isActive: true,
    createdAt: "2023-02-20T09:15:00Z",
    hasTwoFactorEnabled: false,
    phone: "+351 923 456 789",
    organizationId: "org-123",
    lastLogin: "2023-04-09T11:45:00Z",
    avatar: "/avatars/joao.jpg"
  },
  {
    id: "3",
    name: "Maria Santos",
    email: "maria.santos@example.com",
    role: UserRole.ASSISTANT,
    isActive: true,
    createdAt: "2023-03-05T14:45:00Z",
    hasTwoFactorEnabled: false,
    phone: "+351 934 567 890",
    organizationId: "org-123",
    lastLogin: "2023-04-10T09:30:00Z",
    avatar: "/avatars/maria.jpg"
  },
  {
    id: "4",
    name: "Pedro Costa",
    email: "pedro.costa@example.com",
    role: UserRole.CLIENT,
    isActive: false,
    createdAt: "2023-02-10T16:20:00Z",
    hasTwoFactorEnabled: false,
    phone: "+351 945 678 901",
    organizationId: "org-456",
    lastLogin: "2023-03-15T13:10:00Z",
    avatar: "/avatars/pedro.jpg"
  },
  {
    id: "5",
    name: "Sofia Martins",
    email: "sofia.martins@example.com",
    role: UserRole.SENIOR_LAWYER,
    isActive: true,
    createdAt: "2023-01-05T11:00:00Z",
    hasTwoFactorEnabled: true,
    phone: "+351 956 789 012",
    organizationId: "org-123",
    lastLogin: "2023-04-09T16:50:00Z",
    avatar: "/avatars/sofia.jpg"
  }
];
