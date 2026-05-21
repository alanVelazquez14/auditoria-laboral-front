"use client";

import PageTransition from "@/components/PageTransition";
import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PhotoAndData from "./PhotoAndData";
import CV from "./CV";
import BasicInfoModal from "./BasicInfoModal";
import { useSession } from "next-auth/react";
import { apiClientRequest } from "@/lib/api-client";
import { handleApiError } from "@/utils/error-handler";
import type { BackendUserMe } from "@/types/backend";

export default function ProfilePage({ userData }: { userData: BackendUserMe }) {
  const { data: session } = useSession();
  const [isSending, setIsSending] = useState(false);
  const [isEditBasicOpen, setIsEditBasicOpen] = useState(false);
  const [profileData, setProfileData] = useState(userData);

  const handleResetPassword = async () => {
    try {
      setIsSending(true);

      await apiClientRequest("/api/users/forgot-password", {
        method: "POST",
        body: { email: profileData.email },
      });

      toast.success("Enlace de seguridad enviado", {
        description: "Revisa tu bandeja de entrada para cambiar tu contraseña.",
      });
    } catch (error) {
      handleApiError(error, "Error al procesar la solicitud");
    } finally {
      setIsSending(false);
    }
  };

  const handleUpdateProfile = async (updatedFields: Partial<BackendUserMe>) => {
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

      await apiClientRequest("/api/users/me/profile", {
        method: "PATCH",
        auth: true,
        session,
        body,
      });

      setProfileData((prev) => ({
        ...prev,
        ...updatedFields,
      }));

      toast.success("Perfil actualizado");
      setIsEditBasicOpen(false);
    } catch (error) {
      handleApiError(error, "Error al guardar");
    } finally {
      setIsSending(false);
    }
  };

  if (!profileData) {
    return <div className="p-8 text-white">Cargando perfil...</div>;
  }

  return (
    <PageTransition>
      <div className="p-8 max-w-8xl">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Mi perfil
          </h1>
          <p className="text-gray-400 mt-2">
            Gestiona tu identidad laboral y configuración de cuenta.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              {isSending ? "Enviando enlace..." : "Cambiar contraseña"}
            </button>
          </div>

          <div className="lg:col-span-2 space-y-6">
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
