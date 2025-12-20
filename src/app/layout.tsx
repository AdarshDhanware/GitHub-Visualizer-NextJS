"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Background } from "@/components/Background";
import { Plasma } from "@/components/Plasma";
import { Inter } from "next/font/google";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import SmoothScroll from "@/components/SmoothScroll";
// export const metadata = {
//   title: 'GitHub Visualizer',      // Default title
//   description: 'GitHub Visualizer is a web app that lets you explore and visualize publicly available GitHub profile data, repositories, and contributions through interactive charts and graphs.',
//   icons: {
//     icon: '/icon.png',       // Favicon path
//   },
// };

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
      <Head>
        <title>GitHub Visualizer</title>
        <meta
          name="description"
          content="GitHub Visualizer is a web app that lets you explore and visualize publicly available GitHub profile data, repositories, and contributions through interactive charts and graphs."
        />
        <link rel="icon" href="/icon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="GitHub Visualizer" />
        <meta
          property="og:description"
          content="GitHub Visualizer is a web app that lets you explore and visualize publicly available GitHub profile data, repositories, and contributions through interactive charts and graphs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

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
            <SmoothScroll>
              <Navbar />
              {children}
              <Footer />
            </SmoothScroll>
          </SessionProvider>
        </main>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
