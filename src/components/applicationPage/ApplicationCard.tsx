"use client";
import { Building2, MapPin, Link2, FileText, Calendar } from "lucide-react";
import { useState } from "react";

export const ROLE_LABELS: Record<string, string> = {
  frontend: "Frontend Developer",
  backend: "Backend Developer",
  fullstack: "Fullstack Developer",
  mobile: "Mobile Developer",
  devops: "DevOps Engineer",
  data: "Data Scientist",
};

export const MODE_LABELS: Record<string, string> = {
  remote: "Remoto",
  hybrid: "Híbrido",
  inperson: "Presencial",
};

export function ApplicationCard({
  app,
  onStatusUpdate,
}: {
  app: any;
  onStatusUpdate?: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  const STATUS_OPTIONS = [
    {
      value: "APPLIED",
      label: "Aplicada",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      value: "REVIEWING",
      label: "En proceso",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      value: "INTERVIEW",
      label: "Entrevista",
      color: "bg-cyan-500/10 text-cyan-500",
    },
    {
      value: "HIRED",
      label: "Oferta",
      color: "bg-green-500/10 text-green-500",
    },
    {
      value: "REJECTED",
      label: "Rechazada",
      color: "bg-red-500/10 text-red-500",
    },
  ];

  const getStatusDisplay = (status: string) => {
    const map: Record<string, { label: string; color: string }> = {
      APPLIED: { label: "Aplicada", color: "bg-purple-500/10 text-purple-500" },
      REVIEWING: { label: "En proceso", color: "bg-blue-500/10 text-blue-500" },
      INTERVIEW: { label: "Entrevista", color: "bg-cyan-500/10 text-cyan-500" },
      REJECTED: { label: "Rechazada", color: "bg-red-500/10 text-red-500" },
      HIRED: { label: "Oferta", color: "bg-green-500/10 text-green-500" },
    };
    return (
      map[status] || { label: status, color: "bg-gray-500/10 text-gray-400" }
    );
  };

  const getMatchStyles = (level: number) => {
    const percent = level * 10;

    if (level >= 8) {
      return { color: "text-cyan-500", bg: "bg-cyan-500", percent };
    }
    if (level >= 5) {
      return { color: "text-yellow-500", bg: "bg-yellow-500", percent };
    }
    return { color: "text-red-500", bg: "bg-red-500", percent };
  };

  const handleStatusChange = async (newStatus: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${app.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (response.ok && onStatusUpdate) onStatusUpdate();
      setShowMenu(false); // Cerrar al seleccionar
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const statusInfo = getStatusDisplay(app.status);
  const matchInfo = getMatchStyles(app.matchLevel || 1);

  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div className="max-w-[70%]">
          <div className="flex items-center gap-2 mb-1">
            <Building2 size={16} className="text-gray-500 shrink-0" />
            <h3 className="text-white font-bold truncate">{app.companyName}</h3>
          </div>
          <p className="text-gray-400 text-sm truncate">
            {ROLE_LABELS[app.position] || app.position}
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`
              text-[13px] 
              px-3 py-1 rounded-full transition-all
              ${statusInfo.color} hover:brightness-125
            `}
          >
            {statusInfo.label}
          </button>

          {/* MENÚ DESPLEGABLE PERSONALIZADO */}
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />

              <div className="absolute right-0 mt-2 w-32 bg-[#1a1a24] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden py-1">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleStatusChange(opt.value)}
                    className={`
                      w-full text-left px-3 py-2 text-[13px]
                      hover:bg-white/5 transition-colors
                      ${opt.color.replace("bg-", "text-").split(" ")[1]} 
                    `}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-[11px] text-gray-500 mb-6">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {MODE_LABELS[app.mode] || "No especificado"}
        </span>
        {app.jobUrl && (
          <a
            href={app.jobUrl}
            target="_blank"
            className="flex items-center gap-1 hover:text-purple-400 transition-colors"
          >
            <Link2 size={12} /> Link
          </a>
        )}
        <span className="flex items-center gap-1">
          <Calendar size={12} /> {new Date(app.appliedAt).toLocaleDateString()}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">
            Match requisitos
          </span>
          <span className={`text-xs font-black ${matchInfo.color}`}>
            {matchInfo.percent}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-out ${matchInfo.bg}`}
            style={{ width: `${matchInfo.percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
