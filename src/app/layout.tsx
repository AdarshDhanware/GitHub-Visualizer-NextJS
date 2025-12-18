"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Background } from "@/components/Background";
import { Plasma } from "@/components/Plasma";
import { Inter } from "next/font/google";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter relative min-h-screen overflow-x-hidden antialiased">
        {/* Background layer */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Background />
        </div>

        {/* Animated WebGL layer */}
        <div className="fixed inset-0 z-10 pointer-events-none">
          <div
            style={{ width: "100%", height: "100dvh", position: "relative" }}
          >
            <Plasma
              color="#b19eef"
              speed={0.6}
              direction="forward"
              scale={1.1}
              opacity={0.8}
              mouseInteractive={true}
            />
          </div>
        </div>

        {/* Content layer */}
        <main className="relative z-20">
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
          <Footer />
        </main>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
