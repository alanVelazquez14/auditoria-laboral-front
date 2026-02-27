import ProfileProgress from "./ProfileProgress";
import Link from "next/link";

export default function EmptyState() {
  const completion = 35;

  return (
    <div className="space-y-4 max-w-5xl">
      {/* Barra de progreso */}
      <ProfileProgress percentage={completion} />

      {/* Card principal */}
      <div className="bg-[#111118] border border-white/5 rounded-2xl p-10 text-center shadow-2xl">
        <div className="inline-flex p-3 bg-purple-600/10 rounded-full mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        </div>

        <h2 className="text-white text-xl font-semibold mb-3">
          Completa tu perfil para desbloquear tu análisis
        </h2>
        <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
          Necesitamos información sobre tu experiencia, stack y objetivos para
          generar un diagnóstico personalizado.
        </p>

        <Link
          href="/completeProfile"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-600/20"
        >
          Completar perfil
        </Link>
      </div>
    </div>
  );
}
