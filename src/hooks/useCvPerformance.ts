"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function useCvPerformance() {
  const { data: session } = useSession();
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.accessToken) return;

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        };

        const [evolRaw, convRaw] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cv-history/evolution`, {
            headers,
          }).then((res) => res.json()),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cv-history/conversion`,
            { headers },
          ).then((res) => res.json()),
        ]);

        const evol = Array.isArray(evolRaw) ? evolRaw : evolRaw.data || [];
        const conv = Array.isArray(convRaw) ? convRaw : convRaw.data || [];
        console.log("Primer item de Evolución:", evol[0]);
        const merged = conv.map((metric: any) => {
          const fullInfo = evol.find(
            (e: any) =>
              String(e.cvId || e.id) === String(metric.cvId || metric.id),
          );

          return {
            ...metric,
            cvId: metric.cvId || metric.id,
            score: fullInfo?.score || metric.score,
            cvURL: fullInfo?.cvURL || fullInfo?.cvUrl || null,
          };
        });

        setPerformanceData(merged);
      } catch (error) {
        console.error("Error en useCvPerformance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  return { performanceData, loading };
}
