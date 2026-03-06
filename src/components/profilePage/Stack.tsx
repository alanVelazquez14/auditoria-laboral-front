"use client";
import { Cpu } from "lucide-react";
import { useState } from "react";
import StackModal from "./StackModal";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function Stack({ userData }: { userData: any }) {
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
        stack: newStack,
        targetRole: userData.targetRole,
        seniority: userData.seniority,
        yearsExperience: userData.yearsExperience,
        location: userData.location,
        workPreference: userData.workPreference,
        englishLevel: userData.englishLevel,
        cvType: userData.cvType || "LATAM",
        isRoleOptimized: userData.isRoleOptimized,
        stackYears: userData.stackYears,
        stackExperienceType: userData.stackExperienceType,
        recentApplications: userData.recentApplications,
        interviews: userData.interviews,
        recentRejections: userData.recentRejections,
        applicationType: userData.applicationType,
        consentToShareData: true,
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

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del backend:", errorData);
        throw new Error(errorData.message || "Error al actualizar");
      }

      setCurrentStack(newStack);
      setIsEditStackOpen(false);
      toast.success("¡Stack actualizado!");
    } catch (error: any) {
      toast.error("Error al guardar", { description: error.message });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section className="bg-card-bg border border-gray-800 p-8 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Cpu size={20} className="text-brand-purple" />
            <span>Mi Stack Tecnológico</span>
          </div>
          <span className="text-xs text-gray-500">
            Exp: {userData.stackYears}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {currentStack?.map((skill: string) => (
            <span
              key={skill}
              className="px-4 py-2 bg-brand-purple/10 border border-brand-purple/20 text-brand-purple rounded-xl text-sm font-semibold"
            >
              {skill}
            </span>
          ))}
          <button
            onClick={() => setIsEditStackOpen(true)}
            className="px-4 py-2 border border-dashed border-gray-700 text-gray-500 rounded-xl text-sm hover:border-brand-purple hover:text-brand-purple transition-all cursor-pointer"
          >
            + Agregar
          </button>
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
