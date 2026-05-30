"use client";

export function captureException(error: Error, componentStack?: string) {
  if (process.env.NODE_ENV !== "production") {
    console.error("[Sentry Mock] Caught exception:", error, componentStack);
    return;
  }
  
  // Real Sentry integration goes here
  // import * as Sentry from "@sentry/nextjs";
  // Sentry.captureException(error, { contexts: { react: { componentStack } } });
}
