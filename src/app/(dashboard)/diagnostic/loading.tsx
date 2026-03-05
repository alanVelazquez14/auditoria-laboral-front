import Skeleton from "@/ui/Skeletons";

export default function DiagnosticLoading() {
  return (
    <div className="p-8 min-h-screen bg-background text-white font-sans space-y-10">
      {/* --- HEADER SKELETON --- */}
      <header className="flex justify-between items-start mb-10">
        <div className="space-y-3">
          <Skeleton className="h-9 w-64" /> {/* Título: Diagnóstico */}
          <Skeleton className="h-4 w-80" /> {/* Subtítulo corto */}
        </div>
        <Skeleton className="h-11 w-44 rounded-lg" /> {/* Botón: Re-evaluar */}
      </header>

      {/* --- STATS GRID SKELETON --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-card-bg border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center space-y-3"
          >
            <Skeleton className="h-10 w-12 rounded-lg" />{" "}
            {/* El valor numérico */}
            <Skeleton className="h-3 w-24" /> {/* El label inferior */}
          </div>
        ))}
      </div>

      {/* --- DIAGNOSTICS LIST SKELETON (Accordions) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-card-bg border border-white/5 rounded-xl p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4 w-full">
              {/* Icono a la izquierda */}
              <Skeleton className="h-10 w-10 rounded-lg shrink-0" />

              {/* Textos del acordeón */}
              <div className="space-y-2 w-full">
                <Skeleton className="h-5 w-1/2" /> {/* Título del problema */}
                <Skeleton className="h-3 w-24" /> {/* Badge de prioridad */}
              </div>
            </div>

            {/* Icono Chevron a la derecha */}
            <Skeleton className="h-5 w-5 rounded-full shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
