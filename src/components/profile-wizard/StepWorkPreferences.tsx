"use client";

interface Props {
  workMode: string[];
  setWorkMode: (value: string[]) => void;
  availability: string[];
  setAvailability: (value: string[]) => void;
  interests: string[];
  setInterests: (value: string[]) => void;
}

export default function StepWorkPreferences({
  workMode,
  setWorkMode,
  availability,
  setAvailability,
  interests,
  setInterests,
}: Props) {
  const inputButtonClass = (selected: boolean) =>
    `py-3 rounded-xl border transition-all ${
      selected
        ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
        : "bg-[#111118] border-white/10 text-gray-400 hover:border-purple-500/50"
    }`;

  const workModeOptions = ["Presencial", "Remoto", "Híbrido"];
  const availabilityOptions = ["Full-time", "Part-time", "Freelance"];
  const interestOptions = [
    "Liderazgo",
    "Mentoring",
    "Proyectos Open-Source",
    "Investigación",
  ];

  const handleMultiSelect = (
    current: string[],
    setCurrent: (v: string[]) => void,
    option: string,
  ) => {
    if (current.includes(option)) {
      setCurrent(current.filter((o) => o !== option));
    } else {
      setCurrent([...current, option]);
    }
  };

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold text-white">Preferencias de Trabajo</h2>

      {/* Modalidad de trabajo */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Modalidad de trabajo
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {workModeOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleMultiSelect(workMode, setWorkMode, option)}
              className={inputButtonClass(workMode.includes(option))}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Disponibilidad */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Disponibilidad
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {availabilityOptions.map((option) => (
            <button
              key={option}
              onClick={() =>
                handleMultiSelect(availability, setAvailability, option)
              }
              className={inputButtonClass(availability.includes(option))}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
     
    </div>
  );
}
