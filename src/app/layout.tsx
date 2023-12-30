"use client";
import * as React from "react";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./globals.css";
import { lightTheme } from "@/themes/light-theme";
import { darkTheme } from "@/themes/dark-theme";
import { UIProvider } from "@/context/ui/UIProvider";
import { EntriesProvider } from "@/context/entries/EntriesProvider";

// export const metadata: Metadata = {
//   title: "Open Jira",
//   description: "created by Anderson Romero",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Open Jira</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Practical project created by Anderson Romero" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <body>{children}</body>
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </html>
  );
}
