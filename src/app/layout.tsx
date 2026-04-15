import type { Metadata } from "next";
import "./globals.css";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2604 — Creative Developer",
  description: "Portfolio of Kay — Creative Frontend Developer & Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={syne.className}>{children}</body>
    </html>
  );
}
