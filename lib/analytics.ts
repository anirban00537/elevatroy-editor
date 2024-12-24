import ReactGA from "react-ga4";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID!;

export const pageview = (url: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, params }: { action: string; params: any }) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, params);
  }
};
