"use client";
import { ConversionChart } from "@/components/performancePage/ConversionChart";
import { IACoachBanner } from "@/components/performancePage/IACoachBanner";
import { StatsCards } from "@/components/performancePage/StatsCards";
import { useCvAnalytics } from "@/hooks/useCvAnalytics";
import { useCvPerformance } from "@/hooks/useCvPerformance";
import type { BackendCvPerformanceItem } from "@/types/backend";

export default function PerformancePage() {
  const { data, loading: loadingAnalytics } = useCvAnalytics();
  const { performanceData, loading: loadingPerformance } = useCvPerformance();

  if (loadingAnalytics || loadingPerformance)
    return (
      <div className="p-10 text-white italic">Sincronizando métricas...</div>
    );

  const enrichedData: BackendCvPerformanceItem[] = data.map((item) => {
    const perf = performanceData?.find(
      (p) => String(p.cvId) === String(item.cvId),
    );

    return {
      ...item,
      score: perf?.score ?? item.score,
      cvUrl: item.cvUrl || perf?.cvUrl || null,
    };
  });

  return (
    <div className="p-8 space-y-8 max-w-8xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Rendimiento
        </h1>
        <p className="text-gray-500 text-sm">
          Análisis de conversión y efectividad de tus perfiles.
        </p>
      </div>

      <IACoachBanner data={enrichedData || []} />

      <StatsCards data={enrichedData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversionChart
          data={enrichedData}
          title="Tasa de Éxito por Versión"
          type="success"
        />
        <ConversionChart
          data={enrichedData}
          title="Fuga de Conversión (Rechazos)"
          type="rejection"
        />
      </div>
    </div>
  );
}
