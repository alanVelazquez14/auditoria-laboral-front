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
  Heart,
  ChevronDown,
  History,
  TrendingUp,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import LogoutModal from "./auth/LogoutModal";

const menuItems = [
  { name: "Inicio", icon: Home, href: "/home" },
  { name: "Postulaciones", icon: FileText, href: "/applications" },
  { name: "Diagnóstico", icon: Activity, href: "/diagnostic" },
  {
    name: "Score",
    icon: BarChart3,
    href: "/score",
    id: "score",
    subMenu: [
      { name: "Score General", icon: BarChart3, href: "/score" },
      { name: "Rendimiento", icon: TrendingUp, href: "/score/performance" },
    ],
  },
  {
    name: "Perfil",
    icon: User,
    href: "/profile",
    id: "profile",
    subMenu: [
      { name: "Mis Datos", icon: User, href: "/profile" },
      { name: "Versiones de CV", icon: History, href: "/profile/cv-history" },
    ],
  },
  { name: "Apoyar el proyecto", icon: Heart, href: "/support" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Manejo de estados independientes para submenús
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    profile: pathname.includes("/profile"),
    score: pathname.includes("/score"),
  });

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <aside className="w-64 h-screen bg-[#0a0a0f] border-r border-white/5 flex flex-col p-6 fixed left-0 top-0 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-purple-600 p-1.5 rounded-lg">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            DepurApp
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.subMenu && pathname.startsWith(item.href));
            const isMenuOpen = item.id ? openMenus[item.id] : false;

            if (item.subMenu) {
              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => item.id && toggleMenu(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer ${
                      isActive
                        ? "bg-purple-600/10 text-purple-400"
                        : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isMenuOpen && (
                    <div className="ml-9 space-y-1 overflow-hidden transition-all">
                      {item.subMenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                            pathname === sub.href
                              ? "text-purple-400 font-semibold"
                              : "text-gray-500 hover:text-gray-300"
                          }`}
                        >
                          <span>{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

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

        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all mt-auto cursor-pointer group"
        >
          <LogOut
            size={20}
            className="group-hover:rotate-12 transition-transform"
          />
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </aside>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => signOut({ callbackUrl: "/auth" })}
      />
    </>
  );
};
