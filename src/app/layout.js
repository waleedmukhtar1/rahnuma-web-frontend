import { Inter } from "next/font/google";
import "./globals.css";
import {  Open_Sans } from "next/font/google";

const inter = Open_Sans({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Rahnuma",
  description: "Coming soon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
