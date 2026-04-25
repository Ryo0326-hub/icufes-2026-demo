import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ICU祭 Webサイト",
  description: "ICU祭のキャンパスマップとガイドサイト"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="bg-slate-950">
      <body className="bg-slate-950">
        <Navbar />
        <main className="bg-slate-950">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
