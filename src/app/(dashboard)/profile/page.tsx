"use client";
import ProfilePage from "@/components/profilePage/ProfilePage";
import { useEffect, useState } from "react";

export default function ProfileContainer() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const userId = localStorage.getItem("userId");

        if (!userId) {
          throw new Error(
            "No se encontró el ID de usuario en el almacenamiento local.",
          );
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          if (response.status === 401)
            throw new Error("Sesión expirada. Por favor, volvé a ingresar.");
          throw new Error("Error al obtener los datos del servidor.");
        }

        const data = await response.json();
        setUser(data);
      } catch (err: any) {
        console.error("Error en ProfileContainer:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple mb-4"></div>
        <p className="text-gray-400 animate-pulse">Sincronizando perfil...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center text-red-400 bg-red-500/10 rounded-2xl border border-red-500/20 max-w-md mx-auto mt-20">
        <p>No se pudo cargar la información del perfil.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm underline hover:text-white"
        >
          Reintentar
        </button>
      </div>
    );

  return <ProfilePage userData={user} />;
}
