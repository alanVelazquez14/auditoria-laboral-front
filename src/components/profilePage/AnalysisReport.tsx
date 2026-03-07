"use client";
import { CheckCircle2, XCircle, Lightbulb, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import AtsGuideModal from "./AtsGuideModal";

export default function AnalysisReport({ data }: { data: any }) {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  
  const getScoreColor = (score: number) => {
    if (score < 50) return "text-red-500";
    if (score < 80) return "text-yellow-500";
    return "text-green-500";
  };

  const getBarColor = (score: number) => {
    if (score < 50) return "bg-red-500";
    if (score < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <>
      <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
        {/* Score Header */}
        <div className="bg-background/50 border border-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">
              Puntaje de Compatibilidad ATS
            </span>
            <span
              className={`text-3xl font-black ${getScoreColor(data.score)}`}
            >
              {data.score}%
            </span>
          </div>
          <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ease-out ${getBarColor(data.score)}`}
              style={{ width: `${data.score}%` }}
            />
          </div>
        </div>

        {/* Lista de Verificaciones */}
        <div className="grid grid-cols-1 gap-3">
          {data.checks.map((check: any, index: number) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl border border-gray-800/50 bg-card-bg/30"
            >
              {check.passed ? (
                <CheckCircle2 className="text-green-500 shrink-0" size={18} />
              ) : (
                <XCircle className="text-red-500 shrink-0" size={18} />
              )}
              <div>
                <p className="text-sm font-semibold text-white">
                  {check.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{check.feedback}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tip de IA */}
        <div className="bg-brand-purple/10 border border-brand-purple/20 p-5 rounded-2xl flex gap-4">
          <div className="bg-brand-purple p-2 rounded-lg h-fit">
            <Lightbulb className="text-white" size={18} />
          </div>
          <div>
            <p className="text-brand-purple font-bold text-sm">
              Sugerencia Estratégica
            </p>
            <p className="text-gray-300 text-xs mt-1 leading-relaxed italic">
              "{data.improvementTip}"
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsGuideOpen(true)}
          className="w-full flex items-center justify-center gap-2 text-[11px] text-gray-500 hover:text-white transition-colors py-2 uppercase tracking-widest font-bold cursor-pointer"
        >
          ¿Cómo mejorar este puntaje? <ArrowUpRight size={14} />
        </button>
      </div>
      <AtsGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </>
  );
}
