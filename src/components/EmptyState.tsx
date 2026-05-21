import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDashed } from "lucide-react";
import ProfileProgress from "./ProfileProgress";

export default function EmptyState() {
  const completion = 35;
  const checklist = [
    "Completa tu experiencia y stack principal",
    "Sube tu CV para activar el anÃ¡lisis ATS",
    "Registra postulaciones para construir mÃ©tricas reales",
  ];

  return (
    <div className="max-w-5xl space-y-4">
      <ProfileProgress percentage={completion} />

      <div className="overflow-hidden rounded-[30px] border border-white/6 bg-linear-to-br from-[#171722] via-[#101018] to-[#0c0c11] p-10 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2">
              <CheckCircle2 size={14} className="text-purple-300" />
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-purple-200">
                ActivaciÃ³n pendiente
              </span>
            </div>

            <h2 className="max-w-xl text-3xl font-black tracking-tight text-white">
              Completa tu perfil para desbloquear recomendaciones Ãºtiles de
              verdad
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-400">
              Antes de medir tu estrategia, DepurApp necesita entender quiÃ©n
              eres, quÃ© rol buscas y con quÃ© CV estÃ¡s saliendo al mercado.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3"
                >
                  <CircleDashed size={16} className="text-cyan-300" />
                  <span className="text-sm text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/completeProfile"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-8 py-3 text-sm font-black text-white transition-all hover:bg-purple-700"
            >
              Completar perfil
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="rounded-[28px] border border-white/6 bg-black/20 p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-gray-500">
              Lo que desbloqueas
            </p>
            <div className="mt-5 space-y-4">
              {[
                "DiagnÃ³stico accionable sobre tu estrategia laboral",
                "Score basado en actividad real y no en intuiciÃ³n",
                "Insights sobre quÃ© versiÃ³n de CV te conviene usar",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-sm leading-relaxed text-gray-300"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
