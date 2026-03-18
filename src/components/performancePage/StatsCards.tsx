import { Target, UserCheck, XCircle, Briefcase } from "lucide-react";

export function StatsCards({ data }: { data: any[] }) {
  const totalApps = data.reduce((acc, curr) => acc + curr.totalApplications, 0);
  const avgSuccess =
    data.length > 0
      ? data.reduce((acc, curr) => acc + curr.successRate, 0) / data.length
      : 0;

  const stats = [
    {
      label: "Total Postulaciones",
      value: totalApps,
      icon: Briefcase,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Efectividad Promedio",
      value: `${avgSuccess.toFixed(1)}%`,
      icon: Target,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      label: "Versiones Activas",
      value: data.length,
      icon: UserCheck,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#111118] border border-white/5 p-5 rounded-2xl flex items-center gap-4"
        >
          <div className={`${stat.bg} p-3 rounded-xl`}>
            <stat.icon size={24} className={stat.color} />
          </div>
          <div>
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">
              {stat.label}
            </p>
            <p className="text-2xl font-black text-white">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
