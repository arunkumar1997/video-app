import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import AppLayout from "@/components/Shared/Layout";
import Header from "@/components/Shared/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}
