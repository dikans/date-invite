import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AudioPlayer from "@/components/AudioPlayer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Will You Go On A Date With Me?",
  description: "An interactive date invitation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" style={{ colorScheme: "light" }}>
      <body className={inter.className}>
        <ThemeProvider>
          <AudioPlayer />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
