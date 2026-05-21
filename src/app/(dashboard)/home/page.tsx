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
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import StatCard from "@/components/StatCard";
import EmptyState from "@/components/EmptyState";
import PageTransition from "@/components/PageTransition";
import { ActivationChecklist } from "@/components/homePage/ActivationChecklist";
import { HomeLoadingState } from "@/components/homePage/HomeLoadingState";
import {
  NextBestActionCard,
  type NextBestAction,
} from "@/components/homePage/NextBestActionCard";
import { apiClientRequest } from "@/lib/api-client";
import { extractUserCvAnalysis } from "@/lib/cv-analysis";
import { handleApiError } from "@/utils/error-handler";
import { useSession } from "next-auth/react";
import type { BackendJobApplication, BackendUserMe } from "@/types/backend";

const ROLE_LABELS: Record<string, string> = {
  frontend: "Frontend Developer",
  backend: "Backend Developer",
  fullstack: "Fullstack Developer",
  mobile: "Mobile Developer",
  devops: "DevOps Engineer",
  data: "Data Scientist",
};

export default function HomePage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<BackendUserMe | null>(null);
  const [applications, setApplications] = useState<BackendJobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (status === "loading") {
        return;
      }

      if (status !== "authenticated") {
        setLoading(false);
        return;
      }

      try {
        const [userData, appsData] = await Promise.all([
          apiClientRequest<BackendUserMe>("/api/users/me", {
            auth: true,
            session,
          }),
          apiClientRequest<BackendJobApplication[]>("/api/job-applications", {
            auth: true,
            session,
          }),
        ]);

        setUser(userData);
        setApplications(appsData);
      } catch (error) {
        handleApiError(error, "No pudimos cargar el dashboard");
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [session, status]);

  const chartData = useMemo(() => {
    if (applications.length === 0) {
      return { trend: [], distribution: [] };
    }

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
        (h) => h.newStatus?.toUpperCase() === "INTERVIEW",
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

  const hasInterviewOpportunity = useMemo(() => {
    return applications.some((app) => {
      const isInterviewStage = app.status === "INTERVIEW";
      const notCompleted = app.interview?.status !== "COMPLETED";

      return isInterviewStage && notCompleted;
    });
  }, [applications]);

  const activationSteps = useMemo(() => {
    const steps = [
      {
        id: "profile",
        title: "Completa tu perfil",
        description:
          "Necesitamos tu stack, experiencia y objetivo para que las recomendaciones tengan contexto real.",
        href: "/completeProfile",
        cta: "Completar perfil",
        completed: Boolean(user?.profileCompleted),
      },
      {
        id: "cv",
        title: "Sube tu CV base",
        description:
          "Activa el anÃ¡lisis ATS y empieza a detectar quÃ© estÃ¡ frenando tus respuestas.",
        href: "/profile",
        cta: "Subir CV",
        completed: Boolean(user?.cvUrl),
      },
      {
        id: "applications",
        title: "Registra tus postulaciones",
        description:
          "Sin historial de aplicaciones no hay mÃ©tricas ni diagnÃ³stico accionable.",
        href: "/applications",
        cta: "Registrar postulaciones",
        completed: applications.length > 0,
      },
      {
        id: "interviews",
        title: "Entrena tu primera entrevista",
        description:
          "Cuando una candidatura avance a entrevista, practica respuestas antes de hablar con reclutadores.",
        href: "/interviews",
        cta: "Practicar entrevista",
        completed: applications.some(
          (app) => app.interview?.status === "COMPLETED",
        ),
      },
    ];

    return steps;
  }, [applications, user]);

  const nextBestAction = useMemo<NextBestAction | null>(() => {
    if (!user) {
      return null;
    }

    if (!user.profileCompleted) {
      return {
        title: "Completa tu perfil antes de seguir aplicando",
        description:
          "TodavÃ­a no tenemos suficiente contexto sobre tu experiencia, stack y objetivo laboral. Sin eso, las mÃ©tricas no pueden convertirse en decisiones precisas.",
        impact:
          "Desbloquea diagnÃ³stico personalizado, score estratÃ©gico y recomendaciones mucho mÃ¡s confiables.",
        href: "/completeProfile",
        cta: "Terminar onboarding",
        tone: "purple",
        icon: "sparkles",
      };
    }

    if (!user.cvUrl) {
      return {
        title: "Sube tu CV y activa la capa inteligente del producto",
        description:
          "DepurApp ya puede medir tu bÃºsqueda, pero sin CV no puede detectar quÃ© estÃ¡ afectando tu match ni cÃ³mo mejorar tu posicionamiento.",
        impact:
          "ObtendrÃ¡s score ATS, checks concretos y una sugerencia priorizada para mejorar tu perfil.",
        href: "/profile",
        cta: "Analizar mi CV",
        tone: "cyan",
        icon: "cv",
      };
    }

    if (applications.length === 0) {
      return {
        title: "Registra tu primera postulaciÃ³n",
        description:
          "TodavÃ­a no hay seÃ±ales suficientes para medir conversiÃ³n, rechazo ni velocidad de avance. Tu dashboard necesita casos reales para volverse Ãºtil.",
        impact:
          "A partir de la primera postulaciÃ³n empiezas a construir historial, embudo y patrones por tipo de rol.",
        href: "/applications",
        cta: "Cargar postulaciÃ³n",
        tone: "purple",
        icon: "briefcase",
      };
    }

    if (hasInterviewOpportunity) {
      return {
        title: "Tienes una entrevista lista para entrenar",
        description:
          "Una de tus postulaciones ya estÃ¡ en etapa de entrevista. Este es el momento de practicar antes de hablar con un reclutador real.",
        impact:
          "Mejorar tu claridad en entrevista tiene un efecto mÃ¡s inmediato que seguir enviando nuevas postulaciones hoy.",
        href: "/interviews",
        cta: "Entrenar ahora",
        tone: "cyan",
        icon: "target",
      };
    }

    if (stats.avgMatch < 60) {
      return {
        title: "Tu match promedio es bajo: corrige el CV antes de escalar volumen",
        description:
          "EstÃ¡s aplicando, pero la afinidad media con las vacantes estÃ¡ por debajo de lo ideal. Seguir enviando sin corregir eso diluye tu esfuerzo.",
        impact:
          "Una mejora en match puede levantar respuestas sin necesidad de duplicar el volumen de postulaciones.",
        href: "/profile",
        cta: "Revisar CV y perfil",
        tone: "amber",
        icon: "cv",
      };
    }

    if (stats.total >= 5 && stats.conversionRate < 10) {
      return {
        title: "Tu conversiÃ³n es baja: necesitas un ajuste de estrategia",
        description:
          "Ya hay suficiente actividad para leer una seÃ±al clara: tus postulaciones no estÃ¡n avanzando al ritmo esperado.",
        impact:
          "El diagnÃ³stico puede mostrarte si el cuello de botella estÃ¡ en constancia, seniority o calidad del fit.",
        href: "/diagnostic",
        cta: "Ver diagnÃ³stico",
        tone: "amber",
        icon: "sparkles",
      };
    }

    if (stats.total < 5) {
      return {
        title: "Suma mÃ¡s seÃ±ales antes de sacar conclusiones",
        description:
          "Tu base de datos todavÃ­a es chica. Antes de optimizar demasiado pronto, conviene generar un poco mÃ¡s de volumen con consistencia.",
        impact:
          "Con mÃ¡s postulaciones el score, el diagnÃ³stico y los insights se vuelven mÃ¡s confiables.",
        href: "/applications",
        cta: "Seguir registrando",
        tone: "purple",
        icon: "briefcase",
      };
    }

    const cvAnalysis = extractUserCvAnalysis(user);
    if (cvAnalysis && cvAnalysis.score < 75) {
      return {
        title: "Tu CV todavÃ­a tiene margen de mejora visible",
        description:
          "Ya tienes movimiento real y una base de datos suficiente. El siguiente salto probablemente venga de mejorar tu documento principal.",
        impact:
          "Un CV mÃ¡s fuerte puede aumentar tanto tu match como la tasa de entrevista en roles similares.",
        href: "/profile",
        cta: "Optimizar CV",
        tone: "cyan",
        icon: "cv",
      };
    }

    return {
      title: "Ya tienes base suficiente: ahora compara quÃ© versiÃ³n convierte mejor",
      description:
        "Tu operaciÃ³n ya genera mÃ©tricas suficientes para pasar de seguimiento a optimizaciÃ³n fina. Es momento de mirar rendimiento por versiÃ³n de CV.",
      impact:
        "Entender quÃ© perfil convierte mejor te ayuda a elegir dÃ³nde insistir y quÃ© narrativa escalar.",
      href: "/score/performance",
      cta: "Ver rendimiento",
      tone: "purple",
      icon: "target",
    };
  }, [applications, hasInterviewOpportunity, stats, user]);

  if (loading) {
    return (
      <PageTransition>
        <HomeLoadingState />
      </PageTransition>
    );
  }

  const getFeedbackBanner = () => {
    const { total, avgMatch, conversionRate } = stats;

    if (total < 3) {
      return null;
    }

    if (conversionRate < 10 && total >= 5) {
      return {
        title: "Alta actividad, bajo impacto.",
        message:
          "Tus números muestran mucho movimiento pero poca conversión. Esto suele indicar un problema de estrategia, no de esfuerzo.",
        type: "error",
        icon: <AlertTriangle className="text-red-500" size={20} />,
      };
    }

    if (avgMatch < 60) {
      return {
        title: "Mejora tu afinidad.",
        message:
          "Estás aplicando a muchos roles, pero tu nivel de match es bajo. Intenta personalizar más tu CV para estas vacantes.",
        type: "warning",
        icon: <AlertCircle className="text-yellow-500" size={20} />,
      };
    }

    if (conversionRate >= 20) {
      return {
        title: "Excelente estrategia",
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

            {nextBestAction && <NextBestActionCard action={nextBestAction} />}

            <ActivationChecklist steps={activationSteps} />

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
                  stats.avgMatch < 60 ? "Por debajo del ideal" : "Buen fit general"
                }
                subtextColor="text-yellow-600/70"
              />
            </div>

            {applications.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-4 bg-card-bg border border-white/5 rounded-2xl p-6 flex flex-col h-full">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
                    <PieIcon size={16} className="text-cyan-400" /> Distribución
                    de estados
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

                <div className="lg:col-span-8 bg-card-bg border border-white/5 rounded-2xl p-6 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white font-semibold flex items-center gap-2 text-sm">
                      <Activity size={16} className="text-purple-500" /> Actividad
                      reciente
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
          </>
        )}
      </div>
    </PageTransition>
  );
}
