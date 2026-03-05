import Skeleton from "@/ui/Skeletons";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-10 space-y-8 animate-in fade-in duration-500">
      {/* --- HEADER SKELETON --- */}
      <header>
        <Skeleton className="h-9 w-64 mb-2" /> {/* Hola, Usuario */}
      </header>
      {/* --- BANNER SKELETON (Simulando el feedback de IA) --- */}
      <div className="p-4 rounded-xl border border-white/5 bg-card-bg flex gap-4 items-start">
        <Skeleton className="h-10 w-10 rounded-lg shrink-0" />{" "}
        {/* Icono del banner */}
        <div className="space-y-2 w-full">
          <Skeleton className="h-5 w-40" /> {/* Título del banner */}
          <Skeleton className="h-3 w-full" /> {/* Mensaje línea 1 */}
          <Skeleton className="h-3 w-2/3" /> {/* Mensaje línea 2 */}
        </div>
      </div>
      {/* --- STATS GRID SKELETON (4 Columnas) --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-6 bg-card-bg border border-white/5 rounded-2xl space-y-3"
          >
            <div className="flex justify-between items-start">
              <Skeleton className="h-4 w-24" /> {/* Label */}
              <Skeleton className="h-5 w-5 rounded-md" />{" "}
              {/* Icono miniatura */}
            </div>
            <Skeleton className="h-8 w-16" /> {/* Valor numérico */}
            <Skeleton className="h-3 w-28" /> {/* Subtexto inferior */}
          </div>
        ))}
      </div>
      {/* --- BUTTON SKELETON --- */}
      <Skeleton className="h-11 w-56 rounded-xl" />{" "}
      {/* Botón: Ver diagnóstico completo */}
      {/* --- RECENT ACTIVITY SKELETON --- */}
      <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 space-y-6">
        <Skeleton className="h-6 w-40 mb-4" />{" "}
        {/* Título: Actividad reciente */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-xl bg-[#1a1a24]/50 border border-white/5"
            >
              <div className="flex items-center gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" /> {/* Nombre empresa */}
                  <Skeleton className="h-3 w-24" /> {/* Rol */}
                </div>
              </div>
              <Skeleton className="h-4 w-16 rounded-full" />{" "}
              {/* Status badge */}
            </div>
          ))}
        </div>
        {/* Link inferior */}
        <div className="flex justify-center">
          <Skeleton className="h-4 w-48 mt-2" />
        </div>
      </div>
    </div>
  );
}
