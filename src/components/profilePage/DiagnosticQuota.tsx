"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { apiClientRequest } from "@/lib/api-client";
import type { BackendQuotaResponse } from "@/types/backend";

export default function DiagnosticQuota({
  refreshTrigger,
  onQuotaChange,
}: {
  refreshTrigger?: number;
  onQuotaChange?: (remaining: number) => void;
}) {
  const { data: session, status } = useSession();
  const [quota, setQuota] = useState<BackendQuotaResponse | null>(null);

  useEffect(() => {
    const fetchQuota = async () => {
      if (status !== "authenticated") {
        return;
      }

      try {
        const data = await apiClientRequest<BackendQuotaResponse>(
          "/api/users/me/quota",
          {
          auth: true,
          session,
        });

        setQuota(data);
        onQuotaChange?.(data.remaining);
      } catch (error) {
        console.error("Error al obtener cuota", error);
      }
    };

    void fetchQuota();
  }, [onQuotaChange, refreshTrigger, session, status]);

  return quota ? null : null;
}
