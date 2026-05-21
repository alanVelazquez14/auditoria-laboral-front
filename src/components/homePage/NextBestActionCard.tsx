"use client";

import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  FileSearch,
  Sparkles,
  Target,
} from "lucide-react";

export type NextBestAction = {
  title: string;
  description: string;
  impact: string;
  href: string;
  cta: string;
  tone: "purple" | "cyan" | "amber";
  icon: "sparkles" | "target" | "briefcase" | "cv";
};

const TONE_STYLES = {
  purple: {
    card: "from-purple-600/18 via-[#16131f] to-[#0f1016] border-purple-500/20",
    icon: "bg-purple-500/16 text-purple-300 border-purple-400/20",
    badge: "bg-purple-500/10 text-purple-200",
    link: "text-purple-300 hover:text-purple-200",
  },
  cyan: {
    card: "from-cyan-500/16 via-[#10171a] to-[#0f1016] border-cyan-500/20",
    icon: "bg-cyan-500/14 text-cyan-200 border-cyan-400/20",
    badge: "bg-cyan-500/10 text-cyan-200",
    link: "text-cyan-200 hover:text-cyan-100",
  },
  amber: {
    card: "from-amber-500/16 via-[#19150f] to-[#0f1016] border-amber-500/20",
    icon: "bg-amber-500/14 text-amber-200 border-amber-400/20",
    badge: "bg-amber-500/10 text-amber-200",
    link: "text-amber-200 hover:text-amber-100",
  },
} as const;

const ICONS = {
  sparkles: Sparkles,
  target: Target,
  briefcase: BriefcaseBusiness,
  cv: FileSearch,
} as const;

export function NextBestActionCard({
  action,
}: {
  action: NextBestAction;
}) {
  const tone = TONE_STYLES[action.tone];
  const Icon = ICONS[action.icon];

  return (
    <section
      className={`relative overflow-hidden rounded-[32px] border bg-linear-to-br p-7 shadow-[0_30px_90px_rgba(0,0,0,0.24)] ${tone.card}`}
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/[0.04] blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-12 items-center justify-center rounded-2xl border ${tone.icon}`}
            >
              <Icon size={22} />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-gray-400">
                PrÃ³xima mejor acciÃ³n
              </p>
              <p className={`mt-1 inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${tone.badge}`}>
                Mayor impacto hoy
              </p>
            </div>
          </div>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-white">
            {action.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300">
            {action.description}
          </p>
        </div>

        <div className="min-w-[240px] rounded-3xl border border-white/8 bg-black/20 p-5 backdrop-blur-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-500">
            Impacto esperado
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white">
            {action.impact}
          </p>
          <Link
            href={action.href}
            className={`mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] transition-colors ${tone.link}`}
          >
            {action.cta}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
