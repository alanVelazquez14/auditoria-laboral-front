"use client";
import { Sidebar } from "@/components/Sidebar";
import SplashScreen from "@/ui/SplashScreen";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

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
        <main className="flex-1 ml-64 p-8">
          <Toaster
            theme="dark"
            position="bottom-right"
            richColors
            toastOptions={{
              style: {
                background: "#121217",
                border: "1px solid rgba(255,255,255,0.05)",
                color: "white",
              },
            }}
          />
          {children}
        </main>
      )}
    </div>
  );
}
