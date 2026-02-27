"use client";

import { Code } from "lucide-react";
import { useEffect, useState } from "react";

type StepStackProps = {
  stack: string[];
  setStack: (value: string[]) => void;
  stackYears: string;
  setStackYears: (value: string) => void;
  stackExperienceType: string[];
  setStackExperienceType: (value: string[]) => void;
  stackMatchesCV: boolean | null;
  setStackMatchesCV: (value: boolean) => void;
};

const TECH_SUGGESTIONS = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "JavaScript",
  "NestJS",
  "Java",
  "Spring Boot",
  "Kotlin",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Git",
  "HTLML",
  "CSS",
  "Tailwind CSS",
  "Python",
  "Django",
  "Flask",
  "Vue.js",
  "Angular",
  "Svelte",
  "Webpack",
  "Babel",
  "GraphQL",
  "WordPress",
];

export default function StepStack({
  stack,
  setStack,
  stackYears,
  setStackYears,
  stackExperienceType,
  setStackExperienceType,
  stackMatchesCV,
  setStackMatchesCV,
}: StepStackProps) {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const inputClasses =
    "w-full bg-[#1a1a24] border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none transition-all";

  const addStack = () => {
    if (!inputValue.trim() || stack.length >= 5) return;
    setStack([...stack, inputValue.trim()]);
    setInputValue("");
  };

  const removeStack = (tech: string) => {
    setStack(stack.filter((t) => t !== tech));
  };

  useEffect(() => {
    if (!inputValue.trim()) {
      setFilteredSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    const filtered = TECH_SUGGESTIONS.filter((tech) =>
      tech.toLowerCase().includes(inputValue.toLowerCase()),
    ).filter((tech) => !stack.includes(tech));

    setFilteredSuggestions(filtered.slice(0, 5));
    setActiveIndex(-1);
  }, [inputValue, stack]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-purple-600/10 p-3 rounded-xl w-fit">
        <Code className="text-purple-400" size={24} />
      </div>

      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Stack principal</h2>
        <p className="text-gray-400">
          ¿Cuáles son las tecnologías que realmente dominás hoy?
        </p>
      </div>

      {/* STACK INPUT */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ej: React, Node.js..."
            className={inputClasses}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((prev) =>
                  prev < filteredSuggestions.length - 1 ? prev + 1 : prev,
                );
              }

              if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
              }

              if (e.key === "Enter") {
                e.preventDefault();

                if (activeIndex >= 0) {
                  const selectedTech = filteredSuggestions[activeIndex];
                  if (stack.length < 5) {
                    setStack([...stack, selectedTech]);
                    setInputValue("");
                    setFilteredSuggestions([]);
                    setActiveIndex(-1);
                  }
                } else {
                  addStack();
                }
              }
            }}
          />
        </div>

        {isFocused && filteredSuggestions.length > 0 && (
          <div className="absolute z-50 bg-[#1a1a24] border border-white/10 rounded-xl overflow-hidden shadow-lg">
            {filteredSuggestions.map((tech, index) => (
              <div
                key={tech}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  if (stack.length >= 5) return;
                  setStack([...stack, tech]);
                  setInputValue("");
                  setFilteredSuggestions([]);
                  setActiveIndex(-1);
                }}
                className={`p-4 text-sm cursor-pointer transition-colors ${
                  activeIndex === index
                    ? "bg-purple-600/30 text-white"
                    : "text-gray-300 hover:bg-purple-600/20 hover:text-white"
                }`}
              >
                {tech}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <div
              key={tech}
              className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm cursor-pointer"
              onClick={() => removeStack(tech)}
            >
              {tech}
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500">Máximo 5 tecnologías</p>
      </div>

      {/* AÑOS */}
      <div>
        <h3 className="text-lg font-semibold text-white">
          ¿Hace cuánto usás este stack?
        </h3>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {["Menos de 1 año", "1-2 años", "2-4 años", "4+ años"].map(
            (option) => (
              <button
                key={option}
                onClick={() => setStackYears(option)}
                className={`py-3 rounded-xl border transition-all ${
                  stackYears === option
                    ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                    : "bg-[#111118] border-white/10 text-gray-400 hover:border-purple-500/50"
                }`}
              >
                {option}
              </button>
            ),
          )}
        </div>
      </div>

      {/* EXPERIENCIA REAL */}
      <div>
        <h3 className="text-lg font-semibold text-white">
          ¿Dónde usaste principalmente este stack?
        </h3>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {[
            "Solo cursos",
            "Proyectos personales",
            "Freelance",
            "Trabajo formal",
          ].map((option) => {
            const isSelected = stackExperienceType.includes(option);

            const toggleOption = () => {
              if (isSelected) {
                setStackExperienceType(
                  stackExperienceType.filter((item) => item !== option),
                );
              } else {
                setStackExperienceType([...stackExperienceType, option]);
              }
            };

            return (
              <button
                key={option}
                onClick={toggleOption}
                className={`py-3 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                    : "bg-[#111118] border-white/10 text-gray-400 hover:border-purple-500/50"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
      {/* COHERENCIA CV */}
      <div>
        <h3 className="text-lg font-semibold text-white">
          ¿Es el mismo stack que aparece como principal en tu CV?
        </h3>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setStackMatchesCV(true)}
            className={`flex-1 py-3 rounded-xl border transition-all ${
              stackMatchesCV === true
                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                : "bg-[#111118] border-white/10 text-gray-400 hover:border-purple-500/50"
            }`}
          >
            Sí
          </button>

          <button
            onClick={() => setStackMatchesCV(false)}
            className={`flex-1 py-3 rounded-xl border transition-all ${
              stackMatchesCV === false
                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                : "bg-[#111118] border-white/10 text-gray-400 hover:border-purple-500/50"
            }`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
