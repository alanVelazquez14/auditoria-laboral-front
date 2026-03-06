import { BarChart3, Target, GraduationCap, Briefcase } from "lucide-react";

export default function CareerMetrics({ userData }: { userData: any }) {
  return (
    <section className="bg-card-bg border border-gray-800 p-8 rounded-2xl shadow-sm space-y-8">
      {/* Header */}
      <div className="flex items-center gap-2 text-white font-bold text-lg">
        <BarChart3 size={20} className="text-brand-purple" />
        <span>Actividad y Estrategia</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card: Aplicaciones */}
        <div className="p-4 bg-background rounded-2xl border border-gray-800 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <Target size={14} className="text-gray-500" />
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
              Aplicaciones Recientes
            </p>
          </div>
          <p className="text-white text-xl font-bold">
            {userData.recentApplications || "Sin datos"}
          </p>
        </div>

        {/* Card: Experiencia de Stack */}
        <div className="p-4 bg-background rounded-2xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap size={14} className="text-gray-500" />
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
              Origen de Experiencia
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {userData.stackExperienceType?.map((type: string, i: number) => (
              <span
                key={i}
                className="text-[10px] bg-brand-purple/10 text-brand-purple border border-brand-purple/20 px-2 py-0.5 rounded-md font-medium"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Estrategia de Aplicación */}
      <div className="pt-4 border-t border-gray-800">
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
          <Briefcase size={14} />
          <span className="font-semibold">Canales y Métodos de Búsqueda:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {userData.applicationType?.map((type: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-background text-gray-400 rounded-xl text-[11px] border border-gray-800 hover:border-brand-purple/50 transition-colors"
            >
              {type}
            </span>
          ))}
        </div>
        {(!userData.applicationType ||
          userData.applicationType.length === 0) && (
          <p className="text-xs text-gray-600 italic">
            No se han definido métodos de búsqueda.
          </p>
        )}
      </div>
    </section>
  );
}
