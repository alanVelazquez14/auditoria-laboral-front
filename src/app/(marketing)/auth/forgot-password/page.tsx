"use client";
import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      if (res.ok) toast.success("Si el email existe, recibirás instrucciones.");
    } catch (error) {
      toast.error("Error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="bg-card-bg border border-gray-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">Recuperar Contraseña</h2>
        <p className="text-gray-400 text-sm mb-6">
          Ingresa tu email para restablecer tu contraseña.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="email"
              required
              className="w-full pl-10 p-3 bg-[#1a1a24] border border-gray-700 rounded-xl text-white focus:border-brand-purple outline-none"
              placeholder="tu@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            disabled={loading}
            className="w-full py-3 bg-brand-purple text-white rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar Instrucciones"}
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
