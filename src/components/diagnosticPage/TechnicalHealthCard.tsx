import { Rocket } from "lucide-react";
import type { CvAnalysis } from "@/lib/cv-analysis";

export const TechnicalHealthCard = ({
  analysis,
}: {
  analysis: CvAnalysis | null;
}) => {
  if (!analysis) return null;

  return (
    <div className="mb-10 bg-card-bg border border-gray-800 rounded-2xl p-6 overflow-hidden relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Rocket size={140} className="text-brand-purple" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="relative size-28">
            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-gray-800 stroke-3"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-brand-purple stroke-3 transition-all duration-1000 ease-out"
                strokeDasharray={`${analysis.score}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-white">
              {analysis.score}%
            </div>
          </div>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            Match técnico
          </span>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              Potencial de reclutamiento
            </h2>
            <p className="text-sm text-gray-400">{analysis.summary}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {analysis.checks
              .filter((check) => check.passed)
              .map((check, i) => (
                <span
                  key={`${check.label}-${i}`}
                  className="px-3 py-1 bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-[12px] font-medium rounded-full"
                >
                  {check.label}
                </span>
              ))}
          </div>

          {analysis.improvementTip && (
            <div className="bg-brand-purple/5 border-l-2 border-brand-purple pl-4 py-2 mt-2">
              <p className="text-sm text-gray-300 italic leading-relaxed">
                &quot;{analysis.improvementTip}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
