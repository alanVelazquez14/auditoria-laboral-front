"use client";
import { motion } from "framer-motion";

interface ScoreCircleProps {
  score: number; // 0 a 100
  label: string;
}

export const ScoreCircle = ({ score = 0, label }: ScoreCircleProps) => {
  // Cálculos para el círculo SVG
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Color dinámico según el puntaje
  const getColor = (s: number) => {
    if (s >= 80) return "#22c55e"; // Verde (Éxito)
    if (s >= 50) return "#7c3aed"; // Tu Morado (Medio)
    return "#ef4444"; // Rojo (Crítico)
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card-bg border border-gray-800 rounded-2xl shadow-xl">
      <div className="relative w-48 h-48">
        {/* Círculo de Fondo (Gris) */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-gray-800"
          />
          {/* Círculo de Progreso (Animado) */}
          <motion.circle
            cx="96"
            cy="96"
            r={radius}
            stroke={getColor(score)}
            strokeWidth="12"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Texto Central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-bold text-white"
          >
            {Math.round(score)}%
          </motion.span>
          <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            Score Total
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold text-gray-300">{label}</p>
    </div>
  );
};
