import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "DepurApp",
  description: "Auditoría laboral para usuarios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased bg-[#0a0a0f] text-white flex flex-col items-center">
        <Navbar />
        <main className="w-full flex flex-col items-center">{children}</main>
      </body>
    </html>
  );
}
