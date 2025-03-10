"use client";

import { AuthProvider } from "./context/AuthContext";
import { Geist, Geist_Mono } from "next/font/google";
import StyledComponentsRegistry from "./registry/StyledComponentsRegistry";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </StyledComponentsRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
