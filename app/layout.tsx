import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

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
    <html lang="en" className={instrumentSerif.variable}>
      <head>
        <meta name="theme-color" content="#020617" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
