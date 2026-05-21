"use client";

import { useState, useEffect } from "react";
import {
  Target,
  Zap,
  ChevronRight,
  Loader2,
  Building2,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { apiClientRequest } from "@/lib/api-client";
import { handleApiError } from "@/utils/error-handler";
import type { BackendJobApplication } from "@/types/backend";

export default function InterviewsPage() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState<BackendJobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      if (status !== "authenticated") {
        setLoading(status === "loading");
        return;
      }

      try {
        const data = await apiClientRequest<BackendJobApplication[]>(
          "/api/job-applications",
          {
            auth: true,
            session,
          },
        );

        const interviewApps = data.filter((app) => app.status === "INTERVIEW");
        setApplications(interviewApps);
      } catch (err) {
        handleApiError(err, "No pudimos cargar las entrevistas");
      } finally {
        setLoading(false);
      }
    };

    void fetchApps();
  }, [session, status]);

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
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Simulador de entrevistas
        </h1>
        <p className="text-zinc-400 max-w-4xl leading-relaxed">
          Entrena con inteligencia artificial simulando el rol de reclutador de
          la empresa. Las preguntas se adaptan dinámicamente al CV que enviaste.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 rounded-3xl border border-dashed border-white/10 p-10 text-center">
            <h3 className="text-lg font-bold text-white mb-2">
              No hay entrevistas disponibles
            </h3>
            <p className="text-sm text-zinc-500">
              Las simulaciones se habilitan cuando una postulaciÃ³n entra en
              estado `INTERVIEW`.
            </p>
          </div>
        )}
        {applications.map((app) => {
          const isFinished = app.interview?.status === "COMPLETED";

          return (
            <div
              key={app.id}
              className="group relative bg-card-bg border border-white/5 rounded-xl p-6 transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_40px_-20px_rgba(124,58,237,0.4)] flex flex-col min-h-50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-zinc-800/40 p-3 rounded-xl border border-white/5 group-hover:border-purple-500/30 transition-all duration-500">
                    <Building2
                      className="text-zinc-400 group-hover:text-purple-400"
                      size={22}
                    />
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded border text-[10px] font-bold uppercase tracking-tighter ${
                      (app.matchLevel ?? 0) >= 8
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    <Target size={12} />
                    Match {app.matchLevel ?? 0}/10
                  </div>
                </div>

                <div className="mb-6">
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

                {isFinished ? (
                  <div className="flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all">
                    <CheckCircle size={16} />
                    <span>Entrevista guardada</span>
                  </div>
                ) : (
                  <Link
                    href={`/interviews/${app.id}`}
                    className="flex items-center justify-center gap-2 bg-zinc-800/50 hover:bg-purple-600 border border-white/5 text-white py-2.5 px-4 rounded-lg transition-all duration-300 group/btn"
                  >
                    <span className="text-sm font-semibold">
                      Entrenar ahora
                    </span>
                    <ChevronRight
                      size={18}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Link>
                )}
              </div>
            </div>
          );
        })}

        <div className="border border-dashed border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center bg-transparent opacity-40">
          <Zap className="text-zinc-600 mb-4" size={32} />
          <h3 className="font-bold text-zinc-500">Práctica general</h3>
          <p className="text-xs text-zinc-600 mt-1 uppercase tracking-widest font-bold">
            Soon
          </p>
        </div>
      </div>
    </div>
  );
}
