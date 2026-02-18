import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        },
      );

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Respuesta inválida del servidor");
      }

      if (!response.ok)
        throw new Error(data.message || "Error al iniciar sesión");

      localStorage.setItem("token", data.token);
      alert("Login exitoso!");
    } catch (error: any) {
      console.error("Error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const inputClasses =
    "w-full p-3 rounded-lg bg-[#1a1a24] border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-white placeholder-gray-500 transition-colors";
  const buttonClasses =
    "w-full p-3 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95 text-white";

  return (
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
        <a
          href="#"
          className="text-gray-500 hover:text-purple-400 transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>
      <button
        type="submit"
        className={`${buttonClasses} bg-cyan-600 hover:bg-cyan-700 shadow-lg shadow-cyan-500/20 cursor-pointer`}
      >
        Iniciar Sesión
      </button>
    </form>
  );
};
