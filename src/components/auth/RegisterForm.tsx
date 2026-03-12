import { useState } from "react";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { toast } from "sonner";

interface RegisterFormProps {
  onSuccess?: (userId: string) => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const initialState = {
    fullName: "",
    email: "",
    password: "",
  };
  const [registerData, setRegisterData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Error al registrarse");
        return;
      }

      toast.success("¡Cuenta creada con éxito!", {
        description: "Ahora puedes ingresar con tus credenciales.",
      });

      setRegisterData(initialState);

      if (onSuccess) onSuccess(data.id);
    } catch (error: any) {
      setErrorMessage(error.message || "Error inesperado");
      toast.error("Hubo un problema con el registro");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses =
    "w-full p-3 rounded-lg bg-[#1a1a24] border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-white placeholder-gray-500 transition-colors";
  const buttonClasses =
    "w-full p-3 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95 text-white flex items-center justify-center gap-2";

  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="fullName" className="sr-only">
          Nombre completo
        </label>
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            id="fullName"
            placeholder="Nombre completo"
            value={registerData.fullName}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                fullName: e.target.value,
              })
            }
            className={`${inputClasses} pl-10`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email_register" className="sr-only">
          Correo Electrónico
        </label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="email"
            id="email_register"
            placeholder="Correo Electrónico"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
            className={`${inputClasses} pl-10`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="password_register" className="sr-only">
          Contraseña
        </label>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="password"
            id="password_register"
            placeholder="Contraseña"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                password: e.target.value,
              })
            }
            className={`${inputClasses} pl-10`}
          />
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>
      <button
        type="submit"
        onClick={handleRegister}
        className={`${buttonClasses} bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20 cursor-pointer group`}
      >
        <UserPlus
          size={18}
          className="group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
        />
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
