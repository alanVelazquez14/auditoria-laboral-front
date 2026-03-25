"use client";
import { useState, useEffect } from "react";
import {
  MessageSquare,
  Target,
  Zap,
  ChevronRight,
  Loader2,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function InterviewsPage() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      if (!session?.user?.id || !session?.accessToken) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${session.user.id}/history`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.accessToken}`,
            },
          },
        );
        if (!res.ok) throw new Error("Error al obtener el historial");
        const data = await res.json();
        const interviewApps = data.filter(
          (app: JobApplication) => app.status === "INTERVIEW",
        );

        setApplications(interviewApps);
      } catch (err) {
        console.error("Error cargando postulaciones:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, [session]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-purple-500" size={40} />
        <p className="text-gray-400 animate-pulse font-medium">
          Sincronizando simulador...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl min-h-screen text-zinc-100">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold tracking-tight">
            Simulador de Entrevistas
          </h1>
        </div>
        <p className="text-zinc-400 max-w-4xl leading-relaxed">
          Entrená con inteligencia artificial simulando el rol de reclutador de
          la empresa. Las preguntas se adaptan dinámicamente al CV que enviaste.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className="group relative bg-card-bg border border-white/5 rounded-xl p-6 transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_40px_-20px_rgba(124,58,237,0.4)] flex flex-col min-h-50 overflow-hidden"
          >
            {/* Fondo interactivo */}
            <div className="absolute inset-0 bg-linear-to-br from-purple-600/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
              {/* Header de la Card */}
              <div className="flex justify-between items-start mb-2">
                <div className="bg-zinc-800/40 p-3 rounded-xl border border-white/5 group-hover:border-purple-500/30 transition-all duration-500">
                  <Building2
                    className="text-zinc-400 group-hover:text-purple-400"
                    size={22}
                  />
                </div>
                <div
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded border text-[10px] font-bold uppercase tracking-tighter ${
                    app.matchLevel >= 8
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}
                >
                  <Target size={12} className="animate-pulse" />
                  Match {app.matchLevel}/10
                </div>
              </div>

              {/* Cuerpo de la Card */}
              <div className="mb-2">
                <h3 className="text-xl font-bold text-zinc-100 mb-1">
                  {app.companyName}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
                  <p className="text-zinc-500 font-medium text-sm capitalize">
                    {app.position}
                  </p>
                </div>
              </div>

              {/* Acción de la Card */}
              <Link
                href={`/interviews/${app.id}`}
                className="group relative z-10 flex items-center justify-center gap-3 bg-zinc-800/50 hover:bg-purple-600 border border-white/5 text-white py-2 px-2 rounded-lg transition-all duration-300 overflow-hidden"
              >
                <span>Entrenar ahora</span>
                <ChevronRight
                  size={18}
                  className="arrow-animate arrow-glow relative z-10 transition-all duration-300"
                />
              </Link>
            </div>
          </div>
        ))}

        {/* Card Próximamente - Estilo Esqueleto */}
        <div className="border border-dashed border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center bg-transparent opacity-40">
          <Zap className="text-zinc-600 mb-4" size={32} />
          <h3 className="font-bold text-zinc-500">Práctica General</h3>
          <p className="text-xs text-zinc-600 mt-1 uppercase tracking-widest font-bold">
            Soon
          </p>
        </div>
      </div>
    </div>
  );
}
