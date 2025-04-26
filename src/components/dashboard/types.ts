import { PriorityLevel } from "@types";

// Define types for the recent items to ensure proper type checking
export interface RecentCase {
  id: string;
  title: string;
  clientName: string;
  clientAvatar: string;
  status: "active" | "pending" | "closed" | "archived";
}

export interface RecentTask {
  id: string;
  title: string;
  assignedToName: string;
  assignedToAvatar: string;
  priority: PriorityLevel;
}

export interface StatCard {
  title: string;
  value: string;
  icon: string;
  description: string;
}
