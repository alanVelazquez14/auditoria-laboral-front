"use client";
import {
  FileText,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import AnalysisReport from "./AnalysisReport";
import { getSession } from "next-auth/react";

export default function CV({ userData }: { userData: any }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mockResult, setMockResult] = useState<any>(
    userData.lastAnalysis || null,
  );
  const [analysisStatus, setAnalysisStatus] = useState<
    "idle" | "analyzing" | "done"
  >(userData.lastAnalysis ? "done" : "idle");

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      setAnalysisStatus("analyzing");

      const session = await getSession();
      const token = session?.accessToken;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/upload-cv`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) throw new Error("Error en la subida");

      const result = await response.json();

      setMockResult(result);

      setAnalysisStatus("done");

      toast.success("¡CV analizado con éxito!");
    } catch (error) {
      setAnalysisStatus("idle");
      toast.error("Hubo un problema al procesar tu archivo");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="bg-card-bg border border-gray-800 p-8 rounded-2xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <FileText size={20} className="text-brand-purple" />
          <span>Currículum Vitae</span>
        </div>

        {analysisStatus !== "analyzing" &&
          (userData.stackMatchesCV ? (
            <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded-full border border-green-500/20 flex items-center gap-1">
              <CheckCircle2 size={10} /> CV Sincronizado
            </span>
          ) : (
            <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full border border-yellow-500/20 flex items-center gap-1">
              <AlertCircle size={10} /> CV desactualizado
            </span>
          ))}
      </div>

      {/* Estado: Analizando (Skeleton / Loader) */}
      {analysisStatus === "analyzing" ? (
        <div className="p-8 border-2 border-dashed border-brand-purple/30 bg-brand-purple/5 rounded-2xl flex flex-col items-center justify-center text-center animate-pulse">
          <Loader2 className="text-brand-purple animate-spin mb-3" size={32} />
          <p className="text-white font-semibold text-sm">
            Nuestro motor IA está leyendo tu CV...
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Buscando patrones de reclutamiento y keywords.
          </p>
        </div>
      ) : (
        <>
          {/* Visualización de CV Actual */}
          {userData.cvUrl ? (
            <div className="p-5 bg-background border border-gray-800 rounded-2xl flex items-center justify-between group hover:border-brand-purple/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-purple/10 rounded-xl">
                  <FileText size={24} className="text-brand-purple" />
                </div>
                <div>
                  <p className="text-sm text-white font-semibold">
                    Mi Currículum Actual
                  </p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-tighter">
                    Analizado:{" "}
                    {new Date(userData.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <a
                href={userData.cvUrl}
                target="_blank"
                className="p-2 text-gray-400 hover:text-brand-purple transition-colors"
                title="Ver PDF"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center bg-background/50">
              <Upload className="text-gray-600 mb-2" size={24} />
              <p className="text-gray-500 text-sm">
                Aún no has cargado un archivo
              </p>
            </div>
          )}

          {analysisStatus === "done" && mockResult && (
            <AnalysisReport data={mockResult} />
          )}

          {/* Input oculto y Botón de Acción */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full py-4 bg-brand-purple/10 border border-brand-purple/20 text-brand-purple hover:bg-brand-purple hover:text-white rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Upload size={16} />
            {userData.cvUrl
              ? "Reemplazar y Re-analizar CV"
              : "Subir Currículum (PDF)"}
          </button>
        </>
      )}

      <p className="text-[10px] text-gray-600 text-center uppercase tracking-widest mt-4">
        Optimizado para filtros ATS e Inteligencia Artificial
      </p>
    </section>
  );
}
