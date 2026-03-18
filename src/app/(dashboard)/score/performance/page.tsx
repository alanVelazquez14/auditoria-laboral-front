"use client";
import { ConversionChart } from "@/components/performancePage/ConversionChart";
import { IACoachBanner } from "@/components/performancePage/IACoachBanner";
import { StatsCards } from "@/components/performancePage/StatsCards";
import { useCvAnalytics } from "@/hooks/useCvAnalytics";

export default function PerformancePage() {
  const { data, loading } = useCvAnalytics();

  if (loading)
    return <div className="p-10 text-white">Cargando inteligencia...</div>;

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

      <IACoachBanner data={data} />

      <StatsCards data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversionChart
          data={data}
          title="Tasa de Éxito por Versión"
          type="success"
        />
        <ConversionChart
          data={data}
          title="Fuga de Conversión (Rechazos)"
          type="rejection"
        />
      </div>
    </div>
  );
}
