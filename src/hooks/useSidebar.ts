import { useState, useCallback } from "react";

interface SidebarState {
  isMobile: boolean;
  state: boolean;
  openMobile: () => void;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
}

export function useSidebar(): SidebarState {
  const [state, setState] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const openMobile = useCallback(() => {
    setIsMobile(true);
    setState(true);
  }, []);

  const setOpenMobile = useCallback((open: boolean) => {
    setIsMobile(open);
    setState(open);
  }, []);

  const toggleSidebar = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return {
    isMobile,
    state,
    openMobile,
    setOpenMobile,
    toggleSidebar
  };
}