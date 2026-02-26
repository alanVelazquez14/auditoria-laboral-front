import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased bg-[#0a0a0f] text-white">
        {children}
      </body>
    </html>
  );
}