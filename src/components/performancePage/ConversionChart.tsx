import type { BackendCvPerformanceItem } from "@/types/backend";

export function ConversionChart({
  data,
  title,
  type,
}: {
  data: BackendCvPerformanceItem[];
  title: string;
  type: "success" | "rejection";
}) {
  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
      <h4 className="text-white font-bold text-sm mb-6">{title}</h4>
      <div className="space-y-6">
        {data.map((cv) => {
          const percentage =
            type === "success" ? cv.successRate : cv.rejectionRate;
          const color = type === "success" ? "bg-cyan-500" : "bg-red-500";

          return (
            <div key={`${cv.cvId}-${type}`} className="group">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <span className="text-white text-xs font-bold block">
                    CV {cv.score} PTS
                  </span>
                  <span className="text-gray-500 text-[10px] uppercase">
                    {cv.dominantPosition}
                  </span>
                </div>
                <span
                  className={`text-sm font-black ${type === "success" ? "text-cyan-400" : "text-red-400"}`}
                >
                  {percentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full">
                <div
                  className={`h-full ${color} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.5)]`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
