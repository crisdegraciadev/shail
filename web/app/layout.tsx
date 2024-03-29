"use client";

import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "../lib/utils";
import { TooltipProvider } from "../components/ui/tooltip";
import MailContextProvider from "../contexts/mail-context";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <TooltipProvider>
          <MailContextProvider>{children}</MailContextProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
