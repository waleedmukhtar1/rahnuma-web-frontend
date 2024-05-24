import { Inter } from "next/font/google";
import "./globals.css";
import {  Poppins } from "next/font/google";

const inter = Poppins({ subsets: ["latin"], weight: "700" });

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
