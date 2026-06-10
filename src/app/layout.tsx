import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { validateEnv } from "@/lib/env";

// Valida variáveis de ambiente no servidor
if (typeof window === "undefined") {
  validateEnv();
}
import ChatPanelWrapper from "@/components/ChatPanelWrapper";
import MobileBottomNav from "@/components/MobileBottomNav";
import ScrollToTop from "@/components/ScrollToTop";
import { ToastProvider } from "@/context/ToastProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { LanguageProvider } from "@/context/LanguageProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { NotificationProvider } from "@/lib/useNotifications";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Macaw Social Media",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors`}>
        <ThemeProvider>
          <AuthProvider>
            <LanguageProvider>
              <NotificationProvider>
                <Navbar />
                <ToastProvider>
                  <main className="animate-pageIn">{children}</main>
                  <ChatPanelWrapper />
                  <MobileBottomNav />
                  <ScrollToTop />
                </ToastProvider>
              </NotificationProvider>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
