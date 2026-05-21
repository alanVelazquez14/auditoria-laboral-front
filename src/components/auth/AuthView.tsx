"use client";

import { useState } from "react";
import RegisterForm from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import { signIn } from "next-auth/react";

const AuthView = () => {
  const [activeView, setActiveView] = useState("register");
  const isGoogleAuthEnabled =
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/home" });
  };

  const socialButtonClasses =
    "w-full p-3 rounded-lg font-medium flex items-center justify-center gap-2 border border-gray-700 bg-[#1a1a24] hover:bg-gray-800 transition-colors";

  return (
    <div className="text-white flex flex-col items-center justify-center mb-10">
      <div className="mb-6 w-full flex items-center justify-center gap-5 bg-[#1a1a24] rounded-lg p-2 border border-white/5 md:hidden">
        <button
          onClick={() => setActiveView("register")}
          className={`w-1/2 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
            activeView === "register"
              ? "bg-purple-600 text-white"
              : "text-gray-400"
          }`}
        >
          Registrarse
        </button>
        <button
          onClick={() => setActiveView("login")}
          className={`w-1/2 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
            activeView === "login" ? "bg-cyan-600 text-white" : "text-gray-400"
          }`}
        >
          Iniciar sesión
        </button>
      </div>

      <div className="max-w-7xl w-full bg-[#12121a]/30 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/5">
        <div
          className={`w-full md:w-1/2 p-10 md:p-16 space-y-8 border-b md:border-b-0 md:border-r border-white/5 ${
            activeView === "register" ? "block" : "hidden md:block"
          }`}
        >
          <h2 className="text-4xl font-bold text-purple-400 mb-2">
            Regístrate
          </h2>
          <p className="text-gray-400 text-lg">
            Crea tu cuenta para empezar a optimizar tu búsqueda.
          </p>

          <RegisterForm />

          <div className="relative flex items-center py-4">
            <div className="grow border-t border-gray-700" />
            <span className="shrink mx-4 text-gray-500 text-sm">
              O continúa con
            </span>
            <div className="grow border-t border-gray-700" />
          </div>

          {isGoogleAuthEnabled && (
            <div className="space-y-4">
              <button
                onClick={() => handleSocialLogin("google")}
                className={`${socialButtonClasses} cursor-pointer`}
              >
                <img
                  src="https://authjs.dev/img/providers/google.svg"
                  className="w-5 h-5"
                  alt="Google"
                />
                Google
              </button>
            </div>
          )}
        </div>

        <div
          className={`w-full md:w-1/2 p-10 md:p-16 space-y-8 ${
            activeView === "login" ? "block" : "hidden md:block"
          }`}
        >
          <h2 className="text-4xl font-bold text-cyan-400 mb-2">
            Iniciar sesión
          </h2>
          <p className="text-gray-400 text-lg">
            Bienvenido de nuevo, ingresa a tu cuenta.
          </p>

          <LoginForm />

          <div className="relative flex items-center py-4">
            <div className="grow border-t border-gray-700" />
            <span className="shrink mx-4 text-gray-500 text-sm">
              O continúa con
            </span>
            <div className="grow border-t border-gray-700" />
          </div>

          {isGoogleAuthEnabled && (
            <div className="space-y-4">
              <button
                onClick={() => handleSocialLogin("google")}
                className={`${socialButtonClasses} cursor-pointer`}
              >
                <img
                  src="https://authjs.dev/img/providers/google.svg"
                  className="w-5 h-5"
                  alt="Google"
                />
                Google
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthView;
