"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Activity,
  BarChart3,
  User,
  LogOut,
  Zap,
} from "lucide-react";

const menuItems = [
  { name: "Inicio", icon: Home, href: "/home" },
  { name: "Postulaciones", icon: FileText, href: "/applications" },
  { name: "Diagnóstico", icon: Activity, href: "/diagnostic" },
  { name: "Score", icon: BarChart3, href: "/score" },
  { name: "Perfil", icon: User, href: "/profile" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  return (
    <aside className="w-64 h-screen bg-[#0a0a0f] border-r border-white/5 flex flex-col p-6 fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="bg-purple-600 p-1.5 rounded-lg">
          <Zap size={20} className="text-white fill-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">
          DepurApp
        </span>
      </div>

      {/* Navegación */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-purple-600/10 text-purple-400"
                  : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
              }`}
            >
              <item.icon
                size={20}
                className={
                  isActive ? "text-purple-400" : "group-hover:text-gray-300"
                }
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Botón Salir */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-400 transition-colors mt-auto"
      >
        <LogOut size={20} />
        <span className="font-medium">Cerrar sesión</span>
      </button>
    </aside>
  );
};
