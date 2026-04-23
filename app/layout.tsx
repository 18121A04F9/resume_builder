import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ResumeForge — Build Your Professional Resume",
    template: "%s | ResumeForge",
  },
  description:
    "Create stunning, ATS-friendly resumes in minutes. Free resume builder with live preview, multiple templates, and PDF export.",
  keywords: [
    "resume builder",
    "CV builder",
    "free resume",
    "ATS resume",
    "professional resume",
    "resume templates",
  ],
  authors: [{ name: "ResumeForge" }],
  creator: "ResumeForge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "ResumeForge — Build Your Professional Resume",
    description:
      "Create stunning, ATS-friendly resumes in minutes. Free resume builder with live preview, multiple templates, and PDF export.",
    siteName: "ResumeForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeForge — Build Your Professional Resume",
    description:
      "Create stunning, ATS-friendly resumes in minutes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            richColors
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
