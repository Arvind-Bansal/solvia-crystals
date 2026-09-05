"use client";

import { captureException } from "@/lib/sentry";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <html>
      <body className="bg-[#F8F5EF] text-[#262626] flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h1 className="text-4xl font-serif mb-4 font-medium">Something Went Wrong</h1>
        <p className="text-[#262626]/70 mb-8 max-w-md">
          A critical error occurred. Please refresh the page or try again later.
        </p>
        <button 
          onClick={() => reset()}
          className="px-6 py-3 border border-[#262626] text-[#262626] rounded-sm uppercase tracking-widest text-sm hover:bg-[#262626] hover:text-[#F8F5EF] transition-colors"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
