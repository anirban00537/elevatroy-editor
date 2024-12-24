declare global {
  interface Window {
    gtag: (
      type: string,
      propertyId: string,
      options: { [key: string]: any }
    ) => void;
  }
}

export {};
