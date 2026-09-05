import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  cta?: { label: string; href?: string; onClick?: () => void };
  className?: string;
}

/**
 * Branded empty state component for cart, search, collections, etc.
 * Avoids generic placeholder language — every instance should feel intentional.
 */
export function EmptyState({ icon: Icon, title, description, cta, className }: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-24 text-center",
      className
    )}>
      <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-brand-gold/50" />
      </div>
      <h3 className="text-xl font-serif text-[#262626] mb-2 font-medium">{title}</h3>
      <p className="text-[#262626]/60 max-w-md text-sm leading-relaxed mb-6">
        {description}
      </p>
      {cta && (
        cta.href ? (
          <Link href={cta.href}>
            <Button variant="outline">{cta.label}</Button>
          </Link>
        ) : (
          <Button variant="outline" onClick={cta.onClick}>{cta.label}</Button>
        )
      )}
    </div>
  );
}
