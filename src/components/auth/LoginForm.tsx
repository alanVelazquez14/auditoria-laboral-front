import { useState } from "react";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { handleApiError } from "@/utils/error-handler";

export const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: loginData.email.toLowerCase().trim(),
      password: loginData.password,
    });

    if (result?.error) {
      handleApiError(result.error, "Error de acceso");
      setLoading(false);
    } else {
      toast.success("¡Bienvenido de nuevo!");
      router.push("/home");
      router.refresh();
    }
  };

  const inputClasses =
    "w-full p-3 rounded-lg bg-[#1a1a24] border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-white placeholder-gray-500 transition-colors";
  const buttonClasses =
    "w-full p-3 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95 text-white flex items-center justify-center gap-2";

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email_login" className="sr-only">
            Correo Electrónico
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="email"
              id="email_login"
              placeholder="Correo Electrónico"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className={`${inputClasses} pl-10`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password_login" className="sr-only">
            Contraseña
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="password"
              id="password_login"
              placeholder="Contraseña"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className={`${inputClasses} pl-10`}
            />
          </div>
        </div>
        <div className="flex justify-end text-sm">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-gray-500 hover:text-purple-400 transition-colors cursor-pointer"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`${buttonClasses} shadow-lg shadow-cyan-500/20 cursor-pointer group`}
          style={{ backgroundColor: loading ? "#334155" : "#0891b2" }}
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <LogIn
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          )}
          {loading ? "Iniciando..." : "Iniciar Sesión"}
        </button>
      </form>
      {isModalOpen && (
        <ForgotPasswordModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};
