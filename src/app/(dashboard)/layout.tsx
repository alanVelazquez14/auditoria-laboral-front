"use client";
import { Sidebar } from "@/components/Sidebar";
import SplashScreen from "@/ui/SplashScreen";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {isLoading ? (
        <SplashScreen />
      ) : (
        <main className="flex-1 ml-64 p-8">{children}</main>
      )}
    </div>
  );
}
