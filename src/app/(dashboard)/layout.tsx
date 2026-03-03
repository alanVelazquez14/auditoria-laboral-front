import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
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
    </div>
  );
}
