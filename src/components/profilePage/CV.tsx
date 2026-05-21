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
import { useSession } from "next-auth/react";
import { handleApiError } from "@/utils/error-handler";
import DiagnosticQuota from "./DiagnosticQuota";
import { apiClientRequest } from "@/lib/api-client";
import {
  extractUserCvAnalysis,
  normalizeCvAnalysis,
  type CvAnalysis,
} from "@/lib/cv-analysis";
import type {
  BackendCvUploadResponse,
  BackendUserMe,
} from "@/types/backend";

export default function CV({ userData }: { userData: BackendUserMe }) {
  const { data: session } = useSession();
  const [refreshQuota, setRefreshQuota] = useState(0);
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initialAnalysis = extractUserCvAnalysis(userData);
  const [analysisResult, setAnalysisResult] = useState<CvAnalysis | null>(
    initialAnalysis,
  );
  const [analysisStatus, setAnalysisStatus] = useState<
    "idle" | "analyzing" | "done"
  >(initialAnalysis ? "done" : "idle");

  const isButtonDisabled =
    isUploading || (remainingCredits !== null && remainingCredits <= 0);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Archivo muy pesado", { description: "Máximo 5MB" });
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      setAnalysisStatus("analyzing");

      const result = await apiClientRequest<BackendCvUploadResponse>(
        "/api/users/upload-cv",
        {
          method: "POST",
          auth: true,
          session,
          body: formData,
        },
      );

      setAnalysisResult(normalizeCvAnalysis(result));
      setAnalysisStatus("done");
      setRefreshQuota((prev) => prev + 1);
      toast.success("CV analizado con éxito");
    } catch (error) {
      setAnalysisStatus("idle");
      handleApiError(error, "Error al procesar");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="bg-card-bg border border-gray-800 p-8 rounded-2xl shadow-sm space-y-6">
      <DiagnosticQuota
        refreshTrigger={refreshQuota}
        onQuotaChange={(count) => setRemainingCredits(count)}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <FileText size={20} className="text-brand-purple" />
          <span>Currículum Vitae</span>
        </div>

        {analysisStatus !== "analyzing" &&
          (userData.stackMatchesCV ? (
            <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded-full border border-green-500/20 flex items-center gap-1">
              <CheckCircle2 size={10} /> CV sincronizado
            </span>
          ) : (
            <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full border border-yellow-500/20 flex items-center gap-1">
              <AlertCircle size={10} /> CV desactualizado
            </span>
          ))}
      </div>

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
          {userData.cvUrl ? (
            <div className="p-5 bg-background border border-gray-800 rounded-2xl flex items-center justify-between group hover:border-brand-purple/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-purple/10 rounded-xl">
                  <FileText size={24} className="text-brand-purple" />
                </div>
                <div>
                  <p className="text-sm text-white font-semibold">
                    Mi currículum actual
                  </p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-tighter">
                    Analizado: {new Date(userData.updatedAt ?? Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <a
                href={userData.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
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

          {analysisStatus === "done" && analysisResult && (
            <AnalysisReport data={analysisResult} />
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isButtonDisabled}
            className={`w-full py-4 border rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 
          ${
            isButtonDisabled
              ? "bg-gray-800/50 border-gray-700 text-gray-500 cursor-not-allowed opacity-70"
              : "bg-brand-purple/10 border-brand-purple/20 text-brand-purple hover:bg-brand-purple hover:text-white cursor-pointer"
          }`}
          >
            {isUploading ? (
              <Loader2 className="animate-spin" />
            ) : remainingCredits === 0 ? (
              <AlertCircle size={16} />
            ) : (
              <Upload size={16} />
            )}

            {isUploading
              ? "Analizando..."
              : remainingCredits === 0
                ? "Límite diario alcanzado"
                : userData.cvUrl
                  ? "Re-analizar CV"
                  : "Subir currículum (PDF)"}
          </button>
          {remainingCredits !== null && (
            <div className="flex justify-between items-center px-1 opacity-60">
              <span className="text-[13px] uppercase tracking-tighter text-gray-500 font-medium">
                Créditos disponibles
              </span>
              <span
                className={`text-[13px] font-bold ${
                  remainingCredits > 0 ? "text-brand-purple" : "text-red-500"
                }`}
              >
                {remainingCredits} / 5
              </span>
            </div>
          )}
        </>
      )}

      <p className="text-[12px] text-gray-600 text-center uppercase tracking-widest mt-4">
        Optimizado para filtros ATS e inteligencia artificial
      </p>
    </section>
  );
}
