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
  title: "Tes Gaya Bertahan Hidup & Coping Style Pekerja 2026 🏢 Workplace Radar",
  description: "8 Dilema nyata era AI, hybrid work, & anti-hustle culture. Temukan 1 dari 16 arketipe kepribadian kerjamu di tahun 2026!",
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
