import { Zap } from "lucide-react";

export function IACoachBanner({ data }: { data: any[] }) {
  const bestCv = [...data].sort((a, b) => b.successRate - a.successRate)[0];

  return (
    <div className="bg-linear-to-r from-purple-600/20 to-blue-600/10 border border-purple-500/30 rounded-2xl p-6 flex items-start gap-4">
      <div className="bg-purple-600 p-2 rounded-lg mt-1">
        <Zap size={20} className="text-white fill-white" />
      </div>
      <div>
        <h3 className="text-purple-400 font-bold text-xs uppercase tracking-widest mb-1">
          DepurApp Tip
        </h3>
        <p className="text-white text-sm leading-relaxed">
          {bestCv?.successRate > 0
            ? `Detectamos que las empresas de ${bestCv.dominantPosition.toUpperCase()} responden un ${bestCv.successRate.toFixed(0)}% más a tu perfil cuando usas el CV de ${new Date(bestCv.versionDate).toLocaleDateString()}.`
            : "Aún no hay suficientes entrevistas para marcar una tendencia. ¡Sigue postulando para activar el Coach!"}
        </p>
      </div>
    </div>
  );
}
