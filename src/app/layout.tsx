import type { Metadata } from "next";
import { VT323, Press_Start_2P, Silkscreen } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fun",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silk",
});

export const metadata: Metadata = {
  title: "Tes Arketipe Kerja & Survival Mode 2026",
  description: "8 Dilema nyata navigasi AI, ritme hybrid, dan coping style pekerja modern di tahun 2026.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${vt323.variable} ${pressStart.variable} ${silkscreen.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-fun select-none">{children}</body>
    </html>
  );
}
