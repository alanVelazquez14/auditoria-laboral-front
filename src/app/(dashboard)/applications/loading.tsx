import Skeleton from "@/ui/Skeletons";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-10 space-y-8 animate-in fade-in duration-500">
      
      {/* --- HEADER SKELETON --- */}
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <Skeleton className="h-9 w-56" /> {/* Título: Postulaciones */}
          <Skeleton className="h-4 w-24" /> {/* Contador: X registradas */}
        </div>
        <div className="flex gap-3">
          {/* Toggle de vista */}
          <div className="flex bg-[#111118] border border-white/5 rounded-xl p-1 gap-1">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          {/* Botón Nueva */}
          <Skeleton className="h-11 w-32 rounded-xl" />
        </div>
      </header>

      {/* --- INFORMATIONAL BANNER SKELETON --- */}
      <div className="bg-[#111118] border border-white/5 px-5 py-5 rounded-2xl">
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* --- SEARCH & FILTERS SKELETON --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Input de búsqueda */}
        <Skeleton className="h-10 w-full md:w-96 rounded-xl" />
        
        {/* Filtros de estado */}
        <div className="flex gap-2 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-xl shrink-0" />
          ))}
        </div>
      </div>

      {/* --- CONTENT SKELETON (GRID MODE BY DEFAULT) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="bg-[#111118] border border-white/5 rounded-2xl p-6 space-y-5"
          >
            {/* Header de la Card */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" /> {/* Empresa */}
                <Skeleton className="h-4 w-40" /> {/* Puesto */}
              </div>
              <Skeleton className="h-6 w-16 rounded-full" /> {/* Badge de estado */}
            </div>

            {/* Detalles inferiores */}
            <div className="flex justify-between items-center pt-2">
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" /> {/* Match label */}
                <Skeleton className="h-5 w-12" /> {/* Match % */}
              </div>
              <Skeleton className="h-4 w-24" /> {/* Fecha */}
            </div>

            {/* Botón de acción dentro de la card */}
            <Skeleton className="h-9 w-full rounded-xl" />
          </div>
        ))}
      </div>

    </div>
  );
}