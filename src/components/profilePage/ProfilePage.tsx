"use client";
import PageTransition from "@/components/PageTransition";
import {
  Mail,
  Lock,
  FileText,
  Cpu,
  Camera,
  Globe,
  Linkedin,
  Github,
  MapPin,
  Briefcase,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePage({ userData }: { userData: any }) {
  const [isSending, setIsSending] = useState(false);

  const handleResetPassword = async () => {
    try {
      setIsSending(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userData.email }),
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

  if (!userData)
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
            <section className="bg-card-bg border border-gray-800 p-6 rounded-2xl text-center shadow-xl">
              <div className="relative w-32 h-32 mx-auto mb-4 group">
                <div className="w-full h-full rounded-full bg-background border-2 border-brand-purple/30 flex items-center justify-center overflow-hidden">
                  {/* Aquí iría la foto si existiera, sino mostramos iniciales o icono */}
                  <span className="text-3xl font-bold text-brand-purple uppercase">
                    {userData.fullName?.charAt(0)}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-brand-purple rounded-full text-white hover:scale-110 transition-transform shadow-lg">
                  <Camera size={16} />
                </button>
              </div>

              <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                {userData.fullName}
              </h2>
              <p className="text-sm text-brand-purple font-medium mb-6">
                {userData.roleTarget || "Developer"} •{" "}
                {userData.seniority?.toUpperCase()}
              </p>

              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-gray-800/50">
                  <Mail size={16} className="text-gray-500" />
                  <span className="text-xs text-gray-300 truncate">
                    {userData.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-gray-800/50">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-xs text-gray-300 line-clamp-1">
                    {userData.location}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-gray-800/50">
                  <Briefcase size={16} className="text-gray-500" />
                  <span className="text-xs text-gray-300">
                    Preferencia: {userData.workPreference}
                  </span>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-gray-800">
                {userData.portfolioLinks?.linkedin && (
                  <a
                    href={userData.portfolioLinks.linkedin}
                    target="_blank"
                    className="text-gray-400 hover:text-brand-purple transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {userData.portfolioLinks?.github && (
                  <a
                    href={userData.portfolioLinks.github}
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github size={20} />
                  </a>
                )}
                {userData.portfolioLinks?.portfolio && (
                  <a
                    href={userData.portfolioLinks.portfolio}
                    target="_blank"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Globe size={20} />
                  </a>
                )}
              </div>
            </section>

            <button
              onClick={handleResetPassword}
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2 p-4 bg-gray-800/50 hover:bg-gray-800 text-white rounded-2xl border border-gray-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
            {/* Gestión de Stack Tecnológico */}
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
                {userData.stack?.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-brand-purple/10 border border-brand-purple/20 text-brand-purple rounded-xl text-sm font-semibold"
                  >
                    {skill}
                  </span>
                ))}
                <button className="px-4 py-2 border border-dashed border-gray-700 text-gray-500 rounded-xl text-sm hover:border-brand-purple hover:text-brand-purple transition-all">
                  + Agregar
                </button>
              </div>
            </section>

            {/* Gestión de CV */}
            <section className="bg-card-bg border border-gray-800 p-8 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <FileText size={20} className="text-brand-purple" />
                  <span>Currículum Vitae</span>
                </div>
                {userData.stackMatchesCV ? (
                  <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded-full border border-green-500/20">
                    CV Sincronizado
                  </span>
                ) : (
                  <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full border border-yellow-500/20">
                    CV desactualizado
                  </span>
                )}
              </div>

              {userData.cvUrl ? (
                <div className="p-6 bg-background border border-gray-800 rounded-2xl flex items-center justify-between group hover:border-brand-purple/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-purple/10 rounded-xl">
                      <FileText size={24} className="text-brand-purple" />
                    </div>
                    <div>
                      <p className="text-sm text-white font-semibold truncate max-w-50">
                        Mi Currículum Actual
                      </p>
                      <p className="text-[11px] text-gray-500 uppercase tracking-tighter">
                        Analizado el{" "}
                        {new Date(userData.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <a
                    href={userData.cvUrl}
                    target="_blank"
                    className="px-4 py-2 bg-gray-800 text-xs text-white rounded-lg hover:bg-brand-purple transition-colors"
                  >
                    Ver PDF
                  </a>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-800 rounded-2xl p-10 flex flex-col items-center justify-center">
                  <p className="text-gray-500">No hay CV cargado</p>
                </div>
              )}

              <button className="mt-6 w-full py-4 border-2 border-dashed border-gray-800 rounded-2xl text-gray-400 text-sm font-medium hover:bg-brand-purple/5 hover:border-brand-purple/50 transition-all flex items-center justify-center gap-2">
                Actualizar Archivo CV
              </button>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
