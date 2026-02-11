import StatCard from "@/components/StatCard";

const LandingHero = () => {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <main className="grid md:grid-cols-2 gap-12 max-w-7xl w-full items-center">
        <div className="space-y-6">
          <span className="bg-purple-900/30 text-[#a24ced] px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">
            • Diagnóstico laboral
          </span>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Tu búsqueda laboral no está fallando. <br />
            <span className="text-[#a24ced]">Esta desordenada.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md">
            Analizamos datos reales de tus postulaciones y te decimos la verdad.
            Sin maquillaje.
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

        <div className="relative bg-background border border-white/5 rounded-3xl p-8 shadow-[0_-1px_50px_-5px_rgba(124,58,237,0.2)]">
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
      </main>
    </div>
  );
};

export default LandingHero;
