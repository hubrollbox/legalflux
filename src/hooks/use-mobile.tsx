import * as React from "react"

// Breakpoints aligned with Tailwind CSS
const BREAKPOINTS = {
  sm: 640,   // Small devices
  md: 768,   // Medium devices (tablets)
  lg: 1024,  // Large devices (desktops)
  xl: 1280,  // Extra large devices
  '2xl': 1536 // 2X Extra large devices
}

type BreakpointKey = keyof typeof BREAKPOINTS

/**
 * Hook to detect if the screen is at a certain breakpoint or smaller
 * @param breakpoint - The breakpoint to check (default: 'md')
 * @returns boolean indicating if the screen is at the specified breakpoint or smaller
 */
export function useBreakpoint(breakpoint: BreakpointKey = 'md'): boolean {
  const [isBelow, setIsBelow] = React.useState<boolean>(false)

  React.useEffect(() => {
    const breakpointValue = BREAKPOINTS[breakpoint]
    const mql = window.matchMedia(`(max-width: ${breakpointValue - 1}px)`)

    const onChange = () => {
      setIsBelow(window.innerWidth < breakpointValue)
    }

    // Debounce resize event handler
    const debounceOnChange = debounce(onChange, 100)

    mql.addEventListener("change", debounceOnChange)
    setIsBelow(window.innerWidth < breakpointValue)

    return () => mql.removeEventListener("change", debounceOnChange)
  }, [breakpoint])

  return isBelow
}

/**
 * Debounce function to limit the rate at which a function can fire.
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns debounced function
 */
function debounce(func: () => void, wait: number) {
  let timeout: NodeJS.Timeout
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(), wait)
  }
}

/**
 * Hook to detect if the screen is mobile size (< 768px)
 * @returns boolean indicating if the screen is mobile size
 */
export function useIsMobile(): boolean {
  return useBreakpoint('md')
}

/**
 * Hook to detect if the screen is tablet size (< 1024px)
 * @returns boolean indicating if the screen is tablet size
 */
export function useIsTablet(): boolean {
  return useBreakpoint('lg')
}

/**
 * Hook to detect if the screen is desktop size (>= 1024px)
 * @returns boolean indicating if the screen is desktop size
 */
export function useIsDesktop(): boolean {
  const isTablet = useBreakpoint('lg')
  return !isTablet
}
