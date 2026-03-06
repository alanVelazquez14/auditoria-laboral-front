import { FileText } from "lucide-react";

export default function CV({ userData }: { userData: any }) {
  return (
    <section className="bg-card-bg border border-gray-800 p-8 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <FileText size={20} className="text-brand-purple" />
          <span>Currículum Vitae</span>
        </div>
        {userData.stackMatchesCV ? (
          <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded-full border border-green-500/20">
            CV Sincronizado
          </span>
        ) : (
          <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full border border-yellow-500/20">
            CV desactualizado
          </span>
        )}
      </div>

      {userData.cvUrl ? (
        <div className="p-6 bg-background border border-gray-800 rounded-2xl flex items-center justify-between group hover:border-brand-purple/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-purple/10 rounded-xl">
              <FileText size={24} className="text-brand-purple" />
            </div>
            <div>
              <p className="text-sm text-white font-semibold truncate max-w-50">
                Mi Currículum Actual
              </p>
              <p className="text-[11px] text-gray-500 uppercase tracking-tighter">
                Analizado el {new Date(userData.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <a
            href={userData.cvUrl}
            target="_blank"
            className="px-4 py-2 bg-gray-800 text-xs text-white rounded-lg hover:bg-brand-purple transition-colors"
          >
            Ver PDF
          </a>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-800 rounded-2xl p-10 flex flex-col items-center justify-center">
          <p className="text-gray-500">No hay CV cargado</p>
        </div>
      )}

      <button className="mt-6 w-full py-4 border-2 border-dashed border-gray-800 rounded-2xl text-gray-400 text-sm font-medium hover:bg-brand-purple/5 hover:border-brand-purple/50 transition-all flex items-center justify-center gap-2">
        Actualizar CV
      </button>
    </section>
  );
}
