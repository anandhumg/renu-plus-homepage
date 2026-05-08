"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
  isLoaded: boolean;
}

const LoadingContext = createContext<LoadingContextType>({ isLoaded: false });

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // We check if the document is already loaded
    if (document.readyState === "complete") {
      // Small timeout to ensure hydration and font rendering
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    }

    const handleLoad = () => {
      // Delay slightly to ensure everything is stable
      setTimeout(() => setIsLoaded(true), 200);
    };

    window.addEventListener("load", handleLoad);
    
    // Safety fallback for slow networks or if load event already fired
    const fallbackTimer = setTimeout(() => setIsLoaded(true), 2000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
