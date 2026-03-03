export function ImpactCard({ icon: Icon, value, label }: any) {
  return (
    <div className="bg-card-bg border border-white/5 p-8 rounded-2xl flex flex-col items-center text-center shadow-xl">
      <Icon size={20} className="text-brand-purple mb-4 opacity-80" />
      <span className="text-3xl font-bold mb-1">{value}</span>
      <span className="text-xs text-gray-500 font-medium">{label}</span>
    </div>
  );
}
