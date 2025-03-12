"use client";

import { AuthProvider } from "./context/AuthContext";
import { Geist, Geist_Mono } from "next/font/google";
import StyledComponentsRegistry from "./registry/StyledComponentsRegistry";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import "./globals.css";
import styled from "styled-components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const BodyWrapper = styled.body`
  font-family: var(--font-geist-sans);
  background: linear-gradient(135deg, #0d0d0d, #1a1a1a); /* Dark gradient */
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  transition: all 0.3s ease-in-out;
`;

const PageWrapper = styled.div`
  width: 170%;
  max-width: 1400px;
  opacity: 0;
  padding: 0rem;
  border-radius: 12px;
  animation: fadeIn 0.5s ease-in-out forwards;
  background: rgba(255, 255, 255, 0.05); /* Subtle overlay effect */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <BodyWrapper className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
              <PageWrapper>{children}</PageWrapper>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </AuthProvider>
      </BodyWrapper>
    </html>
  );
}
