interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-white/5 rounded-md ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
        ...style,
      }}
    />
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-4 w-full">
      <div className="flex gap-4 mb-6">
        <Skeleton className="h-10 w-64" /> {/* Buscador */}
        <Skeleton className="h-10 w-32" /> {/* Filtro */}
      </div>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center space-x-4 p-4 bg-card-bg rounded-xl border border-white/5"
        >
          <Skeleton className="h-12 w-12 rounded-lg" /> {/* Logo Empresa */}
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[30%]" />
            <Skeleton className="h-3 w-[20%]" />
          </div>
          <Skeleton className="h-8 w-24 rounded-full" /> {/* Badge Estado */}
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="p-6 bg-card-bg rounded-2xl border border-white/5 h-100 flex flex-col">
      <div className="flex justify-between mb-8">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="flex-1 flex items-end gap-3 px-2">
        {[...Array(12)].map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1"
            style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }}
          />
        ))}
      </div>
    </div>
  );
}
