"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface BasicInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
  onSave: (updatedData: any) => void;
}

export default function BasicInfoModal({
  isOpen,
  onClose,
  userData,
  onSave,
}: BasicInfoModalProps) {
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || "",
    location: userData?.location || "",
    englishLevel: userData?.englishLevel || "Básico",
    seniority: userData?.seniority || "jr",
    workPreference: userData?.workPreference || "REMOTO",
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card-bg border border-gray-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">
            Editar Información Personal
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div className="md:col-span-2">
            <label className="text-xs text-gray-500 mb-1 block">
              Nombre Completo
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full bg-background border border-gray-700 rounded-xl px-4 py-2 text-white focus:border-brand-purple outline-none transition-all"
            />
          </div> */}

          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Ubicación
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full bg-background border border-gray-700 rounded-xl px-4 py-2 text-white focus:border-brand-purple outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Nivel de Inglés
            </label>
            <select
              value={formData.englishLevel}
              onChange={(e) =>
                setFormData({ ...formData, englishLevel: e.target.value })
              }
              className="w-full bg-background border border-gray-700 rounded-xl px-4 py-2 text-white focus:border-brand-purple outline-none"
            >
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
              <option value="Nativo">Nativo</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Seniority
            </label>
            <select
              value={formData.seniority}
              onChange={(e) =>
                setFormData({ ...formData, seniority: e.target.value })
              }
              className="w-full bg-background border border-gray-700 rounded-xl px-4 py-2 text-white focus:border-brand-purple outline-none uppercase"
            >
              <option value="trainee">Trainee</option>
              <option value="jr">Junior</option>
              <option value="ssr">Semi-Senior</option>
              <option value="sr">Senior</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Modalidad
            </label>
            <select
              value={formData.workPreference}
              onChange={(e) =>
                setFormData({ ...formData, workPreference: e.target.value })
              }
              className="w-full bg-background border border-gray-700 rounded-xl px-4 py-2 text-white focus:border-brand-purple outline-none"
            >
              <option value="REMOTO">Remoto</option>
              <option value="HIBRIDO">Híbrido</option>
              <option value="PRESENCIAL">Presencial</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-background/50 border-t border-gray-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white text-sm cursor-pointer transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-brand-purple text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all cursor-pointer"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
