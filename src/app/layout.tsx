import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-fun",
});

export const metadata: Metadata = {
  title: "What Kind of Spender & Survivor Are You? 💳 Consumer Radar",
  description: "Ikuti tes gaya belanja dan kebiasaan bertahan hidup konsumen 2025!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${jakarta.variable}`}>
      <body className="min-h-screen bg-[#FFFDF7] text-[#2D2424] antialiased selection:bg-[#FFD482] font-sans">
        {children}
      </body>
    </html>
  );
}
