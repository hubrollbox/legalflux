import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"; // Import VariantProps
import { cn } from "@/lib/utils"
import { buttonVariants } from "./buttonVariants" // Import from the new file

// Update ButtonProps to extend VariantProps
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { // Use VariantProps with the imported buttonVariants
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Use imported variants
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } // Only export the component
