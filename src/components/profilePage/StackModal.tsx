"use client";
import { useState, useEffect, useRef } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { TECH_SUGGESTIONS } from "../profile-wizard/StepStack";

interface StackModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStack: string[];
  onSave: (newStack: string[]) => void;
}

export default function StackModal({
  isOpen,
  onClose,
  currentStack,
  onSave,
}: StackModalProps) {
  const [stack, setStack] = useState<string[]>(currentStack);
  const [newSkill, setNewSkill] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStack(currentStack || []);
    }
  }, [isOpen, currentStack]);

  useEffect(() => {
    if (newSkill.trim()) {
      const filtered = TECH_SUGGESTIONS.filter(
        (tech) =>
          tech.toLowerCase().includes(newSkill.toLowerCase()) &&
          !stack.some((s) => s.toLowerCase() === tech.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [newSkill, stack]);

  const addSkill = (skillName: string) => {
    const skillToAdd = skillName.trim();
    if (!skillToAdd) return;
    if (!stack.some((s) => s.toLowerCase() === skillToAdd.toLowerCase())) {
      setStack([...stack, skillToAdd]);
    }
    setNewSkill("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeSkill = (index: number) => {
    setStack(stack.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card-bg border border-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Gestionar Stack</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Contenedor relativo para el Input y Sugerencias */}
          <div className="relative mb-6">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill(newSkill)}
                placeholder="Ej: Next.js, Docker..."
                className="flex-1 bg-background border border-gray-700 rounded-xl px-4 py-2 text-white outline-none focus:border-brand-purple transition-all"
              />
              <button
                onClick={() => addSkill(newSkill)}
                className="bg-brand-purple p-2 rounded-xl text-white hover:bg-brand-purple/80 transition-all cursor-pointer shrink-0"
              >
                <Plus size={24} />
              </button>
            </div>

            {/* LISTA DE SUGERENCIAS: Ahora posicionada correctamente */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-[110%] z-60 bg-card-bg border border-gray-700 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] max-h-48 overflow-y-auto custom-scrollbar">
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => addSkill(suggestion)}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-brand-purple/20 hover:text-brand-purple transition-colors border-b border-gray-800/50 last:border-0"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lista de Skills con scroll */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {stack.map((skill, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-background border border-gray-800 rounded-xl"
              >
                <span className="text-white font-medium">{skill}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {stack.length === 0 && (
              <p className="text-center text-gray-500 text-sm py-4">
                No has añadido tecnologías aún
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-background/50 border-t border-gray-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white text-sm cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(stack)}
            className="px-6 py-2 bg-brand-purple text-white rounded-xl font-bold hover:bg-brand-purple/80 transition-all cursor-pointer"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
