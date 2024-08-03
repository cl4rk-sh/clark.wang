import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clark Wang",
  description: "Web developer, AI Researcher, Student Pilot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#020617" />

      <body className={inter.className + " overflow-hidden"}>{children}</body>
    </html>
  );
}
