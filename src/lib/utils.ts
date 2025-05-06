
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "active":
      return "text-green-600 bg-green-100 border-green-300";
    case "pending":
      return "text-yellow-600 bg-yellow-100 border-yellow-300";
    case "inactive":
      return "text-gray-600 bg-gray-100 border-gray-300";
    case "error":
      return "text-red-600 bg-red-100 border-red-300";
    default:
      return "text-gray-600 bg-gray-100 border-gray-300";
  }
}
