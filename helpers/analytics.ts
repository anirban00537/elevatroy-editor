// utils/analytics.ts

import ReactGA from "react-ga4";

declare global {
  interface Window {
    GA_INITIALIZED: boolean;
  }
}

export const initGA = () => {
  const trackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID;

  if (trackingId) {
    ReactGA.initialize(trackingId);
  } else {
    console.error("Google Analytics tracking ID is not defined.");
  }
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname, title: document.title });
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
    title: document.title,
  });
};
