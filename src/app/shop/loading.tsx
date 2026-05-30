import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ShopLoading() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-[#0a0a0a] min-h-screen">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <Skeleton className="h-12 w-64 mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl" />
            <Skeleton className="h-6 w-full max-w-xl mt-2" />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-sm" />
              ))}
            </div>
            <Skeleton className="h-10 w-64 rounded-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col">
                <Skeleton className="aspect-[4/5] w-full rounded-sm mb-4" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
