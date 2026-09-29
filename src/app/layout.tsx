import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "npm-safe - Secure your Node.js ecosystem",
  description: "A fast, modular, and secure open-source tool for managing your npm projects.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col relative bg-background text-foreground">
        {/* Subtle dot pattern background */}
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
        <div className="fixed inset-0 z-[-1] bg-gradient-to-t from-background via-transparent to-background"></div>
        
        <Navbar />
        <main className="flex-1 z-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
