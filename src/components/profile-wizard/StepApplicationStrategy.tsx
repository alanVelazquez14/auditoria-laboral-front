"use client";

interface Props {
  recentApplications: string;
  setRecentApplications: (value: string) => void;
  interviews: string;
  setInterviews: (value: string) => void;
  recentRejections: string;
  setRecentRejections: (value: string) => void;
  applicationType: string[];
  setApplicationType: (value: string[]) => void;
}

export default function StepApplicationStrategy({
  recentApplications,
  setRecentApplications,
  interviews,
  setInterviews,
  recentRejections,
  setRecentRejections,
  applicationType,
  setApplicationType,
}: Props) {
  const inputButtonClass = (selected: boolean) =>
    `py-3 rounded-xl border transition-all ${
      selected
        ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
        : "bg-[#111118] border-white/10 text-gray-400 hover:border-purple-500/50"
    }`;

  const optionsRanges = [
    "Menos de 5",
    "Entre 5 y 15",
    "Entre 15 y 30",
    "Más de 30",
  ];

  const optionsApplicationType = [
    "Aplico masivamente (mismo CV)",
    "Personalizo CV según empresa",
    "Solo aplico a ofertas muy específicas",
    "Uso referidos/contactos",
    "Uso solo LinkedIn para aplicar",
    "Uso portales de empleo (Bumeran, ZonaJobs, etc.)",
  ];

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold text-white">
        Estrategia de Postulación
      </h2>

      {/* Postulaciones */}
      <div>
        <label className="text-sm text-gray-400 block mb-2">
          Postulaciones últimos 30 días
        </label>
        <div className="grid grid-cols-2 gap-4">
          {optionsRanges.map((option) => (
            <button
              key={option}
              onClick={() => setRecentApplications(option)}
              className={inputButtonClass(recentApplications === option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Entrevistas */}
      {/* <div>
        <label className="text-sm text-gray-400 block mb-2">
          Entrevistas obtenidas
        </label>
        <div className="grid grid-cols-2 gap-4">
          {optionsRanges.map((option) => (
            <button
              key={option}
              onClick={() => setInterviews(option)}
              className={inputButtonClass(interviews === option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div> */}

      {/* Rechazos */}
      {/* <div>
        <label className="text-sm text-gray-400 block mb-2">
          Rechazos recientes
        </label>
        <div className="grid grid-cols-2 gap-4">
          {optionsRanges.map((option) => (
            <button
              key={option}
              onClick={() => setRecentRejections(option)}
              className={inputButtonClass(recentRejections === option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div> */}

      {/* Tipo de aplicación */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          ¿Cómo aplicás normalmente?
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {optionsApplicationType.map((option) => {
            const isSelected = applicationType.includes(option);

            return (
              <button
                key={option}
                onClick={() => {
                  if (isSelected) {
                    // quitar si ya estaba seleccionado
                    setApplicationType(
                      applicationType.filter((a) => a !== option),
                    );
                  } else {
                    // agregar al array
                    setApplicationType([...applicationType, option]);
                  }
                }}
                className={inputButtonClass(isSelected)}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-[#1a1a24] p-4 rounded-xl border border-white/5">
        <p className="text-purple-400/80 text-[15px] text-center">
          Más volumen no siempre es mejor. Personalizar tu CV y aplicar
          estratégicamente puede aumentar tus chances de éxito.
        </p>
      </div>
    </div>
  );
}
