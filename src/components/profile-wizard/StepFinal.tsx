"use client";

interface Props {
  consentToShareData: boolean | null;
  setConsentToShareData: (value: boolean) => void;
  additionalNotes: string;
  setAdditionalNotes: (value: string) => void;
}

export default function StepFinal({
  consentToShareData,
  setConsentToShareData,
  additionalNotes,
  setAdditionalNotes,
}: Props) {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold text-white">Resumen y Confirmación</h2>

      <div className="space-y-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!!consentToShareData}
            onChange={(e) => setConsentToShareData(e.target.checked)}
            className="w-4 h-4 accent-purple-600"
          />
          <span className="text-gray-400">
            Acepto compartir mis datos para aplicar a ofertas
          </span>
        </label>

        <div>
          <label className="text-sm text-gray-400 block mb-2">
            Comentarios adicionales
          </label>
          <textarea
            className="w-full bg-[#111118] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Si querés agregar algún comentario..."
            rows={4}
          />
        </div>
      </div>

      <div className="bg-[#1a1a24] p-4 rounded-xl border border-white/5">
        <p className="text-purple-400/80 text-[15px] text-center">
          Revisa que toda tu información esté correcta antes de enviar tu
          perfil.
        </p>
      </div>
    </div>
  );
}
