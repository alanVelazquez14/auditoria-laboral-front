"use client";

import { DiagnosticData } from "@/app/(dashboard)/diagnostic/page";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export const useDiagnostics = () => {
  const [data, setData] = useState<DiagnosticData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSummary = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/diagnostics/summary`,
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        },
      );

      if (res.status === 401) {
        console.warn("Sesión expirada o token inválido");
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
  }, []);

  const generateNew = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/diagnostics/generate`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const newData = await response.json();

      if (!response.ok) {
        toast.warning("Análisis no disponible", {
          description:
            newData.message || "Faltan postulaciones para un nuevo análisis",
          style: { border: "1px solid #7c3aed30", background: "#121217" },
        });
        return;
      }

      setData(newData);
      toast.success("¡Diagnóstico actualizado!", {
        description: "Hemos recalculado tus métricas con éxito.",
      });
    } catch (error) {
      toast.error("Error de conexión", {
        description: "No pudimos contactar con el servidor.",
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
