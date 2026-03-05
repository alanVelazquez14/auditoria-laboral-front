"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  AlertTriangle,
  PieChart as PieIcon,
  BarChart3,
  Activity,
  TrendingDown,
  AlertCircle,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import StatCard from "@/components/StatCard";

import EmptyState from "@/components/EmptyState";
import PageTransition from "@/components/PageTransition";

const ROLE_LABELS: Record<string, string> = {
  frontend: "Frontend Developer",
  backend: "Backend Developer",
  fullstack: "Fullstack Developer",
  mobile: "Mobile Developer",
  devops: "DevOps Engineer",
  data: "Data Scientist",
};

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        setLoading(false);
        return;
      }

      try {
        const [userRes, appsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${userId}/history`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          ),
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
        }

        if (appsRes.ok) {
          const appsData = await appsRes.json();
          const finalApps = Array.isArray(appsData)
            ? appsData
            : appsData.data || [];
          setApplications(finalApps);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = useMemo(() => {
    if (applications.length === 0) return { trend: [], distribution: [] };

    const trend = applications
      .slice()
      .reverse()
      .map((app, index) => ({
        name: app.companyName || `Post. ${index + 1}`,
        match: (app.matchLevel || 0) * 10,
      }))
      .slice(-10);

    const distribution = [
      {
        name: "Ofertas",
        value: applications.filter((a) => a.status === "HIRED").length,
        color: "#22c55e",
      },
      {
        name: "Entrevistas",
        value: applications.filter((a) => a.status === "INTERVIEW").length,
        color: "#22d3ee",
      },
      {
        name: "En proceso",
        value: applications.filter((a) => a.status === "REVIEWING").length,
        color: "#3b82f6",
      },
      {
        name: "Aplicadas",
        value: applications.filter((a) => a.status === "APPLIED").length,
        color: "#7c3aed",
      },
      {
        name: "Rechazos",
        value: applications.filter((a) => a.status === "REJECTED").length,
        color: "#ef4444",
      },
    ].filter((item) => item.value > 0);

    return { trend, distribution };
  }, [applications]);

  const stats = useMemo(() => {
    const total = applications.length;
    const interviews = applications.filter((app) => {
      const isCurrentlyInterview = app.status?.toUpperCase() === "INTERVIEW";
      const hadInterviewInHistory = app.statusHistory?.some(
        (h: any) => h.newStatus?.toUpperCase() === "INTERVIEW",
      );

      return isCurrentlyInterview || hadInterviewInHistory;
    }).length;

    const rejected = applications.filter(
      (app) => app.status?.toUpperCase() === "REJECTED",
    ).length;

    const sumMatch = applications.reduce(
      (acc, app) => acc + (Number(app.matchLevel) || 0),
      0,
    );
    const avgMatch = total > 0 ? Math.round((sumMatch / total) * 10) : 0;
    const conversionRate =
      total > 0 ? Math.round((interviews / total) * 100) : 0;
    const rejectionRate = total > 0 ? Math.round((rejected / total) * 100) : 0;

    return {
      total,
      interviews,
      rejected,
      avgMatch,
      conversionRate,
      rejectionRate,
    };
  }, [applications]);

  const recentActivity = useMemo(() => {
    return applications.slice(0, 3).map((app) => {
      const statusUpper = app.status?.toUpperCase();

      let label = "Pendiente";
      let color = "text-gray-400";

      switch (statusUpper) {
        case "INTERVIEW":
          label = "Entrevista";
          color = "text-cyan-500";
          break;
        case "REJECTED":
          label = "Rechazada";
          color = "text-red-500";
          break;
        case "REVIEWING":
          label = "En proceso";
          color = "text-blue-500";
          break;
        case "APPLIED":
          label = "Aplicada";
          color = "text-purple-500";
          break;
        case "HIRED":
          label = "Oferta";
          color = "text-green-500";
          break;
        default:
          label = app.status || "Pendiente";
          color = "text-gray-400";
      }

      return {
        company: app.companyName || "Empresa desconocida",
        role: ROLE_LABELS[app.position] || app.position || "Puesto no definido",
        status: label,
        statusColor: color,
      };
    });
  }, [applications]);

  if (loading) return null;

  const getFeedbackBanner = () => {
    const { total, avgMatch, conversionRate } = stats;

    // Caso: Sin suficientes datos
    if (total < 3) return null;

    // Caso: MAL (Imagen que pasaste)
    if (conversionRate < 10 && total >= 5) {
      return {
        title: "Alta actividad, bajo impacto.",
        message:
          "Tus números muestran mucho movimiento pero poca conversión. Esto suele indicar un problema de estrategia, no de esfuerzo.",
        type: "error",
        icon: <AlertTriangle className="text-red-500" size={20} />,
      };
    }

    // Caso: REGULAR
    if (avgMatch < 60) {
      return {
        title: "Mejora tu afinidad.",
        message:
          "Estás aplicando a muchos roles, pero tu nivel de match es bajo. Intenta personalizar más tu CV para estas vacantes.",
        type: "warning",
        icon: <AlertCircle className="text-yellow-500" size={20} />,
      };
    }

    // Caso: BIEN
    if (conversionRate >= 20) {
      return {
        title: "¡Excelente estrategia!",
        message:
          "Tu tasa de conversión es alta. Estás apuntando a los roles correctos y tu perfil resulta atractivo para los reclutadores.",
        type: "success",
        icon: <Activity className="text-cyan-500" size={20} />,
      };
    }

    return null;
  };

  const banner = getFeedbackBanner();

  return (
    <PageTransition>
      <div className="max-w-7xl mx-10 space-y-8">
        {!user || user.profileCompleted === false ? (
          <EmptyState />
        ) : (
          <>
            <header>
              <h1 className="text-3xl font-bold text-white">
                Hola, {user.fullName?.split(" ")[0] || "Usuario"}
              </h1>
            </header>

            {/* Banner de Alerta */}
            {banner && (
              <div
                className={`p-4 rounded-xl border flex gap-4 items-start transition-all ${
                  banner.type === "error"
                    ? "bg-[#1a1111] border-red-900/30"
                    : banner.type === "warning"
                      ? "bg-[#1a1711] border-yellow-900/30"
                      : "bg-[#111a1a] border-cyan-900/30"
                }`}
              >
                <div className="shrink-0 mt-0.5">{banner.icon}</div>
                <div>
                  <h3 className="text-white font-bold text-sm">
                    {banner.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    {banner.message}
                  </p>
                </div>
              </div>
            )}

            {/* Grid de Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard
                label="Postulaciones"
                value={stats.total.toString()}
                color="text-purple-500"
                icon={BarChart3}
                subtext="últimos 30 días"
              />
              <StatCard
                label="Entrevistas"
                value={stats.interviews.toString()}
                color="text-cyan-400"
                icon={Activity}
                subtext={`${stats.conversionRate}% de conversión`}
                subtextColor="text-cyan-500/70"
              />
              <StatCard
                label="Rechazos"
                value={stats.rejected.toString()}
                color="text-red-400"
                icon={TrendingDown}
                subtext={`${stats.rejectionRate}% del total`}
                subtextColor="text-red-500/70"
              />
              <StatCard
                label="Match promedio"
                value={`${stats.avgMatch}%`}
                color="text-yellow-500"
                icon={AlertCircle}
                subtext={
                  stats.avgMatch < 60
                    ? "Por debajo del ideal"
                    : "Buen fit general"
                }
                subtextColor="text-yellow-600/70"
              />
            </div>

            {/* --- SECCIÓN DE GRÁFICOS (Solo si hay aplicaciones) --- */}
            {applications.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Gráfico de Distribución (4 columnas) */}
                <div className="lg:col-span-4 bg-card-bg border border-white/5 rounded-2xl p-6 flex flex-col h-full">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
                    <PieIcon size={16} className="text-cyan-400" /> Distribución
                    de Estados
                  </h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.distribution}
                          innerRadius={70}
                          outerRadius={90}
                          paddingAngle={8}
                          dataKey="value"
                          stroke="none"
                        >
                          {chartData.distribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#121217",
                            border: "1px solid #ffffff10",
                            borderRadius: "12px",
                          }}
                          itemStyle={{ color: "#fff" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Leyenda mejorada para ocupar el espacio vertical */}
                  <div className="space-y-3 mt-4">
                    {chartData.distribution.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs text-gray-400 font-medium group-hover:text-gray-200 transition-colors">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-xs text-white font-bold bg-white/5 px-2 py-0.5 rounded-md">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actividad Reciente (8 columnas) */}
                <div className="lg:col-span-8 bg-card-bg border border-white/5 rounded-2xl p-6 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white font-semibold flex items-center gap-2 text-sm">
                      <Activity size={16} className="text-purple-500" />{" "}
                      Actividad reciente
                    </h2>
                    <Link
                      href="/applications"
                      className="text-purple-400 text-[11px] font-bold hover:text-purple-300 transition-colors uppercase tracking-wider"
                    >
                      Ver todas
                    </Link>
                  </div>

                  <div className="space-y-3 grow">
                    {recentActivity.length > 0 ? (
                      recentActivity.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-xl bg-[#1a1a24]/30 border border-white/5 hover:border-purple-500/30 transition-all group"
                        >
                          <div>
                            <h4 className="text-white font-medium text-sm group-hover:text-purple-400 transition-colors">
                              {item.company}
                            </h4>
                            <p className="text-gray-500 text-xs mt-0.5">
                              {item.role}
                            </p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-widest ${item.statusColor}`}
                            >
                              {item.status}
                            </span>
                            {/* Podrías agregar la fecha aquí si la tienes en el objeto */}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-10 text-gray-500 text-sm italic">
                        Sin movimientos recientes.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {applications.length === 0 && (
              <div className="bg-card-bg border border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="text-purple-500" size={32} />
                </div>
                <div className="max-w-sm space-y-2">
                  <h3 className="text-white font-bold text-xl">
                    Comienza tu camino
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Aún no has registrado ninguna postulación. Para obtener un
                    diagnóstico de tu perfil y ver tus estadísticas, necesitas
                    agregar tu primera postulación.
                  </p>
                </div>
                <Link
                  href="/applications"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all group"
                >
                  Registrar mi primera postulación
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            )}
            {/* <Link
              href="/diagnostic"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all w-fit text-sm cursor-pointer"
            >
              Ver diagnóstico completo <ArrowRight size={16} />
            </Link> */}
          </>
        )}
      </div>
    </PageTransition>
  );
}
