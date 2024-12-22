"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import { initGA, logPageView } from "@/helpers/analytics";
import toast, { Toaster } from "react-hot-toast";
import "highlight.js/styles/default.css";
import Head from "next/head";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  );
};

export default Layout;
