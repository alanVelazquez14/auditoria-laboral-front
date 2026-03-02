import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  color?: string;
  subtext?: string;
  subtextColor?: string;
  icon?: LucideIcon;
}

export default function StatCard({
  label,
  value,
  color = "text-white",
  subtext,
  subtextColor = "text-gray-500",
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="bg-[#111118] p-6 rounded-2xl border border-white/5 shadow-xl flex flex-col justify-between min-h-35">
      <div>
        <div className="flex items-center gap-2 mb-4">
          {Icon && <Icon size={16} className={`${color} opacity-60`} />}
          <p className="text-gray-400 text-xs font-medium opacity-80">
            {label}
          </p>
        </div>
        <p className={`text-4xl font-bold tracking-tight ${color}`}>{value}</p>
      </div>

      {subtext && (
        <p className={`text-[11px] mt-4 font-medium ${subtextColor}`}>
          {subtext}
        </p>
      )}
    </div>
  );
}
