"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-sm border border-[#262626]/20 bg-white px-4 py-3 text-sm text-[#262626] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#262626]/40 focus-visible:outline-none focus-visible:border-[#D6B47A] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
