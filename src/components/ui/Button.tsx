"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gradient-luxury text-white hover:opacity-90": variant === "primary",
            "bg-white text-brand-black hover:bg-gray-100": variant === "secondary",
            "border border-brand-gold text-brand-gold hover:bg-brand-gold/10": variant === "outline",
            "hover:bg-brand-purple/20 text-brand-silver hover:text-white": variant === "ghost",
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 py-2 text-sm": size === "md",
            "h-12 px-8 py-3 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };
