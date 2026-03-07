"use client";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Target,
  Layout,
  FileText,
  MousePointer2,
} from "lucide-react";

interface AtsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AtsGuideModal({ isOpen, onClose }: AtsGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-card-bg border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header Sticky */}
        <div className="sticky top-0 bg-card-bg/80 backdrop-blur-md p-6 border-b border-white/5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="bg-brand-purple/20 p-2 rounded-lg">
              <FileText className="text-brand-purple" size={20} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Guía de Optimización ATS
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-10">
          {/* Resumen Rápido */}
          <section className="bg-brand-purple/5 border border-brand-purple/20 p-5 rounded-2xl">
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="text-brand-purple font-bold">
                Resumen rápido:
              </span>{" "}
              Los sistemas ATS no "leen" tu CV como un humano; lo procesan como
              datos. Si tu formato es complejo o te faltan palabras clave, el
              robot te descarta antes de que un reclutador vea tu nombre.
            </p>
          </section>

          {/* 1. Clean Design */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white font-bold">
              <Layout className="text-brand-purple" size={18} />
              <h3>1. El estándar "Clean Design"</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Muchos candidatos cometen el error de usar diseños de Canva con
              dos columnas o gráficos de barras.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-red-500 mb-1">
                  El Problema
                </p>
                <p className="text-xs text-gray-400 font-medium">
                  Los ATS antiguos mezclan las columnas y confunden tu
                  experiencia con tu educación.
                </p>
              </div>
              <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-green-500 mb-1">
                  La Solución
                </p>
                <p className="text-xs text-gray-400 font-medium">
                  Usa una sola columna, fuentes estándar (Inter, Arial) y evita
                  tablas o imágenes.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Keywords */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white font-bold">
              <Target className="text-brand-purple" size={18} />
              <h3>2. La Regla de las Keywords</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              El ATS busca coincidencias exactas. Si la vacante pide{" "}
              <span className="text-white font-mono">"React.js"</span> y tú
              pusiste{" "}
              <span className="text-white font-mono">
                "Experto en Frontend"
              </span>
              , el robot no hará la asociación.
            </p>
            <div className="bg-gray-800/30 p-4 rounded-xl border border-white/5">
              <p className="text-xs text-gray-300 italic">
                <span className="text-brand-purple font-bold">Tip Pro:</span>{" "}
                Revisa tu sección de Skills y asegúrate de que los nombres
                coincidan con los que el mercado pide (Ej: Node.js, AWS,
                Docker).
              </p>
            </div>
          </section>

          {/* 3. Logros Cuantificables */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white font-bold">
              <CheckCircle2 className="text-brand-purple" size={18} />
              <h3>3. Cuantifica tus Logros</h3>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3 items-start opacity-50">
                <XCircleIcon />
                <p className="text-sm text-gray-400 italic">
                  "Desarrollé el backend de una app de ecommerce."
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircleIcon />
                <p className="text-sm text-gray-200 font-medium">
                  "Optimicé las consultas de DB, reduciendo el tiempo de carga
                  un <span className="text-brand-purple font-bold">30%</span>{" "}
                  para{" "}
                  <span className="text-brand-purple font-bold">
                    5,000 usuarios
                  </span>
                  ."
                </p>
              </div>
            </div>
          </section>

          {/* 4. Checklist Final */}
          <section className="bg-white/5 p-6 rounded-2xl space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">
              Checklist para tu próxima subida
            </h3>
            <ul className="space-y-3">
              {[
                "Archivo PDF generado desde texto (no una foto).",
                "Links de LinkedIn y GitHub clickeables.",
                "Títulos estándar (Ej: 'Experiencia Profesional').",
                "Tecnologías configuradas en tu Perfil de DepurApp.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-gray-400"
                >
                  <div className="w-4 h-4 rounded border border-white/20 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-brand-purple text-white rounded-xl text-sm font-bold hover:bg-purple-600 transition-all"
          >
            Entendido, voy a corregirlo
          </button>
        </div>
      </div>
    </div>
  );
}

// Subcomponentes de Iconos Rápidos
const XCircleIcon = () => (
  <svg
    className="w-5 h-5 text-red-500 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    className="w-5 h-5 text-green-500 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
