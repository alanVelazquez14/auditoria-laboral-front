import StatCard from "@/components/StatCard";
import { ArrowRight, AlertTriangle } from "lucide-react";

export default function HomePage() {
  const recentActivity = [
    {
      company: "MercadoLibre",
      role: "Frontend Developer Sr",
      status: "Rechazada",
      statusColor: "text-red-500",
    },
    {
      company: "Globant",
      role: "React Developer",
      status: "Entrevista",
      statusColor: "text-cyan-500",
    },
    {
      company: "Ualá",
      role: "Full Stack Engineer",
      status: "Aplicada",
      statusColor: "text-gray-400",
    },
  ];

  return (
    <div className="w-7xl space-y-8">
      {/* Header */}
      <header>
        <p className="text-gray-500 text-xs mb-1">Bienvenido de vuelta</p>
        <h1 className="text-3xl font-bold text-white">Tu búsqueda laboral</h1>
      </header>

      {/* Banner de Alerta */}
      <div className="bg-[#1a1111] border border-red-900/30 p-4 rounded-xl flex gap-4 items-start">
        <AlertTriangle className="text-red-500 shrink-0" size={20} />
        <div>
          <h3 className="text-white font-bold text-sm">
            Alta actividad, bajo impacto.
          </h3>
          <p className="text-gray-400 text-xs mt-1">
            Tus números muestran mucho movimiento pero poca conversión. Esto
            suele indicar un problema de estrategia, no de esfuerzo.
          </p>
        </div>
      </div>

      {/* Grid de Stats usando tu StatCard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Postulaciones" value="5" color="text-white" />
        <StatCard label="Entrevistas" value="1" color="text-cyan-400" />
        <StatCard label="Rechazos" value="2" color="text-red-400" />
        <StatCard label="Match promedio" value="63%" color="text-yellow-500" />
      </div>

      {/* Botón Diagnóstico */}
      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all w-fit text-sm">
        Ver diagnóstico completo <ArrowRight size={16} />
      </button>

      {/* Lista de Actividad Reciente */}
      <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-6">Actividad reciente</h2>
        <div className="space-y-4">
          {recentActivity.map((item, index) => (
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
          ))}
        </div>

        <button className="w-full text-center text-purple-400 text-xs font-medium mt-6 hover:text-purple-300 transition-colors flex items-center justify-center gap-2">
          Ver todas las postulaciones <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
