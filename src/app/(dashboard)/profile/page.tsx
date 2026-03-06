"use client";
import ProfilePage from "@/components/profilePage/ProfilePage";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";

export default function ProfileContainer() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = session?.user?.id;
  const token = session?.accessToken;

  useEffect(() => {
    console.log("Intentando fetch con:");
    console.log("ID:", userId);
    console.log("Token:", token);
    const fetchUser = async () => {
      if (status !== "authenticated" || !userId || !token) {
        if (status === "unauthenticated") setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          if (response.status === 401) {
            signOut({ callbackUrl: "/auth" });
            throw new Error("Sesión expirada. Redirigiendo...");
          }
          throw new Error("No se pudieron cargar tus datos de perfil.");
        }

        const data = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
        toast.error("Error al cargar el perfil", {
          description: err.message,
          style: {
            background: "#121217",
            color: "#fff",
            border: "1px solid #7c3aed30",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [status, userId, token]);

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-background">
        <p>No tienes acceso a esta página.</p>
      </div>
    );
  }

  if (status === "loading" || (loading && !user)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-purple"></div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-background">
        <div className="p-8 bg-red-500/10 rounded-2xl border border-red-500/20 max-w-md">
          <p className="text-red-400">No se pudo cargar la información.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-sm underline text-gray-400 hover:text-white"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return <ProfilePage userData={user} />;
}
