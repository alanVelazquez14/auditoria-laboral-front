export default function StatCard({
  label,
  value,
  color = "text-white",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="bg-[#1a1a21] p-6 rounded-lg border border-white/3 shadow-xl">
      <p className="text-gray-400 text-[13px] font-medium mb-3 opacity-80">
        {label}
      </p>
      <p className={`text-4xl font-bold tracking-tight ${color}`}>
        {value}
      </p>
    </div>
  );
}