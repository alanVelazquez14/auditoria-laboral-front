"use client";
import { useEffect, useMemo, useState } from "react";
import { Plus, Search, LayoutGrid, List } from "lucide-react";
import { ApplicationCard } from "@/components/applicationPage/ApplicationCard";
import NewApplicationModal from "@/components/applicationPage/NewApplicationModal";
import { ViewDetailsModal } from "@/components/applicationPage/ViewDetailsModal";
import { StatusDropdown } from "@/components/applicationPage/StatusDropdown";
import { toast } from "sonner";

interface JobApplication {
  id: string;
  companyName: string;
  position: string;
  status: string;
  matchLevel: number;
  appliedAt: string;
  mode: string;
  jobUrl?: string;
}

const STATUS_FILTERS = [
  { label: "Todas", value: "all" },
  { label: "Aplicada", value: "APPLIED" },
  { label: "En proceso", value: "REVIEWING" },
  { label: "Entrevista", value: "INTERVIEW" },
  { label: "Rechazada", value: "REJECTED" },
  { label: "Oferta", value: "HIRED" },
];

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  APPLIED: { label: "Aplicada", color: "bg-purple-500/10 text-purple-400" },
  REVIEWING: { label: "En proceso", color: "bg-blue-500/10 text-blue-400" },
  INTERVIEW: { label: "Entrevista", color: "bg-cyan-500/10 text-cyan-400" },
  REJECTED: { label: "Rechazada", color: "bg-red-500/10 text-red-400" },
  HIRED: { label: "Oferta", color: "bg-green-500/10 text-green-400" },
};

export default function ApplicationsPage() {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  const fetchApps = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${userId}/history`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (res.ok) setApps(await res.json());
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const filteredApps = useMemo(() => {
    return apps
      .filter((a) => filter === "all" || a.status === filter)
      .filter(
        (a) =>
          a.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.position.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [apps, filter, searchTerm]);

  const handleStatusChangeInList = async (appId: string, newStatus: string) => {
    const currentApp = filteredApps.find((a) => a.id === appId);

    if (currentApp?.status === "REJECTED" && newStatus !== "REJECTED") {
      toast.error("Acción no permitida", {
        description:
          "No se puede mover una postulación que ya ha sido rechazada.",
        duration: 4000,
      });
      return;
    }

    if (currentApp?.status === "HIRED" && newStatus !== "HIRED") {
      toast.error("¡Ya tienes la oferta!", {
        description: "No puedes cambiar el estado de una postulación ganada.",
        duration: 4000,
      });
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${appId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (response.ok) {
        fetchApps();
        toast.success("Estado actualizado correctamente");
      } else {
        toast.error("Error al actualizar el estado");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getMatchColor = (level: number) => {
    if (level >= 8) return "text-cyan-400";
    if (level >= 5) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-7xl mx-10 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Postulaciones</h1>
          <p className="text-gray-500 text-sm">{apps.length} registradas</p>
        </div>
        <div className="flex gap-3">
          {/* Botones de Toggle de Vista (Grid/List) */}
          <div className="flex bg-[#111118] border border-white/5 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white/10 text-purple-400" : "text-gray-500"}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white/10 text-purple-400" : "text-gray-500"}`}
            >
              <List size={18} />
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            <Plus size={18} /> Nueva
          </button>
        </div>
      </header>

      {/* Banner Informativo */}
      <div className="bg-[#111118] border border-white/5 px-5 py-4 rounded-2xl italic text-gray-500 text-sm">
        <p className="text-[15px]">
          Si no registras tus postulaciones, el sistema no puede ayudarte.
        </p>
      </div>

      {/* Buscador y Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={16}
          />
          <input
            type="text"
            placeholder="Buscar empresa o puesto..."
            className="w-full bg-[#111118] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filter === f.value
                  ? "bg-purple-600 text-white"
                  : "bg-white/5 text-gray-500 hover:text-gray-300 cursor-pointer"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido Dinámico (Grid o Tabla) */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              onStatusUpdate={handleStatusChangeInList}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#111118] border border-white/5 rounded-2xl">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-white/2 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Empresa</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Match</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredApps.map((app) => {
                const statusInfo = STATUS_MAP[app.status] || {
                  label: app.status,
                  color: "bg-gray-500/10 text-gray-400",
                };

                return (
                  <tr
                    key={app.id}
                    className="hover:bg-white/2 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">
                        {app.companyName}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {app.position}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <StatusDropdown
                        currentStatus={app.status}
                        onChange={(newStatus) =>
                          handleStatusChangeInList(app.id, newStatus)
                        }
                      />
                    </td>

                    <td
                      className={`px-6 py-4 font-bold ${getMatchColor(app.matchLevel || 0)}`}
                    >
                      {(app.matchLevel || 0) * 10}%
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="text-gray-600 hover:text-white transition-colors cursor-pointer text-xs font-bold"
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedApp && (
        <ViewDetailsModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}

      <NewApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchApps}
      />
    </div>
  );
}
