import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-white/5", className)}
      {...props}
    />
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-[#121212] rounded-sm overflow-hidden border border-white/5 h-full">
      <Skeleton className="aspect-[4/5] rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-28" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
      <div className="space-y-4">
        <Skeleton className="aspect-[4/5]" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="aspect-square" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-6 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-14 w-full" />
      </div>
    </div>
  );
}

function EditorialSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-16 items-center max-w-5xl mx-auto py-24">
      <Skeleton className="w-full md:w-1/2 aspect-[3/4]" />
      <div className="w-full md:w-1/2 space-y-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-10 w-32 mt-4" />
      </div>
    </div>
  );
}

export { Skeleton, ProductCardSkeleton, ProductDetailSkeleton, EditorialSkeleton };
