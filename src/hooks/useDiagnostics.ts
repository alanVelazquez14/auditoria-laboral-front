"use client";

import { DiagnosticData } from "@/app/(dashboard)/diagnostic/page";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export const useDiagnostics = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<DiagnosticData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSummary = useCallback(async () => {
    if (status !== "authenticated") return;

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/diagnostics/summary`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          cache: "no-store",
        },
      );

      if (res.status === 401) {
        toast.error("Tu sesión ha expirado", {
          description: "Por seguridad, debes volver a ingresar.",
          style: {
            background: "#121217",
            color: "#fff",
            border: "1px solid #ef444450",
          },
        });
        signOut({ callbackUrl: "/auth" });
        return;
      }

      if (!res.ok) throw new Error("Error en la petición");

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching diagnostics:", err);
    } finally {
      setLoading(false);
    }
  }, [status, session]);

  const generateNew = async () => {
    if (status !== "authenticated") return;
    const token = session?.user?.accessToken;

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/diagnostics/generate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const newData = await response.json();

      if (!response.ok) {
        toast.warning("Análisis no disponible", {
          description: newData.message || "Faltan postulaciones",
          style: {
            border: "1px solid #7c3aed30",
            background: "#121217",
            color: "#fff",
          },
        });
        return;
      }

      setData(newData);
      toast.success("¡Diagnóstico actualizado!");
    } catch (error) {
      toast.error("Error al cargar diagnóstico", {
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

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { data, loading, generateNew };
};
