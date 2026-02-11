import { Mail, Lock, User, Gitlab } from "lucide-react";

const AuthView = () => {
  const inputClasses =
    "w-full p-3 rounded-lg bg-[#1a1a24] border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-white placeholder-gray-500 transition-colors";
  const buttonClasses =
    "w-full p-3 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95 text-white";
  const socialButtonClasses =
    "w-full p-3 rounded-lg font-medium flex items-center justify-center gap-2 border border-gray-700 bg-[#1a1a24] hover:bg-gray-800 transition-colors";

  return (
    <div className="text-white flex items-center justify-center">
      <div className="max-w-7xl w-full bg-[#12121a]/30 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/5">
        {/* Lado Izquierdo: Registrarse */}
        <div className="w-full md:w-1/2 p-10 md:p-16 space-y-8 border-b md:border-b-0 md:border-r border-white/5">
          <h2 className="text-4xl font-bold text-purple-400 mb-2">
            Regístrate
          </h2>
          <p className="text-gray-400 text-lg">
            Crea tu cuenta para empezar a optimizar tu búsqueda.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="sr-only">
                Nombre de Usuario
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre de Usuario"
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
                  className={`${inputClasses} pl-10`}
                />
              </div>
            </div>
            <button
              type="submit"
              className={`${buttonClasses} bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20 cursor-pointer`}
            >
              Registrarse
            </button>
          </form>

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
              <Gitlab className="text-gray-400" size={20} />{" "}
              GitHub
            </button>
          </div>
        </div>

        {/* Lado Derecho: Iniciar Sesión */}
        <div className="w-full md:w-1/2 p-10 md:p-16 space-y-8">
          <h2 className="text-4xl font-bold text-cyan-400 mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-gray-400 text-lg">
            Bienvenido de nuevo, ingresa a tu cuenta.
          </p>

          <form className="space-y-6">
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
