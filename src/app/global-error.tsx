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
      <body className="bg-[#0a0a0a] text-white flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h1 className="text-4xl font-serif mb-4">Critical Alignment Error</h1>
        <p className="text-brand-silver/80 mb-8 max-w-md">
          A critical system error occurred. Please refresh the page or try again later.
        </p>
        <button 
          onClick={() => reset()}
          className="px-6 py-3 border border-brand-gold text-brand-gold rounded-sm uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-black transition-colors"
        >
          Restore Connection
        </button>
      </body>
    </html>
  );
}
