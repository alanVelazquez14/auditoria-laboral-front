"use client";
import EmptyState from "@/components/EmptyState";
import StatCard from "@/components/StatCard";
import {
  ArrowRight,
  AlertTriangle,
  Loader2,
  BarChart3,
  Activity,
  TrendingDown,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

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
        console.log("userRes status:", userRes.status);
        console.log("appsRes status:", appsRes.status);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = useMemo(() => {
    const total = applications.length;
    const interviews = applications.filter(
      (app) =>
        app.status?.toUpperCase() === "INTERVIEWING" ||
        app.status?.toUpperCase() === "ENTREVISTA",
    ).length;
    const rejected = applications.filter(
      (app) =>
        app.status?.toUpperCase() === "REJECTED" ||
        app.status?.toUpperCase() === "RECHAZADA",
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
    return applications.slice(0, 3).map((app) => ({
      company: app.companyName || "Empresa desconocida",
      role: ROLE_LABELS[app.position] || app.position || "Puesto no definido",
      status:
        app.status?.toUpperCase() === "APPLIED"
          ? "Aplicada"
          : app.status?.toUpperCase() === "INTERVIEWING"
            ? "Entrevista"
            : app.status?.toUpperCase() === "REJECTED"
              ? "Rechazada"
              : "Pendiente",
      statusColor:
        app.status?.toUpperCase() === "REJECTED"
          ? "text-red-500"
          : app.status?.toUpperCase() === "INTERVIEWING"
            ? "text-cyan-500"
            : "text-gray-400",
    }));
  }, [applications]);

  if (loading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader2 className="animate-spin text-purple-500" size={32} />
      </div>
    );
  }

  return (
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
          {stats.total > 0 && stats.rejected > stats.interviews && (
            <div className="bg-[#1a1111] border border-red-900/30 p-4 rounded-xl flex gap-4 items-start">
              <AlertTriangle className="text-red-500 shrink-0" size={20} />
              <div>
                <h3 className="text-white font-bold text-sm">
                  Baja tasa de conversión detectada.
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  Tienes {stats.total} postulaciones y {stats.rejected}{" "}
                  rechazos. Considera optimizar tu CV para roles de{" "}
                  {recentActivity[0]?.role}.
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

          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all w-fit text-sm">
            Ver diagnóstico completo <ArrowRight size={16} />
          </button>

          {/* Actividad Reciente */}
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-6">
              Actividad reciente
            </h2>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-[#1a1a24]/50 border border-white/5"
                  >
                    <div>
                      <h4 className="text-white font-medium text-sm">
                        {item.company}
                      </h4>
                      <p className="text-gray-500 text-xs">{item.role}</p>
                    </div>
                    <span className={`text-xs font-medium ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 text-sm">
                    No hay actividad reciente.
                  </p>
                </div>
              )}
            </div>

            <Link
              href="/applications"
              className="w-full text-center text-purple-400 text-xs font-medium mt-6 hover:text-purple-300 transition-colors flex items-center justify-center gap-2"
            >
              Ver todas las postulaciones <ArrowRight size={14} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
