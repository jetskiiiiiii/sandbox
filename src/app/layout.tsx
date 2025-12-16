import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubikSansSerif = Rubik({
  variable: "--font-rubik-sans-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sandbox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dim">
      <body
        className={`${rubikSansSerif.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
