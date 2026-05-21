"use client";
import { Sidebar } from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import "../globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64">
        {status === "loading" ? (
          <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-purple" />
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
