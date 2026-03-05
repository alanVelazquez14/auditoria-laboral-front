export function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      className={`bg-card-bg border ${color} p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-inner`}
    >
      <span className="text-4xl font-bold mb-1">{value}</span>
      <span className="text-xs uppercase tracking-widest opacity-70 font-medium">
        {label}
      </span>
    </div>
  );
}
