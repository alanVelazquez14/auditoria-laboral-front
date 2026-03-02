"use client";
import { useState } from "react";
import { X, Link as LinkIcon } from "lucide-react";

export default function NewApplicationModal({
  isOpen,
  onClose,
  onSuccess,
}: any) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    roleCategory: "",
    mode: "",
    jobUrl: "",
    matchLevel: 1,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const rawPayload: any = {
      companyName: formData.companyName.trim(),
      matchLevel: Number(formData.matchLevel),
    };

    if (formData.roleCategory) {
      rawPayload.roleCategory = formData.roleCategory;
    }

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
        alert("La URL no es válida");
        setLoading(false);
        return;
      }
    }

    if (formData.message.trim() !== "") {
      rawPayload.message = formData.message.trim();
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(rawPayload),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(
          "Error: " +
            (Array.isArray(result.message)
              ? result.message.join(", ")
              : result.message),
        );
        return;
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      alert("Error de conexión: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f0f15] border border-white/10 w-full max-w-md rounded-2xl p-7 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Nueva postulación</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre de Empresa */}
          <input
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            placeholder="Empresa (ej: Mercado Libre)"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />

          {/* Categoría (Role Category) */}
          <div className="space-y-2">
            <span className="text-[10px] text-gray-500 font-bold uppercase ml-1">
              Categoría
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

          {/* Modalidad (Mode) */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
            {[
              { id: "remote", label: "Remoto" },
              { id: "hibrido", label: "Híbrido" },
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

          {/* URL de la Vacante */}
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

          {/* Match Level (Slider) */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-xs text-gray-500 font-bold uppercase">
                Nivel de Match
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
                  matchLevel: parseInt(e.target.value),
                })
              }
            />
          </div>

          {/* Mensaje / Notas */}
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
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-xl shadow-xl shadow-purple-600/20 transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? "REGISTRANDO..." : "REGISTRAR POSTULACIÓN"}
          </button>
        </form>
      </div>
    </div>
  );
}
