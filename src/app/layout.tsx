import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BluePeak Estates | Luxury Real Estate",
  description:
    "Discover luxury real estate opportunities and schedule personalized consultations with BluePeak Estates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-slate-950 text-white antialiased selection:bg-brand-400/20 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
