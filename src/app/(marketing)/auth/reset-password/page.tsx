"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token"); // Capturamos el ?token=...

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
      return toast.error("La contraseña debe tener al menos 6 caracteres");
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword: password }),
        },
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Error al restablecer");

      setSuccess(true);
      toast.success("¡Contraseña actualizada!");

      setTimeout(() => router.push("/auth"), 3000);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in zoom-in duration-300">
        <CheckCircle2 size={64} className="text-brand-purple" />
        <h1 className="text-2xl font-bold text-white">¡Todo listo!</h1>
        <p className="text-gray-400">
          Tu contraseña ha sido actualizada. <br /> Redirigiéndote al inicio de
          sesión...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-card-bg border border-gray-800 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold text-white mb-2">Nueva contraseña</h1>
      <p className="text-gray-400 text-sm mb-8">
        Ingresa tu nueva clave para acceder a tu cuenta de DepurApp.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Input Contraseña */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nueva contraseña"
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

          {/* Input Confirmar */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="w-full p-3 pl-10 rounded-lg bg-[#1a1a24] border border-gray-700 focus:border-brand-purple outline-none text-white transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg font-bold bg-brand-purple hover:bg-[#6d28d9] text-white transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Actualizando..." : "Restablecer contraseña"}
        </button>
      </form>
    </div>
  );
}
