import {
  Calendar,
  Link2,
  MapPin,
} from "lucide-react";

export function ViewDetailsModal({
  app,
  onClose,
}: {
  app: any;
  onClose: () => void;
}) {
  if (!app) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 bg-black/60 backdrop-blur-sm">
      <div className="bg-card-bg border border-white/10 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl">
        {/* Header con Color de Estado */}
        <div className="p-4 border-b border-white/5 bg-white/2">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {app.companyName}
              </h2>
              <p className="text-purple-400 font-medium">{app.position}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors text-2xl cursor-pointer"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Información Principal */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">
                Fecha de Aplicación
              </span>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar size={14} className="text-purple-500" />
                {new Date(app.appliedAt).toLocaleDateString()}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">
                Modalidad
              </span>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin size={14} className="text-purple-500" />
                {app.mode || "No especificada"}
              </div>
            </div>
          </div>

          {/* Link de la vacante */}
          {app.jobUrl && (
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-purple-500/30 transition-all">
              <span className="text-[10px] uppercase text-gray-500 font-bold block mb-2">
                Link de la oferta
              </span>
              <a
                href={app.jobUrl}
                target="_blank"
                className="flex items-center gap-2 text-purple-400 hover:underline break-all text-sm"
              >
                <Link2 size={16} />
                {app.jobUrl}
              </a>
            </div>
          )}

          {/* Sección de Notas / Match */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] uppercase text-gray-500 font-bold">
              <span>Match de Requisitos</span>
              <span className="text-cyan-400">{app.matchLevel * 10}%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 transition-all duration-1000"
                style={{ width: `${app.matchLevel * 10}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/1 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-all cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
