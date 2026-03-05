import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
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
        <NextTopLoader
          color="#7c3aed"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          showSpinner={false}
          easing="ease"
          shadow="0 0 10px #7c3aed,0 0 5px #7c3aed"
        />
        {children}
      </body>
    </html>
  );
}
