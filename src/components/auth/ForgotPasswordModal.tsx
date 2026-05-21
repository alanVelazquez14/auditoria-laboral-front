import { X, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { apiClientRequest } from "@/lib/api-client";
import { handleApiError } from "@/utils/error-handler";

export const ForgotPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    try {
      setLoading(true);

      await apiClientRequest("/api/users/forgot-password", {
        method: "POST",
        body: { email: email.toLowerCase().trim() },
      });

      toast.success("Enlace enviado", {
        description:
          "Si el correo está registrado, recibirás instrucciones en unos minutos.",
        style: {
          background: "#121217",
          color: "#fff",
          border: "1px solid #7c3aed30",
        },
      });
      onClose();
    } catch (error: any) {
      handleApiError(error, "Hubo un problema");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card-bg border border-gray-800 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Recuperar contraseña</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-6">
          Ingresa tu correo electrónico y te enviaremos las instrucciones para
          restablecer tu cuenta.
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
              placeholder="tu@email.com"
              className="w-full p-3 pl-10 rounded-lg bg-[#1a1a24] border border-gray-700 focus:border-brand-purple outline-none text-white cursor-pointer"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-lg font-bold bg-brand-purple hover:bg-[#6d28d9] text-white transition-all shadow-lg shadow-purple-500/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Enviar instrucciones"}
          </button>
        </form>
      </div>
    </div>
  );
};
