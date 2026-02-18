"use client";
import { useState } from "react";
import { Gitlab } from "lucide-react";
import RegisterForm from "./RegisterForm";
import { LoginForm } from "./LoginForm";

const AuthView = () => {
  const [activeView, setActiveView] = useState("register");

  const socialButtonClasses =
    "w-full p-3 rounded-lg font-medium flex items-center justify-center gap-2 border border-gray-700 bg-[#1a1a24] hover:bg-gray-800 transition-colors";

  return (
    <div className="text-white flex flex-col items-center justify-center">
      <div className="mb-6 w-full flex items-center justify-center gap-5 bg-[#1a1a24] rounded-lg p-2 border border-white/5 md:hidden">
        <button
          onClick={() => setActiveView("register")}
          className={`w-1/2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeView === "register"
              ? "bg-purple-600 text-white"
              : "text-gray-400"
          }`}
        >
          Registrarse
        </button>
        <button
          onClick={() => setActiveView("login")}
          className={`w-1/2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeView === "login" ? "bg-cyan-600 text-white" : "text-gray-400"
          }`}
        >
          Iniciar sesión
        </button>
      </div>

      <div className="max-w-7xl w-full bg-[#12121a]/30 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/5">
        {/* Lado Izquierdo: Registrarse */}
        <div
          className={`w-full md:w-1/2 p-10 md:p-16 space-y-8 border-b md:border-b-0 md:border-r border-white/5 ${activeView === "register" ? "block" : "hidden md:block"}`}
        >
          <h2 className="text-4xl font-bold text-purple-400 mb-2">
            Regístrate
          </h2>
          <p className="text-gray-400 text-lg">
            Crea tu cuenta para empezar a optimizar tu búsqueda.
          </p>

          <RegisterForm />

          <div className="relative flex items-center py-4">
            <div className="grow border-t border-gray-700"></div>
            <span className="shrink mx-4 text-gray-500 text-sm">
              O continúa con
            </span>
            <div className="grow border-t border-gray-700"></div>
          </div>

          <div className="space-y-4">
            <button className={socialButtonClasses}>
              <Gitlab className="text-gray-400" size={20} />
              Google
            </button>
            <button className={socialButtonClasses}>
              <Gitlab className="text-gray-400" size={20} /> GitHub
            </button>
          </div>
        </div>

        {/* Lado Derecho: Iniciar Sesión */}
        <div
          className={`w-full md:w-1/2 p-10 md:p-16 space-y-8 ${activeView === "login" ? "block" : "hidden md:block"}`}
        >
          <h2 className="text-4xl font-bold text-cyan-400 mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-gray-400 text-lg">
            Bienvenido de nuevo, ingresa a tu cuenta.
          </p>

          <LoginForm />

          <div className="relative flex items-center py-4">
            <div className="grow border-t border-gray-700"></div>
            <span className="hrink mx-4 text-gray-500 text-sm">
              O continúa con
            </span>
            <div className="grow border-t border-gray-700"></div>
          </div>

          <div className="space-y-4">
            <button className={socialButtonClasses}>
              <Gitlab className="text-gray-400" size={20} />
              Google
            </button>
            <button className={socialButtonClasses}>
              <Gitlab className="text-gray-400" size={20} />
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
