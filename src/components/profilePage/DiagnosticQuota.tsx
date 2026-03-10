"use client";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Zap } from "lucide-react";

export default function DiagnosticQuota({
  refreshTrigger,
  onQuotaChange,
}: {
  refreshTrigger?: number;
  onQuotaChange?: (remaining: number) => void;
}) {
  const [quota, setQuota] = useState<{
    allowed: boolean;
    remaining: number;
  } | null>(null);

  const fetchQuota = async () => {
    try {
      const session = await getSession();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/quota`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );
      if (res.ok) {
        const data = await res.json();
        setQuota(data);
        if (onQuotaChange) onQuotaChange(data.remaining);
      }
    } catch (error) {
      console.error("Error al obtener cuota", error);
    }
  };

  useEffect(() => {
    fetchQuota();
  }, [refreshTrigger]);

  return null;
}
