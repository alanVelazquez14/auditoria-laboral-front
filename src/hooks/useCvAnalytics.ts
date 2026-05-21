"use client";

import { apiClientRequest } from "@/lib/api-client";
import { handleApiError } from "@/utils/error-handler";
import type { BackendCvPerformanceItem } from "@/types/backend";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export function useCvAnalytics() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<BackendCvPerformanceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status !== "authenticated") {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const json = await apiClientRequest<BackendCvPerformanceItem[]>(
          "/api/analytics/cv-performance",
          {
            auth: true,
            session,
          },
        );

        setData(json);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Error desconocido";

        setError(message);
        handleApiError(err, "No pudimos cargar las analÃ­ticas");
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [session, status]);

  return { data, loading: loading || status === "loading", error };
}
