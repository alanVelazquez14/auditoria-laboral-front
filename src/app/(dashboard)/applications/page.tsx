"use client";
import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { ApplicationCard } from "@/components/applicationPage/ApplicationCard";
import NewApplicationModal from "@/components/applicationPage/NewApplicationModal";

export default function ApplicationsPage() {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("Todas");

  const fetchApps = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${userId}/history`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (res.ok) setApps(await res.json());
  };

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Postulaciones</h1>
          <p className="text-gray-500 text-sm">{apps.length} registradas</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20"
        >
          <Plus size={18} /> Nueva
        </button>
      </header>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[
          "Todas",
          "Aplicada",
          "En proceso",
          "Entrevista",
          "Rechazada",
          "Oferta",
        ].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === f
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-gray-500 hover:text-gray-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps
          .filter((a) => filter === "Todas" || a.status === filter)
          .map((app: any) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
      </div>

      <NewApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchApps}
      />
    </div>
  );
}
