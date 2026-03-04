"use client";
import { DiagnosticData } from "@/app/(dashboard)/diagnostic/page";
import { useState, useEffect, useCallback } from "react";

export const useDiagnostics = (userId: string | undefined) => {
  const [data, setData] = useState<DiagnosticData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSummary = useCallback(async () => {
    if (!userId || userId === "undefined") return;
    console.log("userId:", userId);
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/diagnostics/${userId}/summary`,
        {
          cache: "no-store",
        },
      );
      if (!res.ok) throw new Error("Error en la petición");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { data, loading, generateNew: fetchSummary };
};
