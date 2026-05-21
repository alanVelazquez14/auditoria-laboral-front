"use client";

import { apiClientRequest } from "@/lib/api-client";
import { handleApiError } from "@/utils/error-handler";
import type {
  BackendCvHistoryConversionItem,
  BackendCvHistoryEvolutionItem,
} from "@/types/backend";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export type CvPerformanceTimelinePoint = {
  cvId: string;
  score: number;
  versionDate: string;
  cvUrl: string | null;
  efficiency: number;
  totalApplied: number;
};

export function useCvPerformance() {
  const { data: session, status } = useSession();
  const [performanceData, setPerformanceData] = useState<
    CvPerformanceTimelinePoint[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (status !== "authenticated") {
        setLoading(status === "loading");
        return;
      }

      try {
        const [evolution, conversion] = await Promise.all([
          apiClientRequest<BackendCvHistoryEvolutionItem[]>(
            "/api/cv-history/evolution",
            {
              auth: true,
              session,
            },
          ),
          apiClientRequest<BackendCvHistoryConversionItem[]>(
            "/api/cv-history/conversion",
            {
              auth: true,
              session,
            },
          ),
        ]);

        const merged = conversion.map((metric) => {
          const fullInfo =
            evolution.find((item) => item.date === metric.cvDate) ??
            evolution.find((item) => item.score === metric.score);

          return {
            cvId: fullInfo?.versionId ?? metric.cvDate,
            score: fullInfo?.score ?? metric.score,
            versionDate: fullInfo?.date ?? metric.cvDate,
            cvUrl: fullInfo?.cvUrl ?? null,
            efficiency: metric.efficiency,
            totalApplied: metric.totalApplied,
          };
        });

        setPerformanceData(merged);
      } catch (error) {
        handleApiError(error, "No pudimos cargar el rendimiento de CV");
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [session, status]);

  return { performanceData, loading };
}
