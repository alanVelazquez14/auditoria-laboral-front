"use client";

import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";

type StepLocationProps = {
  value: string;
  onChange: (value: string) => void;
  workPreference: "REMOTO" | "PRESENCIAL" | "HIBRIDO" | null;
  setWorkPreference: (value: "REMOTO" | "PRESENCIAL" | "HIBRIDO") => void;
  englishLevel: "Básico" | "Intermedio" | "Avanzado" | "Nativo" | null;
  setEnglishLevel: (
    value: "Básico" | "Intermedio" | "Avanzado" | "Nativo",
  ) => void;
};

type Suggestion = {
  place_id: number;
  display_name: string;
};

export default function StepLocation({
  value,
  onChange,
  workPreference,
  setWorkPreference,
  englishLevel,
  setEnglishLevel,
}: StepLocationProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const inputClasses =
    "w-full bg-[#1a1a24] border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none transition-all";

  useEffect(() => {
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}&countrycodes=ar&addressdetails=1`,
        );

        const data = await res.json();

        setSuggestions(
          data.slice(0, 5).map((item: any) => ({
            place_id: item.place_id,
            display_name: item.display_name,
          })),
        );
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-purple-600/10 p-3 rounded-xl w-fit">
        <MapPin className="text-purple-400" size={24} />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Ubicación</h2>
        <p className="text-gray-400">¿Dónde te encuentras actualmente?</p>
      </div>

      <div className="space-y-4 relative">
        <div>
          <input
            type="text"
            placeholder="Ej: Buenos Aires, Argentina"
            className={inputClasses}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          />

          {/* Dropdown */}
          {isFocused && suggestions.length > 0 && (
            <div className="absolute z-50 mt-2 w-full bg-[#1a1a24] border border-white/10 rounded-xl overflow-hidden shadow-lg">
              {suggestions.map((item) => (
                <div
                  key={item.place_id}
                  onClick={() => {
                    onChange(item.display_name);
                    setSuggestions([]);
                  }}
                  className="p-4 text-sm text-gray-300 hover:bg-purple-600/20 hover:text-white cursor-pointer transition-colors"
                >
                  {item.display_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white">
          ¿Cuál es tu preferencia de trabajo?
        </h3>
        <div className="flex gap-4 mt-4">
          {["REMOTO", "PRESENCIAL", "HIBRIDO"].map((mode) => (
            <button
              key={mode}
              onClick={() =>
                setWorkPreference(mode as "REMOTO" | "PRESENCIAL" | "HIBRIDO")
              }
              className={`flex-1 py-3 rounded-xl border transition-all ${
                workPreference === mode
                  ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                  : "bg-[#111118] border-white/10 text-gray-400 hover:border-purple-500/50"
              }`}
            >
              {mode.charAt(0) + mode.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mt-6">
          Nivel de inglés (reuniones y documentación)
        </h3>
        <div className="flex gap-4 mt-4">
          {["Básico", "Intermedio", "Avanzado", "Nativo"].map((level) => (
            <button
              key={level}
              onClick={() =>
                setEnglishLevel(
                  level as "Básico" | "Intermedio" | "Avanzado" | "Nativo",
                )
              }
              className={`flex-1 py-3 rounded-xl border transition-all ${
                englishLevel === level
                  ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                  : "bg-[#111118] border-white/10 text-gray-400 hover:border-purple-500/50"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a24] p-4 rounded-xl border border-white/5">
        <p className="text-purple-400/80 text-[15px] text-center">
          La ubicacion impacta directamente en las oportunidades disponibles.
        </p>
      </div>
    </div>
  );
}
