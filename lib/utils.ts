import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ScreenSize {
  screenWidth: number;
  screenHeight: number;
}

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    screenWidth: 0,
    screenHeight: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      // Check if window is defined before using it
      setScreenSize({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      });
      window.addEventListener("resize", handleResize);
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      if (typeof window !== "undefined") {
        // Check if window is defined before using it
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return screenSize;
};

export default useScreenSize;
