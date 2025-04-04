import * as React from "react"

// Breakpoints alinhados com o Tailwind CSS
const BREAKPOINTS = {
  sm: 640,   // Small devices
  md: 768,   // Medium devices (tablets)
  lg: 1024,  // Large devices (desktops)
  xl: 1280,  // Extra large devices
  '2xl': 1536 // 2X Extra large devices
}

type BreakpointKey = keyof typeof BREAKPOINTS

/**
 * Hook para detectar se a tela está em um determinado breakpoint ou menor
 * @param breakpoint - O breakpoint a ser verificado (padrão: 'md')
 * @returns boolean indicando se a tela está no breakpoint especificado ou menor
 */
export function useBreakpoint(breakpoint: BreakpointKey = 'md') {
  const [isBelow, setIsBelow] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const breakpointValue = BREAKPOINTS[breakpoint]
    const mql = window.matchMedia(`(max-width: ${breakpointValue - 1}px)`)
    
    const onChange = () => {
      setIsBelow(window.innerWidth < breakpointValue)
    }
    
    mql.addEventListener("change", onChange)
    setIsBelow(window.innerWidth < breakpointValue)
    
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return !!isBelow
}

/**
 * Hook para detectar se a tela está em tamanho mobile (< 768px)
 * @returns boolean indicando se a tela está em tamanho mobile
 */
export function useIsMobile() {
  return useBreakpoint('md')
}

/**
 * Hook para detectar se a tela está em tamanho tablet (< 1024px)
 * @returns boolean indicando se a tela está em tamanho tablet
 */
export function useIsTablet() {
  return useBreakpoint('lg')
}

/**
 * Hook para detectar se a tela está em tamanho desktop (>= 1024px)
 * @returns boolean indicando se a tela está em tamanho desktop
 */
export function useIsDesktop() {
  const isTablet = useBreakpoint('lg')
  return !isTablet
}
