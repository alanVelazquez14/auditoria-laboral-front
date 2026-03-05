"use client";
import { useDiagnostics } from "@/hooks/useDiagnostics";
import PageTransition from "@/components/PageTransition";
import { Activity, Target, TrendingUp, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { ScoreCircle } from "@/components/scorePage/ScoreCircle";
import { PillarCard } from "@/components/scorePage/PillarCard";

export default function ScorePage() {
  const { data, loading } = useDiagnostics();

  if (loading)
    return <div className="p-8 text-white">Cargando análisis...</div>;

  const scoreData = data?.score;

  return (
    <PageTransition>
      <div className="p-8 max-w-8xl min-h-[85vh] flex flex-col">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Mi Puntaje
          </h1>
          <p className="text-gray-400 mt-2">
            Análisis detallado de tu competitividad en el mercado laboral.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* COLUMNA IZQUIERDA: Círculo Principal */}
          <div className="lg:col-span-1 sticky top-8">
            <ScoreCircle
              score={scoreData?.totalScore || 0}
              label="Puntaje General"
            />

            {/* Widget de Mejora */}
            <div className="mt-6 p-4 rounded-xl bg-card-bg border border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <TrendingUp className="text-green-500 w-5 h-5" />
                </div>
                <span className="text-sm text-gray-300">Tendencia</span>
              </div>
              <span
                className={`font-bold text-lg ${(scoreData?.improvementScore || 0) >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {(scoreData?.improvementScore || 0) >= 0 ? "+" : ""}
                {scoreData?.improvementScore || 0} pts
              </span>
            </div>
          </div>

          {/* COLUMNA DERECHA: Desglose de Pilares */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pillar: Disciplina */}
            <PillarCard
              icon={<Activity className="text-brand-purple" />}
              title="Disciplina de Postulación"
              value={scoreData?.disciplineScore || 0}
              description="Mide tu constancia semanal. Mantener un ritmo de 5 postulaciones es clave."
              color="#7c3aed"
            />

            {/* Pillar: Alineación */}
            <PillarCard
              icon={<Target className="text-cyan-400" />}
              title="Alineación (Match Rate)"
              value={scoreData?.alignmentScore || 0}
              description="Qué tan bien encajan tus habilidades con las ofertas a las que aplicas."
              color="#22d3ee"
            />

            {/* Info Adicional */}
            <div className="bg-card-bg border border-dashed border-gray-800 p-6 rounded-2xl flex items-center gap-4">
              <Calendar className="text-gray-500 w-6 h-6" />
              <p className="text-sm text-gray-400">
                Este análisis se calculó en base a tus últimas{" "}
                <strong>{data?.totalApplications}</strong> postulaciones
                registradas
                {data?.lastUpdate && (
                  <>
                    {" "}
                    hasta el {new Date(data.lastUpdate).toLocaleDateString()}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-gray-600 text-sm italic border border-gray-800 p-4 rounded-lg bg-card-bg text-center">
            "Este score se recalcula automáticamente en base a tu actividad y
            las acciones correctivas que implementes. No hay atajos."
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
