import posthog from "posthog-js";

// Check if we're in a browser environment
if (typeof window !== "undefined") {
  posthog.init(
    process.env.NEXT_PUBLIC_POSTHOG_KEY!, // Using the environment variable
    {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      // Enable debug mode in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") posthog.debug();
      },
      capture_pageview: true, // Automatically capture pageviews
      capture_pageleave: true, // Automatically capture page exits
      autocapture: true, // Automatically capture clicks, form submissions etc
    }
  );
}

export default posthog;
