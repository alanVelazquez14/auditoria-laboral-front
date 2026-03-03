"use client";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#7c3aed", "#a78bfa", "#ffffff"],
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <CheckCircle size={80} className="text-green-500 mb-6" />
      <h1 className="text-4xl font-bold mb-2">¡Gracias por tu apoyo!</h1>
      <p className="text-gray-400">Tu donación fue procesada con éxito.</p>
    </div>
  );
}
