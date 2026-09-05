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
          "inline-flex items-center justify-center rounded-sm font-medium tracking-[0.15em] uppercase transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[#262626] text-[#F8F5EF] hover:bg-[#262626]/90 hover:shadow-md border border-[#262626]": variant === "primary",
            "bg-[#F2EDE4] text-[#262626] hover:bg-[#E8E2D7] border border-[#262626]/10": variant === "secondary",
            "border border-[#262626] text-[#262626] hover:bg-[#262626] hover:text-[#F8F5EF]": variant === "outline",
            "hover:bg-[#262626]/5 text-[#262626] hover:text-[#D6B47A]": variant === "ghost",
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
