import Skeleton from "@/ui/Skeletons";

export default function Loading() {
  return (
    <div className="p-8 bg-background min-h-screen space-y-10">
      {/* Skeleton del Header genérico */}
      <div className="flex justify-between items-center">
        <div className="space-y-3">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* Grid de tarjetas genéricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="p-6 bg-card-bg rounded-2xl border border-white/5 space-y-4"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[90%]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
