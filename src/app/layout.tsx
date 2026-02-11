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
    <html lang="en">
      <body className="antialiased items-center justify-center text-white flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
