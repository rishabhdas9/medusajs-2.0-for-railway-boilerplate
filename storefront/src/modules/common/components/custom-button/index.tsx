import { Button as MedusaButton } from "@medusajs/ui"
import { ComponentProps } from "react"
import clsx from "clsx"

type ButtonProps = ComponentProps<typeof MedusaButton> & {
  variant?: "primary" | "secondary" | "transparent"
}

const Button = ({ 
  variant = "primary", 
  className,
  ...props 
}: ButtonProps) => {
  const baseStyles = "transition-colors duration-200"

  const variantStyles = {
    primary: "!bg-orange-500 hover:!bg-orange-600 !text-white",
    secondary: "!bg-white !border-2 !border-orange-500 !text-orange-500 hover:!bg-orange-50",
    transparent: "!bg-transparent hover:!bg-gray-50"
  }

  return (
    <MedusaButton
      className={clsx(
        baseStyles,
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
}

export default Button