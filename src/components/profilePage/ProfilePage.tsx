"use client";
import PageTransition from "@/components/PageTransition";
import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PhotoAndData from "./PhotoAndData";
import CV from "./CV";
import BasicInfoModal from "./BasicInfoModal";
import { useSession } from "next-auth/react";

export default function ProfilePage({ userData }: { userData: any }) {
  const { data: session } = useSession();
  const [isSending, setIsSending] = useState(false);
  const [isEditBasicOpen, setIsEditBasicOpen] = useState(false);

  const [profileData, setProfileData] = useState(userData);

  const handleResetPassword = async () => {
    try {
      setIsSending(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: profileData.email }),
        },
      );

      if (!response.ok) throw new Error("No se pudo enviar el correo");

      toast.success("Enlace de seguridad enviado", {
        description: "Revisa tu bandeja de entrada para cambiar tu contraseña.",
      });
    } catch (error) {
      toast.error("Error al procesar la solicitud");
    } finally {
      setIsSending(false);
    }
  };

  const handleUpdateProfile = async (updatedFields: any) => {
    const token =
      (session as any)?.user?.accessToken || (session as any)?.accessToken;
    if (!token) return;

    try {
      setIsSending(true);
      const body = {
        location: updatedFields.location,
        englishLevel: updatedFields.englishLevel,
        seniority: updatedFields.seniority,
        workPreference: updatedFields.workPreference,
        recentApplications: updatedFields.recentApplications,
        stackYears: updatedFields.stackYears,
        applicationType: updatedFields.applicationType,

        targetRole: profileData.targetRole || "fullstack",
        yearsExperience: profileData.yearsExperience || "1-3",
        stack: profileData.stack || [],
        cvType: profileData.cvType || "file",
        isRoleOptimized: profileData.isRoleOptimized || "complete",
        stackExperienceType: profileData.stackExperienceType || [],
        interviews: profileData.interviews || "",
        recentRejections: profileData.recentRejections || "",
        consentToShareData: true,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${profileData.id}/profile`,
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
        const errorMessage = Array.isArray(errorData.message)
          ? errorData.message.join(", ")
          : errorData.message;
        throw new Error(errorMessage || "Error en la validación del servidor");
      }

      setProfileData((prev: any) => ({
        ...prev,
        ...updatedFields,
      }));

      toast.success("¡Perfil actualizado!");
      setIsEditBasicOpen(false);
    } catch (error: any) {
      console.error("Error detallado:", error.message);
      toast.error("Error al guardar", { description: error.message });
    } finally {
      setIsSending(false);
    }
  };

  if (!profileData)
    return <div className="p-8 text-white">Cargando perfil...</div>;

  return (
    <PageTransition>
      <div className="p-8 max-w-8xl">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Mi Perfil
          </h1>
          <p className="text-gray-400 mt-2">
            Gestiona tu identidad laboral y configuración de cuenta.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUMNA IZQUIERDA: Foto y Datos Básicos */}
          <div className="lg:col-span-1 space-y-6">
            <PhotoAndData
              userData={profileData}
              onEdit={() => setIsEditBasicOpen(true)}
            />

            <button
              onClick={handleResetPassword}
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2 p-4 bg-gray-800/50 hover:bg-gray-800 text-white rounded-2xl border border-gray-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSending ? (
                <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <Lock size={16} />
              )}
              {isSending ? "Enviando enlace..." : "Cambiar Contraseña"}
            </button>
          </div>

          {/* COLUMNA DERECHA: Stack y CV */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gestión de CV */}
            <CV userData={profileData} />
          </div>
        </div>
      </div>

      <BasicInfoModal
        isOpen={isEditBasicOpen}
        onClose={() => setIsEditBasicOpen(false)}
        userData={profileData}
        onSave={handleUpdateProfile}
      />
    </PageTransition>
  );
}
