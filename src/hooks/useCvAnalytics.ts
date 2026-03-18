"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export function useCvAnalytics() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = session?.user?.id;
    if (status === "loading") return;
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/cv-performance/${userId}`,
        );
        if (!response.ok) throw new Error("Error al cargar analíticas");
        const json = await response.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return { data, loading: loading || status === "loading", error };
}
