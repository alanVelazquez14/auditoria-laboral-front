"use client";

import { useDiagnostics } from "@/hooks/useDiagnostics";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { CheckCircle2, XCircle, ChevronDown, Rocket } from "lucide-react";
import { StatCard } from "@/components/diagnosticPage/StatCard";
import { getIcon, getIconColor } from "@/components/diagnosticPage/GetIcon";
import PageTransition from "@/components/PageTransition";
import { ISSUE_LABELS } from "@/lib/diagnosticLabels";
import { TechnicalHealthCard } from "@/components/diagnosticPage/TechnicalHealthCard";
import { apiClientRequest } from "@/lib/api-client";
import { handleApiError } from "@/utils/error-handler";
import { extractUserCvAnalysis, type CvAnalysis } from "@/lib/cv-analysis";
import type {
  BackendDiagnosticsSummary,
  BackendDiagnostic,
  BackendUserMe,
} from "@/types/backend";

export type Diagnostic = BackendDiagnostic;
export type DiagnosticData = BackendDiagnosticsSummary;

export default function DiagnosticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data, loading, generateNew } = useDiagnostics();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<CvAnalysis | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchUser = async () => {
      try {
        const user = await apiClientRequest<BackendUserMe>("/api/users/me", {
          auth: true,
          session,
        });

        setAnalysis(extractUserCvAnalysis(user));
      } catch (error) {
        handleApiError(error, "No pudimos cargar el análisis técnico");
      }
    };

    void fetchUser();
  }, [session, status]);

  const diagnostics = useMemo(() => {
    const currentServerDiags = Array.isArray(data)
      ? data
      : data?.diagnostics || [];

    if (currentServerDiags.length > 0) return currentServerDiags;

    const totalApps = data?.totalApplications || 0;

    if (totalApps >= 4) {
      return [
        {
          id: "low-conversion-initial",
          issue: "LOW_RESPONSE_RATE",
          priority: "high",
          recommendedAction: "Tu tasa de respuesta es baja...",
          notRecommendedAction: "No sigas aplicando masivamente...",
          generatedAt: new Date().toISOString(),
        },
      ];
    }
    return [];
  }, [data]);

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple mb-4" />
        <p className="animate-pulse text-gray-400">
          Analizando tus patrones...
        </p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-400 mb-4">
          Por favor, inicia sesión para ver tu diagnóstico.
        </p>
        <button
          onClick={() => router.push("/auth")}
          className="bg-brand-purple px-6 py-2 rounded-lg text-white font-bold"
        >
          Ir al login
        </button>
      </div>
    );
  }

  return (
    <PageTransition>
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
            disabled={loading}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer ${
              loading
                ? "bg-gray-700 cursor-not-allowed opacity-70"
                : "bg-brand-purple hover:bg-[#6d28d9] shadow-purple-500/20 text-white"
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                Analizando...
              </>
            ) : (
              "Re-evaluar perfil"
            )}
          </button>
        </header>
        <TechnicalHealthCard analysis={analysis} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            label="Alta prioridad"
            value={diagnostics.filter((d) => d.priority === "high").length}
            color="border-red-500/30 text-red-500"
          />
          <StatCard
            label="Media prioridad"
            value={diagnostics.filter((d) => d.priority === "medium").length}
            color="border-yellow-500/30 text-yellow-500"
          />
          <StatCard
            label="Total detectados"
            value={diagnostics.length}
            color="border-cyan-500/30 text-cyan-400"
          />
        </div>

        {loading ? (
          <DiagnosticSkeleton />
        ) : diagnostics.length === 0 ? (
          <div className="bg-card-bg border border-dashed border-gray-800 rounded-2xl p-20 text-center flex flex-col items-center">
            <div className="bg-brand-purple/10 p-5 rounded-full mb-6">
              <Rocket className="text-brand-purple w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold mb-2">Todo despejado</h2>
            <p className="text-gray-400 max-w-md mb-8">
              No hemos detectado problemas críticos en tu perfil. Sigue
              postulando para que podamos realizar un análisis más profundo.
            </p>
            <button
              onClick={() => router.push("/applications")}
              className="text-brand-purple border border-brand-purple/30 px-6 py-2 rounded-full hover:bg-brand-purple/10 transition cursor-pointer active:scale-95"
            >
              Cargar nuevas postulaciones
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {diagnostics.map((diag) => (
              <div
                key={diag.id}
                className={`transition-all duration-300 rounded-xl border ${
                  expandedId === diag.id
                    ? "bg-[#1a1a23] border-brand-purple/50 shadow-lg shadow-brand-purple/5"
                    : "bg-card-bg border-gray-800 hover:border-gray-700"
                }`}
              >
                <button
                  onClick={() =>
                    setExpandedId(expandedId === diag.id ? null : diag.id)
                  }
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-lg ${getIconColor(diag.issue)} bg-opacity-10`}
                    >
                      {getIcon(diag.issue)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-100 leading-tight">
                        {ISSUE_LABELS[diag.issue] ??
                          diag.issue.replace(/_/g, " ")}
                      </h3>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest ${
                          diag.priority === "high"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {diag.priority === "high"
                          ? "Crítico"
                          : "Mejora sugerida"}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      expandedId === diag.id
                        ? "rotate-180 text-brand-purple"
                        : ""
                    }`}
                  />
                </button>

                {expandedId === diag.id && (
                  <div className="px-5 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="h-px bg-gray-800/50 w-full mb-4" />

                    {diag.explanation && (
                      <div className="bg-brand-purple/5 border-l-2 border-brand-purple p-4 mb-4 rounded-r-lg">
                        <p className="text-[10px] text-brand-purple uppercase font-bold mb-1 tracking-widest">
                          Análisis detallado
                        </p>
                        <p className="text-sm text-gray-300 leading-relaxed italic">
                          &quot;{diag.explanation}&quot;
                        </p>
                      </div>
                    )}

                    <div className="flex gap-4 items-start bg-green-500/5 p-3 rounded-lg border border-green-500/10">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-green-500/70 uppercase font-bold mb-0.5">
                          Recomendación
                        </p>
                        <p className="text-sm text-gray-200">
                          {diag.recommendedAction}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-red-500/70 uppercase font-bold mb-0.5">
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
        )}
      </div>
    </PageTransition>
  );
}

const DiagnosticSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {[1, 2].map((i) => (
      <div
        key={i}
        className="bg-card-bg border border-gray-800 rounded-xl p-5 animate-pulse"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-gray-700 rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-700 rounded" />
            <div className="h-3 w-20 bg-gray-700 rounded" />
          </div>
        </div>
        <div className="h-px bg-gray-800 w-full mb-4" />
        <div className="space-y-3">
          <div className="h-12 bg-gray-800/50 rounded-lg w-full" />
        </div>
      </div>
    ))}
  </div>
);
