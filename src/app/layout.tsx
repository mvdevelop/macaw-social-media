
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthProvider";

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
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
