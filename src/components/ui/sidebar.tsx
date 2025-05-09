
"use client";

import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarStateContextProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = React.createContext<SidebarStateContextProps | undefined>(undefined);

export const useSidebarContext = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext deve ser usado dentro de um SidebarProvider");
  }
  return context;
};

// Provider para estado do sidebar
export function SidebarProvider({ 
  children, 
  defaultCollapsed = false,
}: { 
  children: React.ReactNode; 
  defaultCollapsed?: boolean;
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Componente Sidebar
export function Sidebar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed } = useSidebarContext();

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r transition-width duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Cabeçalho do Sidebar
export function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-14 items-center border-r px-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Conteúdo do Sidebar
export function SidebarContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 overflow-auto p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Grupo de itens no Sidebar
export function SidebarGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mb-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Rótulo do grupo no Sidebar
export function SidebarGroupLabel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed } = useSidebarContext();
  
  if (collapsed) {
    return null;
  }
  
  return (
    <div
      className={cn("mb-2 px-2 text-xs font-semibold text-muted-foreground", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Conteúdo do grupo no Sidebar
export function SidebarGroupContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("space-y-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Menu do Sidebar
export function SidebarMenu({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("space-y-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Item de menu do Sidebar
export function SidebarMenuItem({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Botão do Menu Sidebar
const buttonVariants = cva(
  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        active: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "active";
  tooltip?: string;
}

export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, variant = "default", children, tooltip, asChild = false, ...props }, ref) => {
    const { collapsed } = useSidebarContext();
    if (asChild) {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <span className={cn(buttonVariants({ variant, className }))}>
                {children}
              </span>
            </TooltipTrigger>
            {tooltip && collapsed && (
              <TooltipContent side="right">
                {tooltip}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      );
    }
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <button
              ref={ref}
              className={cn(buttonVariants({ variant, className }))}
              {...props}
            >
              {children}
            </button>
          </TooltipTrigger>
          {tooltip && collapsed && (
            <TooltipContent side="right">
              {tooltip}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

// Footer do Sidebar
export function SidebarFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-auto border-t p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Botão para colapsar/expandir o Sidebar
export function SidebarTrigger({ className, ...props }: ButtonProps) {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <button
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => setCollapsed(!collapsed)}
      {...props}
    >
      {collapsed ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      )}
    </button>
  );
}
