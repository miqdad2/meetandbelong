import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meetandbelong.com"),
  title: "Meet & Belong — Meet New People. Build Real Friendships.",
  description: "Small, thoughtfully matched social gatherings that help adults build real friendships. Launching first in Kuwait.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Meet & Belong",
    title: "Meet New People. Build Real Friendships.",
    description: "Small, thoughtfully matched friendship circles for adults in Kuwait.",
    images: [{ url: "/daira-hero.png", width: 1024, height: 1365, alt: "Two friends enjoying a welcoming conversation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet & Belong Kuwait",
    description: "Small, thoughtfully matched friendship circles for adults in Kuwait.",
    images: ["/daira-hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
