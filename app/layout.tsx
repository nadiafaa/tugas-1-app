import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; // Navbar ini Client

export const metadata: Metadata = {
  title: "Apotek Sehat",
  description: "Profil Apotek & Produk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {}
        {children}
      </body>
    </html>
  );
}
