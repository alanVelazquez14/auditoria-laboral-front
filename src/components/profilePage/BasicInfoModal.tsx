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
    workPreference: userData?.workPreference || "REMOTE",
    recentApplications: userData?.recentApplications || "Menos de 5",
    stackYears: userData?.stackYears || "0-1 año",
    applicationType: userData?.applicationType || [],
    stackExperienceType: userData?.stackExperienceType || [],
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
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ubicación */}
            <div className="md:col-span-2">
              <label className="text-[10px] text-gray-500 mb-1 block uppercase font-bold tracking-wider">
                Ubicación
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full bg-background border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:border-brand-purple outline-none transition-all text-sm"
                placeholder="Ej: Buenos Aires, Argentina"
              />
            </div>

            {/* Nivel de Inglés */}
            <div>
              <label className="text-[10px] text-gray-500 mb-1 block uppercase font-bold tracking-wider">
                Nivel de Inglés
              </label>
              <select
                value={formData.englishLevel}
                onChange={(e) =>
                  setFormData({ ...formData, englishLevel: e.target.value })
                }
                className="w-full bg-background border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:border-brand-purple outline-none text-sm appearance-none"
              >
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
                <option value="Nativo">Nativo</option>
              </select>
            </div>

            {/* Modalidad */}
            <div>
              <label className="text-[10px] text-gray-500 mb-1 block uppercase font-bold tracking-wider">
                Modalidad
              </label>
              <select
                value={formData.workPreference}
                onChange={(e) =>
                  setFormData({ ...formData, workPreference: e.target.value })
                }
                className="w-full bg-background border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:border-brand-purple outline-none text-sm"
              >
                <option value="REMOTO">Remoto</option>
                <option value="HIBRIDO">Híbrido</option>
                <option value="PRESENCIAL">Presencial</option>
              </select>
            </div>

            {/* Seniority */}
            <div className="md:col-span-2">
              <label className="text-[10px] text-gray-500 mb-1 block uppercase font-bold tracking-wider">
                Seniority
              </label>
              <select
                value={formData.seniority}
                onChange={(e) =>
                  setFormData({ ...formData, seniority: e.target.value })
                }
                className="w-full bg-background border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:border-brand-purple outline-none text-sm uppercase"
              >
                <option value="trainee">Trainee</option>
                <option value="jr">Junior</option>
                <option value="ssr">Semi-Senior</option>
                <option value="sr">Senior</option>
              </select>
            </div>

            {/* --- Sección de Estrategia --- */}
            <div className="md:col-span-2 mt-4 mb-2">
              <p className="text-brand-purple text-[10px] font-bold uppercase tracking-[0.2em]">
                Estrategia de Búsqueda
              </p>
              <div className="h-px bg-gray-800 w-full mt-2"></div>
            </div>

            {/* Cantidad de Aplicaciones */}
            <div>
              <label className="text-[10px] text-gray-500 mb-1 block uppercase font-bold tracking-wider">
                Aplicaciones Recientes
              </label>
              <select
                value={formData.recentApplications}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recentApplications: e.target.value,
                  })
                }
                className="w-full bg-background border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:border-brand-purple outline-none text-sm"
              >
                <option value="Menos de 5">Menos de 5</option>
                <option value="Entre 5 y 15">Entre 5 y 15</option>
                <option value="Entre 15 y 30">Entre 15 y 30</option>
                <option value="Más de 30">Más de 30</option>
              </select>
            </div>

            {/* Años en el Stack actual */}
            <div>
              <label className="text-[10px] text-gray-500 mb-1 block uppercase font-bold tracking-wider">
                Exp. en este Stack
              </label>
              <select
                value={formData.stackYears}
                onChange={(e) =>
                  setFormData({ ...formData, stackYears: e.target.value })
                }
                className="w-full bg-background border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:border-brand-purple outline-none text-sm"
              >
                <option value="0-1 año">0-1 año</option>
                <option value="1-3 años">1-3 años</option>
                <option value="3-5 años">3-5 años</option>
                <option value="+5 años">+5 años</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-background border-t border-gray-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-400 hover:text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-brand-purple text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all active:scale-95 cursor-pointer"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
