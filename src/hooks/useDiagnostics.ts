"use client";

import { DiagnosticData } from "@/app/(dashboard)/diagnostic/page";
import { apiClientRequest } from "@/lib/api-client";
import { handleApiError } from "@/utils/error-handler";
import type { BackendDiagnosticsSummary } from "@/types/backend";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export const useDiagnostics = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<DiagnosticData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSummary = useCallback(async () => {
    if (status !== "authenticated") {
      return;
    }

    try {
      setLoading(true);
      const json = await apiClientRequest<BackendDiagnosticsSummary>(
        "/api/diagnostics/summary",
        {
          auth: true,
          cache: "no-store",
          session,
        },
      );

      setData(json);
    } catch (error) {
      handleApiError(error, "No pudimos cargar el diagnóstico");
    } finally {
      setLoading(false);
    }
  }, [status, session]);

  const generateNew = async () => {
    if (status !== "authenticated") {
      return;
    }

    setLoading(true);
    try {
      const newData = await apiClientRequest<BackendDiagnosticsSummary>(
        "/api/diagnostics/generate",
        {
          method: "POST",
          auth: true,
          session,
        },
      );

      setData(newData);
      toast.success("Diagnóstico actualizado");
    } catch (error) {
      handleApiError(error, "Análisis no disponible");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchSummary();
  }, [fetchSummary]);

  return { data, loading, generateNew };
};
