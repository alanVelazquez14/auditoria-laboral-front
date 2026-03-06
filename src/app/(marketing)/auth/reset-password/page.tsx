"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link"; // Asegurate de importar el Link de next/link, no de lucide-react

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Las contraseñas no coinciden");
    }

    if (!token) {
      return toast.error("Token de recuperación no encontrado");
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword: password }),
        },
      );

      if (res.ok) {
        toast.success("¡Contraseña actualizada con éxito!");
        router.push("/auth");
      } else {
        const data = await res.json();
        toast.error(data.message || "El link expiró o es inválido.");
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 text-white">
      <div className="bg-card-bg border border-gray-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Nueva Contraseña
          </h2>
          <p className="text-gray-400 text-sm">
            Estás a un paso de recuperar tu cuenta. Ingresá tu nueva clave.
          </p>
        </header>

        <form onSubmit={handleReset} className="space-y-4">
          {/* Nueva Contraseña */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="password"
              required
              minLength={6}
              className="w-full pl-10 p-3 bg-[#1a1a24] border border-gray-700 rounded-xl text-white focus:border-brand-purple outline-none transition-all"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirmar Contraseña */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="password"
              required
              className="w-full pl-10 p-3 bg-[#1a1a24] border border-gray-700 rounded-xl text-white focus:border-brand-purple outline-none transition-all"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !token}
            className="w-full py-3 bg-brand-purple text-white rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-purple/20"
          >
            {loading ? "Actualizando..." : "Restablecer Contraseña"}
          </button>
        </form>

        <Link
          href="/auth"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Volver al login
        </Link>
      </div>
    </div>
  );
}
