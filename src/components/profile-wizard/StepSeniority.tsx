"use client";

import { Briefcase } from "lucide-react";

type StepSeniorityProps = {
  targetRole: string;
  setTargetRole: (value: string) => void;
  seniority: string;
  setSeniority: (value: string) => void;
  yearsExperience: string;
  setYearsExperience: (value: string) => void;
  recommendedSeniority: string | null;
  isCoherent: boolean;
};

export default function StepSeniority({
  targetRole,
  setTargetRole,
  seniority,
  setSeniority,
  yearsExperience,
  setYearsExperience,
  recommendedSeniority,
  isCoherent,
}: StepSeniorityProps) {
  const inputClasses =
    "w-full bg-[#1a1a24] border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none transition-all";

  const seniorityOptions = ["Trainee", "Junior", "Semi Senior", "Senior"];

  const experienceOptions = [
    { label: "0 – 1 año", value: "0-1" },
    { label: "1 – 3 años", value: "1-3" },
    { label: "3 – 5 años", value: "3-5" },
    { label: "5+ años", value: "5+" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-purple-600/10 p-3 rounded-xl w-fit">
        <Briefcase className="text-purple-400" size={24} />
      </div>

      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Rol Profesional</h2>
        <p className="text-gray-400">Definamos hacia dónde estás apuntando.</p>
      </div>

      {/* Rol objetivo */}
      <div>
        <label className="text-sm text-gray-400 mb-2 block">
          Rol principal al que querés postularte
        </label>
        <input
          type="text"
          placeholder="Ej: Backend Developer"
          className={inputClasses}
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
        />
      </div>

      {/* Seniority */}
      <div>
        <label className="text-sm text-gray-400 mb-3 block">
          Seniority con el que te identificás
        </label>

        <div className="grid grid-cols-2 gap-4">
          {seniorityOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSeniority(option)}
              className={`py-3 rounded-xl border transition-all ${
                seniority === option
                  ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                  : "bg-[#111118] border-white/10 text-gray-400 hover:border-purple-500/50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Años reales */}
      <div>
        <label className="text-sm text-gray-400 mb-3 block">
          Años reales de experiencia laboral en este rol
        </label>

        <div className="grid grid-cols-2 gap-4">
          {experienceOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setYearsExperience(option.value)}
              className={`py-3 rounded-xl border transition-all ${
                yearsExperience === option.value
                  ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                  : "bg-[#111118] border-white/10 text-gray-400 hover:border-purple-500/50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {recommendedSeniority && !isCoherent && (
        <div className="bg-[#1a1111] border border-red-900/30 p-4 rounded-xl mt-4">
          <p className="text-red-400 text-sm">
            Según tus años de experiencia, el seniority más coherente sería:{" "}
            <span className="font-semibold text-white">
              {recommendedSeniority}
            </span>
          </p>

          <button
            onClick={() => setSeniority(recommendedSeniority)}
            className="mt-3 text-sm text-purple-400 hover:text-purple-300 transition cursor-pointer"
          >
            Ajustar automáticamente
          </button>
        </div>
      )}

      <div className="bg-[#1a1a24] p-4 rounded-xl border border-white/5">
        <p className="text-purple-400/80 text-[15px] text-center">
          La coherencia entre rol, seniority y experiencia es clave para superar
          filtros ATS.
        </p>
      </div>
    </div>
  );
}
