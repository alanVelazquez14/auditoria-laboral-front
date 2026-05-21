"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { apiClientRequest } from "@/lib/api-client";
import { handleApiError } from "@/utils/error-handler";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Token no válido", { description: "Regresando al login..." });
      router.push("/auth");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Las contraseñas no coinciden");
    }
    if (password.length < 6) {
      return toast.error("Mínimo 6 caracteres");
    }

    try {
      setLoading(true);
      await apiClientRequest("/api/users/reset-password", {
        method: "POST",
        body: { token, newPassword: password },
      });

      setSuccess(true);
      toast.success("Contraseña actualizada");
      setTimeout(() => router.push("/auth"), 3000);
    } catch (error) {
      handleApiError(error, "No pudimos restablecer la contraseña");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-4">
        <CheckCircle2 size={64} className="text-brand-purple" />
        <h1 className="text-2xl font-bold text-white">Todo listo</h1>
        <p className="text-gray-400">Redirigiéndote al inicio de sesión...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-card-bg border border-gray-800 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold text-white mb-2">Nueva contraseña</h1>
      <p className="text-gray-400 text-sm mb-8">
        Ingresa tu nueva clave para DepurApp.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 pl-10 pr-10 rounded-lg bg-[#1a1a24] border border-gray-700 focus:border-brand-purple outline-none text-white transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="w-full p-3 pl-10 rounded-lg bg-[#1a1a24] border border-gray-700 focus:border-brand-purple outline-none text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg font-bold bg-brand-purple hover:bg-[#6d28d9] text-white transition-all disabled:opacity-50"
        >
          {loading ? "Actualizando..." : "Restablecer contraseña"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="mt-10">
      <Suspense fallback={<ResetPasswordLoader />}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}

function ResetPasswordLoader() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-gray-800 border-t-brand-purple rounded-full animate-spin" />
      <p className="text-gray-400 animate-pulse">
        Preparando restablecimiento...
      </p>
    </div>
  );
}
