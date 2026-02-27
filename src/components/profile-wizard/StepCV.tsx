"use client";

import { Upload, CheckCircle2 } from "lucide-react";

type StepCVProps = {
  cvFile: File | null;
  setCvFile: (file: File | null) => void;
  isRoleOptimized: boolean | null;
  setIsRoleOptimized: (value: boolean) => void;
};

export default function StepCV({
  cvFile,
  setCvFile,
  isRoleOptimized,
  setIsRoleOptimized,
}: StepCVProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-purple-600/10 p-3 rounded-xl w-fit">
        <Upload className="text-purple-400" size={24} />
      </div>

      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Tu CV</h2>
        <p className="text-gray-400">Súbelo para que podamos analizarlo.</p>
      </div>

      <label
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all ${
          cvFile
            ? "border-cyan-500/50 bg-cyan-500/5"
            : "border-white/10 hover:border-purple-500/50 bg-[#111118]"
        }`}
      >
        <input
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setCvFile(e.target.files?.[0] || null)}
        />

        {cvFile ? (
          <>
            <CheckCircle2 className="text-cyan-400 mb-4" size={40} />
            <p className="text-cyan-400 font-bold">CV cargado correctamente</p>
            <p className="text-gray-500 text-xs mt-2">{cvFile.name}</p>
          </>
        ) : (
          <>
            <Upload
              className="text-gray-500 mb-4 group-hover:text-purple-400 transition-colors"
              size={40}
            />
            <p className="text-white font-medium">Toca para subir tu CV</p>
            <p className="text-gray-500 text-xs mt-2">
              PDF, DOC o DOCX - Max 5MB
            </p>
          </>
        )}
      </label>
      <div>
        <h3 className="text-lg font-bold text-white mb-2 mt-10">
          ¿Tu CV está adaptado específicamente al rol al que querés postularte?
        </h3>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setIsRoleOptimized(true)}
            className={`flex-1 py-3 rounded-xl border transition-all cursor-pointer ${
              isRoleOptimized === true
                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                : "bg-[#111118] border-white/10 text-gray-400 hover:border-purple-500/50"
            }`}
          >
            Sí
          </button>

          <button
            onClick={() => setIsRoleOptimized(false)}
            className={`flex-1 py-3 rounded-xl border transition-all cursor-pointer ${
              isRoleOptimized === false
                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                : "bg-[#111118] border-white/10 text-gray-400 hover:border-purple-500/50"
            }`}
          >
            No
          </button>
        </div>
      </div>

      <div className="bg-[#1a1a24] p-4 rounded-xl border border-white/5">
        <p className="text-purple-400/80 text-[15px] text-center">
          Este dato suele ser clave para detectar bloqueos invisibles.
        </p>
      </div>
    </div>
  );
}
