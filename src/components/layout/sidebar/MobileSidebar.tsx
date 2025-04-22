
import React, { useEffect } from "react";
import { X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOGO } from "@/assets";
import UserProfile from "../UserProfile";
import type { SidebarItem } from "./SidebarItems";
import { motion, AnimatePresence } from "framer-motion";

interface MobileSidebarProps {
  user: any;
  items: SidebarItem[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
  onLogout: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  user,
  items,
  isOpen,
  onClose,
  onNavigate,
  onLogout
}) => {
  const filteredItems = items.filter(
    (item) => !user?.role || item.roles.includes(user.role)
  );

  // Fechar o sidebar quando pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevenir scroll do body quando o sidebar estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Sidebar Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Mobile Sidebar Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-y-0 left-0 w-64 bg-sidebar text-sidebar-foreground z-50 md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
            >
              <div className="flex justify-between items-center p-4 border-b border-sidebar-border">
                <div className="flex items-center">
                  <img src={LOGO.SMALL} alt="LegalFlux Logo" className="h-6 mr-2" />
                  <h1 className="text-xl font-bold">LegalFlux</h1>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-sidebar-foreground hover:bg-sidebar-accent"
                  onClick={onClose}
                  aria-label="Fechar menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                <nav className="px-2 space-y-1" aria-label="Menu principal">
                  {filteredItems.map((item) => (
                    <Button
                      key={item.label}
                      variant="ghost"
                      className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-1"
                      onClick={() => {
                        onNavigate(item.href);
                        onClose(); // Fechar o sidebar após navegação em dispositivos móveis
                      }}
                      aria-label={item.label}
                    >
                      <item.icon className="mr-2 h-5 w-5" aria-hidden="true" />
                      {item.label}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mt-4 focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-1"
                    onClick={onLogout}
                    aria-label="Sair da conta"
                  >
                    <LogOut className="mr-2 h-5 w-5" aria-hidden="true" />
                    Sair
                  </Button>
                </nav>
              </div>
              <UserProfile user={user} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileSidebar;
