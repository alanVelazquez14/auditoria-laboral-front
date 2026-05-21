"use client";

import { useEffect, useState } from "react";
import { X, Link as LinkIcon, FileType, Eye, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { apiClientRequest } from "@/lib/api-client";
import { handleApiError } from "@/utils/error-handler";
import type { BackendCvHistoryEvolutionItem } from "@/types/backend";

interface CvVersion {
  id: string;
  date: string;
  score: number;
  cvUrl: string;
}

type NewApplicationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void | Promise<void>;
};

export default function NewApplicationModal({
  isOpen,
  onClose,
  onSuccess,
}: NewApplicationModalProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [cvVersions, setCvVersions] = useState<CvVersion[]>([]);

  const [formData, setFormData] = useState({
    companyName: "",
    roleCategory: "",
    mode: "",
    jobUrl: "",
    matchLevel: 1,
    message: "",
    appliedCvId: "",
  });

  useEffect(() => {
    const loadCvVersions = async () => {
      if (!isOpen || !session) {
        return;
      }

      try {
        const list = await apiClientRequest<BackendCvHistoryEvolutionItem[]>(
          "/api/cv-history/evolution",
          {
            auth: true,
            session,
          },
        );

        setCvVersions(
          list.map((item) => ({
            id: item.versionId,
            date: item.date,
            score: item.score,
            cvUrl: item.cvUrl ?? "",
          })),
        );
      } catch (error) {
        handleApiError(error, "No pudimos cargar tus CV");
      }
    };

    void loadCvVersions();
  }, [isOpen, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      toast.error("Debes estar autenticado para realizar esta acciÃ³n");
      return;
    }

    if (!formData.roleCategory) {
      toast.error("Debes seleccionar una categorÃ­a");
      return;
    }

    setLoading(true);

    const rawPayload: Record<string, string | number | null> = {
      companyName: formData.companyName.trim(),
      roleCategory: formData.roleCategory,
      matchLevel: Number(formData.matchLevel),
      appliedCvId: formData.appliedCvId || null,
    };

    if (formData.mode) {
      rawPayload.mode =
        formData.mode === "hibrido"
          ? "hybrid"
          : formData.mode === "presencial"
            ? "inperson"
            : "remote";
    }

    if (formData.jobUrl.trim() !== "") {
      let url = formData.jobUrl.trim();

      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
      }

      try {
        new URL(url);
        rawPayload.jobUrl = url;
      } catch {
        toast.error("La URL no es vÃ¡lida");
        setLoading(false);
        return;
      }
    }

    if (formData.message.trim() !== "") {
      rawPayload.message = formData.message.trim();
    }

    try {
      await apiClientRequest("/api/job-applications", {
        method: "POST",
        auth: true,
        session,
        body: rawPayload,
      });

      await onSuccess();
      onClose();
    } catch (error) {
      handleApiError(error, "No pudimos registrar la postulaciÃ³n");
    } finally {
      setLoading(false);
    }
  };

  const selectedCv = cvVersions.find((cv) => cv.id === formData.appliedCvId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f0f15] border border-white/10 w-full max-w-md rounded-2xl p-7 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Nueva postulaciÃ³n</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            placeholder="Empresa (ej: Mercado Libre)"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />

          <div className="space-y-2 group">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider group-focus-within:text-purple-400 transition-colors">
                CV utilizado (opcional)
              </span>

              {formData.appliedCvId && (
                <button
                  type="button"
                  onClick={() => {
                    if (selectedCv?.cvUrl) {
                      window.open(selectedCv.cvUrl, "_blank");
                    }
                  }}
                  className="text-purple-400 hover:text-purple-300 text-[10px] font-bold flex items-center gap-1.5 transition-all hover:-translate-x-0.5"
                >
                  <Eye size={12} strokeWidth={3} />
                  <span className="border-b border-purple-400/30 cursor-pointer">
                    VER SELECCIONADO
                  </span>
                </button>
              )}
            </div>

            <div className="relative">
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-gray-300 outline-none"
                value={formData.appliedCvId}
                onChange={(e) =>
                  setFormData({ ...formData, appliedCvId: e.target.value })
                }
              >
                <option value="" className="bg-[#0f0f15] text-gray-500">
                  NingÃºn CV seleccionado
                </option>

                {cvVersions.map((cv) => (
                  <option
                    key={cv.id}
                    value={cv.id}
                    className="bg-[#0f0f15] text-white"
                  >
                    {`CV - ${new Date(cv.date).toLocaleDateString()} (${cv.score} pts)`}
                  </option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-3 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <div className="w-px h-5 bg-white/10" />
                <FileType size={16} />
                <ChevronDown
                  size={14}
                  className="group-focus-within:rotate-180 transition-transform duration-300"
                />
              </div>
            </div>

            <p className="text-[10px] text-gray-600 italic px-1 leading-relaxed">
              Vincular tu CV te permite analizar quÃ© versiÃ³n tiene mejor tasa de
              conversiÃ³n en tus postulaciones.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-gray-500 font-bold uppercase ml-1">
              CategorÃ­a
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "frontend", label: "Frontend" },
                { id: "backend", label: "Backend" },
                { id: "fullstack", label: "Fullstack" },
                { id: "mobile", label: "Mobile" },
                { id: "devops", label: "DevOps" },
                { id: "data", label: "Data" },
              ].map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, roleCategory: role.id })
                  }
                  className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all border ${
                    formData.roleCategory === role.id
                      ? "bg-purple-600 text-white border-purple-500"
                      : "bg-white/5 text-gray-500 border-transparent hover:border-white/10"
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
            {[
              { id: "remote", label: "Remoto" },
              { id: "hibrido", label: "HÃ­brido" },
              { id: "presencial", label: "Presencial" },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setFormData({ ...formData, mode: m.id })}
                className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                  formData.mode === m.id
                    ? "bg-purple-600 text-white"
                    : "text-gray-500"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <LinkIcon
              className="absolute left-4 top-3.5 text-gray-600"
              size={16}
            />
            <input
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              placeholder="URL de la vacante"
              value={formData.jobUrl}
              onChange={(e) =>
                setFormData({ ...formData, jobUrl: e.target.value })
              }
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-xs text-gray-500 font-bold uppercase">
                Nivel de match
              </span>
              <span className="text-purple-400 font-black text-lg">
                {formData.matchLevel}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
              value={formData.matchLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  matchLevel: parseInt(e.target.value, 10),
                })
              }
            />
          </div>

          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none h-24"
            placeholder="Mensaje (ej: Proceso iniciado desde LinkedIn...)"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          <button
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-xl shadow-xl shadow-purple-600/20 transition-all disabled:opacity-50 active:scale-[0.98] cursor-pointer"
          >
            {loading ? "REGISTRANDO..." : "REGISTRAR POSTULACIÃ“N"}
          </button>
        </form>
      </div>
    </div>
  );
}
