export default function ProfileProgress({
  percentage = 0,
}: {
  percentage: number;
}) {
  return (
    <div className="bg-[#1a1a24] border border-white/5 rounded-2xl p-6 mb-8 shadow-xl">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">
            Progreso del perfil
          </h3>
          <p className="text-gray-500 text-xs mt-1">
            {percentage < 100
              ? "Completa los datos para un mejor diagnóstico"
              : "¡Perfil optimizado al máximo!"}
          </p>
        </div>
        <span className="text-2xl font-bold text-purple-400 tracking-tight">
          {percentage}%
        </span>
      </div>

      {/* Contenedor de la barra */}
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        {/* Progreso real */}
        <div
          className="h-full bg-linear-to-r from-purple-600 via-purple-400 to-cyan-400 transition-all duration-700 ease-out rounded-full shadow-[0_0_10px_rgba(147,51,234,0.3)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
