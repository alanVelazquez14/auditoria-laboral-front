"use client";

import Link from "next/link";
import { CheckCircle2, CircleDashed, ArrowRight } from "lucide-react";

export type ActivationStep = {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  completed: boolean;
};

export function ActivationChecklist({
  steps,
}: {
  steps: ActivationStep[];
}) {
  const completedSteps = steps.filter((step) => step.completed).length;
  const percentage =
    steps.length > 0 ? Math.round((completedSteps / steps.length) * 100) : 0;
  const nextStep = steps.find((step) => !step.completed) ?? null;

  return (
    <section className="rounded-[28px] border border-white/8 bg-linear-to-br from-[#171722] via-[#111118] to-[#0d0d12] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-cyan-400/80">
            ActivaciÃ³n del sistema
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
            Convierte tu bÃºsqueda en un proceso medible
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
            Cuanto mÃ¡s contexto tenga DepurApp sobre tu perfil, tu CV y tus
            postulaciones, mÃ¡s precisas serÃ¡n las recomendaciones.
          </p>
        </div>

        <div className="min-w-[220px] rounded-2xl border border-white/6 bg-white/[0.03] p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                Progreso
              </p>
              <p className="mt-1 text-3xl font-black tracking-tight text-white">
                {percentage}%
              </p>
            </div>
            <p className="text-xs font-medium text-gray-400">
              {completedSteps}/{steps.length} hitos
            </p>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/6">
            <div
              className="h-full rounded-full bg-linear-to-r from-cyan-400 via-purple-500 to-purple-300 transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
          </div>
          {nextStep && (
            <Link
              href={nextStep.href}
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300 transition-colors hover:text-cyan-200"
            >
              {nextStep.cta}
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 xl:grid-cols-2">
        {steps.map((step) => (
          <Link
            key={step.id}
            href={step.href}
            className={`group rounded-2xl border p-4 transition-all ${
              step.completed
                ? "border-emerald-500/20 bg-emerald-500/6"
                : "border-white/6 bg-white/[0.02] hover:border-purple-500/30 hover:bg-purple-500/[0.05]"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 shrink-0 ${
                  step.completed ? "text-emerald-400" : "text-purple-400"
                }`}
              >
                {step.completed ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <CircleDashed size={18} />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-white">
                    {step.title}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${
                      step.completed
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "bg-purple-500/10 text-purple-300"
                    }`}
                  >
                    {step.completed ? "Listo" : "Pendiente"}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
