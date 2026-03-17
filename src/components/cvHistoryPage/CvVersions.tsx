import { EvolutionPoint } from "@/app/(dashboard)/profile/cv-history/page";
import { CheckCircle2, Download, Eye } from "lucide-react";

export default function CvVersions({
  evolutionData,
}: {
  evolutionData: EvolutionPoint[];
}) {

  //Funcion ver CV
  const handleView = (url?: string) => {
    if (!url) return alert("No hay URL disponible para este CV");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  //Funcion descargar CV
  const handleDownload = async (url?: string, date?: string) => {
    if (!url) return alert("No hay archivo para descargar");

    const fileName = `CV_DepurApp_${date?.split("T")[0]}.pdf`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error();
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      const downloadUrl = url.replace("/upload/", "/upload/fl_attachment/");
      window.open(downloadUrl, "_blank");
    }
  };


  if (!evolutionData || evolutionData.length === 0) {
    return (
      <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-10 text-center">
        <p className="text-gray-500">
          Aún no tienes versiones de CV registradas.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-white/5">
        <h3 className="text-lg font-semibold text-white">
          Historial de Archivos
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm border-b border-white/5">
              <th className="px-6 py-4 font-medium">Fecha</th>
              <th className="px-6 py-4 font-medium">Score</th>
              <th className="px-6 py-4 font-medium">Estado</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {evolutionData.map((cv, idx) => (
              <tr
                key={idx}
                className="group hover:bg-white/2 transition-colors"
              >
                <td className="px-6 py-4 text-gray-300 text-sm">
                  {new Date(cv.date).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      cv.score > 70
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {cv.score} pts
                  </span>
                </td>
                <td className="px-6 py-4">
                  {idx === 0 ? (
                    <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                      <CheckCircle2 size={14} />
                      <span>Principal</span>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">Archivo</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleView(cv.cvUrl)}
                    className="p-2 text-gray-500 hover:text-white transition-colors hover:bg-white/5 rounded-lg cursor-pointer"
                    title="Ver CV"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleDownload(cv.cvUrl, cv.date)}
                    className="p-2 text-gray-500 hover:text-purple-400 transition-colors hover:bg-purple-400/10 rounded-lg cursor-pointer"
                    title="Descargar"
                  >
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
