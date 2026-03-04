"use client";
import { useDiagnostics } from "@/hooks/useDiagnostics";
import { useParams } from "next/navigation";
import { useState } from "react";
// Importa iconos de Lucide (si los tienes) o usa emojis/svg
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  BarChart3,
  Target,
  MapPin,
  Gauge,
} from "lucide-react";

export interface Diagnostic {
  id: string;
  issue: string;
  priority: "high" | "medium" | "low";
  recommendedAction: string;
  notRecommendedAction: string;
  generatedAt: string;
}

export interface DiagnosticData {
  score: any;
  diagnostics: Diagnostic[];

  lastUpdate: string;
}

export default function DiagnosticsPage() {
  const params = useParams();
  const userId =
    (params.userId as string) || "8c638037-fce4-41a1-9b12-142e5e9a0955";
  const { data, loading, generateNew } = useDiagnostics(userId);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple mb-4"></div>
        <p className="animate-pulse">Realizando análisis automático...</p>
      </div>
    );

  const diagnostics = data?.diagnostics || [];

  // Lógica para los contadores superiores
  const highPriority = diagnostics.filter((d) => d.priority === "high").length;
  const mediumPriority = diagnostics.filter(
    (d) => d.priority === "medium",
  ).length;
  const totalDetected = diagnostics.length;

  return (
    <div className="p-8 min-h-screen text-white font-sans">
      <header className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Diagnóstico</h1>
          <p className="text-gray-400 mt-1">
            Análisis automático basado en tus patrones de postulación
          </p>
        </div>
        <button
          onClick={generateNew}
          className="bg-brand-purple hover:bg-[#6d28d9] px-6 py-2.5 rounded-lg font-semibold transition-all shadow-lg shadow-purple-500/20 active:scale-95"
        >
          Re-evaluar Perfil
        </button>
      </header>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          label="Alta prioridad"
          value={highPriority}
          color="border-red-500/30 text-red-500"
        />
        <StatCard
          label="Media prioridad"
          value={mediumPriority}
          color="border-yellow-500/30 text-yellow-500"
        />
        <StatCard
          label="Total detectados"
          value={totalDetected}
          color="border-cyan-500/30 text-cyan-400"
        />
      </div>

      {/* --- DIAGNOSTICS LIST (Accordions) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {diagnostics.map((diag) => (
          <div
            key={diag.id}
            className={`transition-all duration-300 rounded-xl border ${
              expandedId === diag.id
                ? "bg-[#1a1a23] border-brand-purple/50"
                : "bg-card-bg border-gray-800"
            }`}
          >
            <button
              onClick={() =>
                setExpandedId(expandedId === diag.id ? null : diag.id)
              }
              className="w-full p-5 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${getIconColor(diag.issue)} bg-opacity-10`}
                >
                  {getIcon(diag.issue)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">
                    {diag.issue.replace(/_/g, " ")}
                  </h3>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${diag.priority === "high" ? "text-red-500" : "text-yellow-500"}`}
                  >
                    Prioridad {diag.priority === "high" ? "Alta" : "Media"}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${expandedId === diag.id ? "rotate-180" : ""}`}
              />
            </button>

            {expandedId === diag.id && (
              <div className="px-5 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2">
                <div className="h-px bg-gray-800 w-full mb-4" />
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">
                      Recomendación
                    </p>
                    <p className="text-sm text-gray-200">
                      {diag.recommendedAction}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">
                      Evitar
                    </p>
                    <p className="text-sm text-gray-200">
                      {diag.notRecommendedAction}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      className={`bg-card-bg border ${color} p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-inner`}
    >
      <span className="text-4xl font-bold mb-1">{value}</span>
      <span className="text-xs uppercase tracking-widest opacity-70 font-medium">
        {label}
      </span>
    </div>
  );
}

function getIcon(issue: string) {
  if (issue.includes("ATS"))
    return <BarChart3 className="w-5 h-5 text-red-400" />;
  if (issue.includes("SENIORITY"))
    return <Gauge className="w-5 h-5 text-red-400" />;
  if (issue.includes("MATCH"))
    return <Target className="w-5 h-5 text-yellow-400" />;
  if (issue.includes("GEOGRAFICA"))
    return <MapPin className="w-5 h-5 text-yellow-400" />;
  return <AlertCircle className="w-5 h-5 text-gray-400" />;
}

function getIconColor(issue: string) {
  if (issue.includes("ATS") || issue.includes("SENIORITY")) return "bg-red-500";
  return "bg-yellow-500";
}
