"use client";
import { Zap, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function IACoachBanner({ data }: { data: any[] }) {
  const bestCv =
    data && data.length > 0
      ? [...data].sort(
          (a, b) => Number(b.successRate) - Number(a.successRate),
        )[0]
      : null;

  const handleView = (url?: string) => {
    if (!url) {
      console.error("DEBUG: Objeto bestCv actual:", bestCv);
      toast.error("No hay URL disponible para este CV");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!bestCv || bestCv.successRate === 0) {
    return (
      <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 flex items-center gap-4">
        <div className="bg-gray-800 p-2 rounded-lg">
          <Zap size={20} className="text-gray-400" />
        </div>
        <p className="text-gray-500 text-sm">
          Aún no hay suficientes entrevistas para marcar una tendencia. ¡Sigue
          postulando!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-r from-purple-600/20 to-blue-600/10 border border-purple-500/30 rounded-2xl p-6 flex items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="bg-purple-600 p-2 rounded-lg mt-1 shadow-[0_0_15px_rgba(147,51,234,0.5)]">
          <Zap size={20} className="text-white fill-white" />
        </div>
        <div>
          <h3 className="text-purple-400 font-bold text-xs uppercase tracking-widest mb-1 text-[10px]">
            DepurApp Insight
          </h3>
          <p className="text-white text-sm leading-relaxed max-w-2xl">
            Tu perfil de{" "}
            <span className="text-cyan-400 font-bold">
              {(bestCv.dominantPosition || "Perfil").toUpperCase()}
            </span>{" "}
            tiene un
            <span className="font-black text-white ml-1">
              {Number(bestCv.successRate || 0).toFixed(0)}% de éxito
            </span>{" "}
            usando la versión de
            <span className="text-purple-300 font-semibold ml-1">
              {bestCv.score} puntos
            </span>
            .
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleView(bestCv.cvUrl)}
          className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all rounded-xl border border-white/10 group cursor-pointer"
          title="Ver archivo PDF"
        >
          <Eye
            size={18}
            className="group-hover:scale-110 transition-transform"
          />
        </button>

        <Link
          href={`/profile/cv-history?id=${bestCv.cvId}`}
          className="bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2.5 px-4 rounded-xl border border-white/10 transition-all whitespace-nowrap"
        >
          Ver en historial
        </Link>
      </div>
    </div>
  );
}
