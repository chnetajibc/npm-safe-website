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
});

export const metadata: Metadata = {
  title: {
    default: "npm-safe | Package context before install",
    template: "%s | npm-safe",
  },
  description:
    "See package details, dependency counts, and available health signals before installing npm packages with @hort/nps.",
  applicationName: "npm-safe",
  keywords: [
    "npm package safety",
    "npm package information",
    "package manager wrapper",
    "dependency install review",
    "@hort/nps",
  ],
  openGraph: {
    title: "npm-safe | Package context before install",
    description:
      "A package information screen before install. Keep using npm, pnpm, or bun and take a more informed look first.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
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
