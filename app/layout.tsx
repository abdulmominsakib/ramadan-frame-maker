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
  title: "Ramadan Frame Maker | Create Custom Profile Pictures",
  description: "Create custom Ramadan-themed profile pictures with beautiful frames. Celebrate the holy month with a personalized touch. Made by Momin.",
  openGraph: {
    title: "Ramadan Frame Maker | Create Custom Profile Pictures",
    description: "Create custom Ramadan-themed profile pictures with beautiful frames. Celebrate the holy month with a personalized touch.",
    url: "https://abdulmominsakib.github.io/ramadan-frame-maker/",
    siteName: "Ramadan Frame Maker",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramadan Frame Maker",
    description: "Create custom Ramadan-themed profile pictures with beautiful frames.",
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
