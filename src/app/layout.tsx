import type { Metadata } from "next";
import { Geist, Geist_Mono, Google_Sans_Code } from "next/font/google";
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

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "npm-safe | npm dependency security for Node.js",
    template: "%s | npm-safe",
  },
  description:
    "Audit npm dependencies, trace vulnerabilities, apply compatible fixes, and verify package integrity with the @hort/nps CLI.",
  applicationName: "npm-safe",
  keywords: [
    "npm security",
    "Node.js dependency scanner",
    "npm vulnerability audit",
    "software supply chain security",
    "@hort/nps",
  ],
  openGraph: {
    title: "npm-safe | npm dependency security for Node.js",
    description:
      "Find vulnerable npm dependencies, understand where they came from, and take action from your terminal.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${googleSansCode.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
