"use client";

import ProfilePage from "@/components/profilePage/ProfilePage";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { apiClientRequest } from "@/lib/api-client";
import { handleApiError } from "@/utils/error-handler";
import type { BackendUserMe } from "@/types/backend";

export default function ProfileContainer() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<BackendUserMe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (status !== "authenticated") {
        if (status === "unauthenticated") {
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await apiClientRequest<BackendUserMe>("/api/users/me", {
          method: "GET",
          auth: true,
          session,
        });

        setUser(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Error desconocido";

        setError(message);
        handleApiError(err, "Error al cargar el perfil");
        toast.error("Error al cargar el perfil", {
          description: message,
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

    void fetchUser();
  }, [session, status]);

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>No tienes acceso a esta página.</p>
      </div>
    );
  }

  if (status === "loading" || (loading && !user)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-purple" />
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

  if (!user) {
    return null;
  }

  return <ProfilePage userData={user} />;
}
