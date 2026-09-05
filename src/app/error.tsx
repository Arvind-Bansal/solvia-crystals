"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { captureException } from "@/lib/sentry";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    captureException(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-[#F8F5EF] text-center px-6">
      <h2 className="text-3xl font-serif text-[#262626] mb-4 font-medium">Something went wrong</h2>
      <p className="text-[#262626]/70 mb-8 max-w-md">
        We apologize for the interruption. Please try again or contact us if the issue persists.
      </p>
      <Button onClick={() => reset()} variant="outline">
        Try Again
      </Button>
    </div>
  );
}
