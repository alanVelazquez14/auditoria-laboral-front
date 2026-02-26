import { FeatureCard } from "@/components/FeatureCard";
import StatCard from "@/components/StatCard";
import {
  BarChart3,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const LandingHero = () => {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="bg-purple-900/30 text-[#a24ced] px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">
              • Diagnóstico laboral
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Tu búsqueda laboral no está fallando. <br />
              <span className="text-[#a24ced]">Esta desordenada.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Analizamos datos reales de tus postulaciones y te decimos la
              verdad. Sin maquillaje.
            </p>
            <div className="flex gap-4 pt-4 ">
              <button className="bg-[#a24ced] hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all cursor-pointer">
                Empezar auditoría <span>→</span>
              </button>
              <button className="bg-white/5 hover:bg-[#18abdb] text-white px-8 py-3 rounded-lg font-bold border border-white/10 transition-all cursor-pointer hover:shadow-lg">
                Cómo funciona
              </button>
            </div>
          </div>

          <div className="hidden md:block relative bg-background border border-white/5 rounded-3xl p-8 shadow-[0_-1px_50px_-5px_rgba(124,58,237,0.2)]">
            <div className="flex gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-teal-500/50" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Postulaciones" value="18" />
              <StatCard label="Conversión" value="16%" color="text-red-500" />
              <StatCard label="Score" value="43" color="text-yellow-500" />
              <StatCard label="Alertas" value="3" color="text-purple-500" />
            </div>

            <div className="mt-6 bg-[#211115] border border-red-900/30 p-5 rounded-[20px]">
              <p className="text-[#f84c4c] font-bold text-sm">
                Alta actividad, bajo impacto.
              </p>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                Tus números muestran mucho movimiento pero poca conversión.
              </p>
            </div>
          </div>
        </div>
        <section>
          <h2 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-8">
            Qué hace la app
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={BarChart3}
              title="Diagnóstico basado en datos reales"
              description="Analizamos patrones en tus postulaciones que vos no ves."
            />
            <FeatureCard
              icon={Target}
              title="Feedback accionable"
              description="No tips genéricos. Acciones concretas para tu situación."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Seguimiento continuo"
              description="Tu progreso medido semana a semana. Sin autoengaño."
            />
          </div>
        </section>

        <section className="max-w-7xl mx-auto w-full px-4">
          {/* Título de sección alineado a la izquierda */}
          <h2 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-8">
            Para quién es
          </h2>

          {/* Contenedor principal: Grid para control total del espacio */}
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-start">
            {/* Columna Izquierda: Lista de perfiles (ocupa 5 de 12 columnas) */}
            <div className="md:col-span-5">
              <ul className="space-y-4">
                <li className="flex items-center gap-4 bg-[#12121a]/50 p-4 rounded-lg border border-gray-800/50 hover:border-gray-700 transition-colors">
                  <Users className="text-cyan-500" size={20} />
                  <span className="text-sm text-gray-300">
                    Personas que buscan trabajo en tecnología
                  </span>
                </li>
                <li className="flex items-center gap-4 bg-[#12121a]/50 p-4 rounded-lg border border-gray-800/50 hover:border-gray-700 transition-colors">
                  <ShieldCheck className="text-cyan-500" size={20} />
                  <span className="text-sm text-gray-300">
                    Perfiles junior, semi-senior y senior
                  </span>
                </li>
                <li className="flex items-center gap-4 bg-[#12121a]/50 p-4 rounded-lg border border-gray-800/50 hover:border-gray-700 transition-colors">
                  <Zap className="text-cyan-500" size={20} />
                  <span className="text-sm text-gray-300">
                    Usuarios cansados de "tips genéricos"
                  </span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-5 bg-[#12121a]/30 border border-gray-800/50 p-6 rounded-2xl relative">
              <h3 className="text-[10px] uppercase tracking-widest text-purple-500 font-bold mb-6">
                Tono Real
              </h3>
              <div className="space-y-5 border-l border-purple-500/30 pl-6">
                <p className="italic text-gray-400 text-sm leading-relaxed">
                  "No es falta de talento. Es{" "}
                  <span className="text-gray-200">mala estrategia.</span>"
                </p>
                <p className="italic text-gray-400 text-sm leading-relaxed">
                  "Estás aplicando mucho,{" "}
                  <span className="text-gray-200">pero mal.</span>"
                </p>
                <p className="italic text-gray-400 text-sm leading-relaxed">
                  "Este patrón suele terminar en{" "}
                  <span className="text-gray-200">frustración.</span>"
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto">
          <div className="bg-[#12121a]/30 border border-gray-800/40 rounded-2xl py-12 flex flex-col items-center justify-center text-center">
            <h2 className="text-white text-xl md:text-2xl font-bold mb-1">
              No prometemos trabajo.
            </h2>

            <p className="text-[#a24ced] text-lg md:text-xl font-bold">
              Prometemos claridad.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingHero;
