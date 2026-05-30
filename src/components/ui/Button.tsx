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
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          "inline-flex items-center justify-center rounded-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-brand-gold text-[#0a0a0a] hover:bg-[#d4b96a] hover:shadow-[0_0_15px_rgba(197,160,89,0.2)]": variant === "primary",
            "bg-white/5 text-brand-silver hover:bg-white/10 hover:text-white border border-white/5": variant === "secondary",
            "border-[0.5px] border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-[#0a0a0a]": variant === "outline",
            "hover:bg-white/5 text-brand-silver hover:text-brand-gold": variant === "ghost",
            "h-8 px-4 text-[10px]": size === "sm",
            "h-12 px-8 py-2 text-xs": size === "md",
            "h-14 px-12 py-3 text-sm": size === "lg",
            "h-12 w-12": size === "icon",
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
