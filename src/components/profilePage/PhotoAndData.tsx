"use client";
import {
  Briefcase,
  Camera,
  Edit2,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Cpu,
} from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import StackModal from "./StackModal";

export default function PhotoAndData({
  userData,
  onEdit,
}: {
  userData: any;
  onEdit: () => void;
}) {
  const { data: session } = useSession();
  const [isSending, setIsSending] = useState(false);
  const [isEditStackOpen, setIsEditStackOpen] = useState(false);
  const [currentStack, setCurrentStack] = useState<string[]>(
    userData.stack || [],
  );

  const handleSaveStack = async (newStack: string[]) => {
    const token =
      (session as any)?.user?.accessToken || (session as any)?.accessToken;
    if (!token) return;

    try {
      setIsSending(true);
      const body = {
        ...userData,
        stack: newStack,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userData.id}/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) throw new Error("Error al actualizar el stack");

      setCurrentStack(newStack);
      setIsEditStackOpen(false);
      toast.success("¡Stack actualizado!");
    } catch (error: any) {
      toast.error("Error al guardar stack");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section className="bg-card-bg border border-gray-800 p-6 rounded-2xl text-center shadow-xl relative group">
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-brand-purple bg-background/50 rounded-lg border border-gray-800 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          title="Editar información básica"
        >
          <Edit2 size={16} />
        </button>

        {/* Foto de Perfil */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className="w-full h-full rounded-full bg-background border-2 border-brand-purple/30 flex items-center justify-center overflow-hidden">
            <span className="text-3xl font-bold text-brand-purple uppercase">
              {userData.fullName?.charAt(0)}
            </span>
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-brand-purple rounded-full text-white hover:scale-110 transition-transform shadow-lg cursor-pointer">
            <Camera size={16} />
          </button>
        </div>

        {/* Identidad */}
        <h2 className="text-xl font-bold text-white uppercase tracking-tight">
          {userData.fullName}
        </h2>
        <p className="text-sm text-brand-purple font-medium mb-1 uppercase">
          {userData.roleTarget || "Developer"} • {userData.seniority}
        </p>

        {/* --- DATOS DE CONTACTO --- */}
        <div className="space-y-2 text-left mt-8">
          <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-gray-800/50">
            <Mail size={14} className="text-gray-500" />
            <span className="text-[11px] text-gray-300 truncate">
              {userData.email}
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-gray-800/50">
            <MapPin size={14} className="text-gray-500" />
            <span className="text-[11px] text-gray-300 line-clamp-1">
              {userData.location}
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-gray-800/50">
            <Globe size={14} className="text-gray-500" />
            <span className="text-[11px] text-gray-300">
              Inglés:{" "}
              <span className="text-brand-purple font-semibold">
                {userData.englishLevel}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-gray-800/50">
            <Briefcase size={14} className="text-gray-500" />
            <span className="text-[11px] text-gray-300 uppercase">
              {userData.workPreference}
            </span>
          </div>
        </div>

        {/* --- NUEVA SECCIÓN: STACK TECNOLÓGICO --- */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-left">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
              <Cpu size={14} className="text-brand-purple" />
              <span>Stack</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentStack.length > 0 ? (
              currentStack.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-brand-purple/10 border border-brand-purple/20 text-brand-purple rounded-lg text-[10px] font-bold"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-[10px] text-gray-600 italic">
                No se han añadido tecnologías.
              </p>
            )}
            <button
              onClick={() => setIsEditStackOpen(true)}
              className="px-2 py-1 border border-dashed border-gray-700 text-gray-500 rounded-lg text-[10px] hover:border-brand-purple transition-all cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="flex justify-center gap-4 mt-6 pt-6">
          {userData.portfolioLinks?.linkedin && (
            <a
              href={userData.portfolioLinks.linkedin}
              target="_blank"
              className="text-gray-400 hover:text-brand-purple transition-colors"
            >
              <Linkedin size={18} />
            </a>
          )}
          {userData.portfolioLinks?.github && (
            <a
              href={userData.portfolioLinks.github}
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={18} />
            </a>
          )}
          {userData.portfolioLinks?.portfolio && (
            <a
              href={userData.portfolioLinks.portfolio}
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Globe size={18} />
            </a>
          )}
        </div>
      </section>

      <StackModal
        isOpen={isEditStackOpen}
        onClose={() => setIsEditStackOpen(false)}
        currentStack={currentStack}
        onSave={handleSaveStack}
      />
    </>
  );
}
