import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-fun",
});

export const metadata: Metadata = {
  title: "What Kind of Spender & Survivor Are You? 💳 Consumer Insight Index",
  description: "Temukan arketipe finansial, coping mechanism, dan gaya belanjamu.",
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
