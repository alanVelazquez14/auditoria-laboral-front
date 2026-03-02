import { Building2, MapPin, Link2, FileText } from "lucide-react";

export function ApplicationCard({ app }: { app: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Rechazada': return 'bg-red-500/10 text-red-500';
      case 'Entrevista': return 'bg-cyan-500/10 text-cyan-500';
      case 'En proceso': return 'bg-purple-500/10 text-purple-500';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const getMatchColor = (percent: number) => {
    if (percent > 75) return 'bg-cyan-500';
    if (percent > 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 size={16} className="text-gray-500"/>
            <h3 className="text-white font-bold">{app.company}</h3>
          </div>
          <p className="text-gray-400 text-sm">{app.role}</p>
        </div>
        <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${getStatusColor(app.status)}`}>
          {app.status}
        </span>
      </div>

      <div className="flex gap-4 text-[11px] text-gray-500 mb-6">
        <span className="flex items-center gap-1"><MapPin size={12}/> {app.location}</span>
        <span className="flex items-center gap-1"><Link2 size={12}/> {app.canal}</span>
        <span className="flex items-center gap-1"><FileText size={12}/> {app.cvVersion}</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Match requisitos</span>
          <span className={`text-xs font-bold ${getMatchColor(app.matchPercentage).replace('bg-', 'text-')}`}>
            {app.matchPercentage}%
          </span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${getMatchColor(app.matchPercentage)}`}
            style={{ width: `${app.matchPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}