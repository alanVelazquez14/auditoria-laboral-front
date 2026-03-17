"use client";

import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  FileType,
} from "lucide-react";
import { ApplicationCard } from "@/components/applicationPage/ApplicationCard";
import NewApplicationModal from "@/components/applicationPage/NewApplicationModal";
import { ViewDetailsModal } from "@/components/applicationPage/ViewDetailsModal";
import { StatusDropdown } from "@/components/applicationPage/StatusDropdown";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";

interface JobApplication {
  id: string;
  companyName: string;
  position: string;
  status: string;
  matchLevel: number;
  appliedAt: string;
  mode: string;
  jobUrl?: string;
  cvVersion?: {
    cvUrl: string;
    score: number;
  };
}

const STATUS_FILTERS = [
  { label: "Todas", value: "all" },
  { label: "Aplicada", value: "APPLIED" },
  { label: "En proceso", value: "REVIEWING" },
  { label: "Entrevista", value: "INTERVIEW" },
  { label: "Rechazada", value: "REJECTED" },
  { label: "Oferta", value: "HIRED" },
];

export default function ApplicationsPage() {
  const { data: session, status } = useSession();
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const fetchApps = async () => {
    if (!session?.user?.id) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${session.user.id}/history`,
      );

      if (res.ok) {
        const data = await res.json();
        setApps(data);
      }
    } catch (error) {
      console.error("Error al cargar aplicaciones:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchApps();
    }
  }, [status, session]);

  const filteredApps = useMemo(() => {
    return apps
      .filter((a) => filter === "all" || a.status === filter)
      .filter(
        (a) =>
          a.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.position.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [apps, filter, searchTerm]);

  // Lógica de Paginación
  const { currentItems, totalPages } = useMemo(() => {
    const total = filteredApps.length;
    const pages = Math.ceil(total / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const items = filteredApps.slice(start, start + itemsPerPage);

    return { currentItems: items, totalPages: pages };
  }, [filteredApps, currentPage]);

  // Resetear a página 1 cuando se filtra o busca
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  const handleStatusChangeInList = async (appId: string, newStatus: string) => {
    const currentApp = apps.find((a) => a.id === appId);

    if (currentApp?.status === "REJECTED" && newStatus !== "REJECTED") {
      toast.error("Acción no permitida", {
        description: "No se puede mover una postulación rechazada.",
        duration: 4000,
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${appId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (response.ok) {
        fetchApps();
        toast.success("Estado actualizado");
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

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-10 space-y-8 pb-10">
        {/* Header */}
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Postulaciones
            </h1>
            <p className="text-gray-500 text-sm">{apps.length} registradas</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-[#111118] border border-white/5 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === "grid" ? "bg-white/10 text-purple-400" : "text-gray-500"}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === "list" ? "bg-white/10 text-purple-400" : "text-gray-500"}`}
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

        {/* Banner */}
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

        {/* Contenido Dinámico */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((app) => (
              <ApplicationCard
                key={app.id}
                app={app}
                onStatusUpdate={handleStatusChangeInList}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-white/2 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Empresa</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Match</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Curriculum Vitae</th>
                  <th className="px-6 py-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentItems.map((app) => (
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
                    <td className="px-6 py-4">
                      {app.cvVersion ? (
                        <button
                          onClick={() =>
                            window.open(app.cvVersion?.cvUrl, "_blank")
                          }
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-all cursor-pointer group/cv border border-purple-500/10"
                          title="Abrir CV vinculado"
                        >
                          <FileType size={14} />
                          <span className="text-[10px] font-bold tracking-wider">
                            Ver CV
                          </span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-gray-600 italic px-2">
                          Sin CV
                        </span>
                      )}
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
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginación UI */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 pt-8">
            {/* Botón Anterior */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Números de Página */}
            <div className="flex gap-2">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                    currentPage === number
                      ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20"
                      : "bg-white/5 border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300"
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>

            {/* Botón Siguiente */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
        {/* Modales */}
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
    </PageTransition>
  );
}
