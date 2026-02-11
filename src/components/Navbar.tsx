"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth";

  return (
    <div className="top-0 p-8 flex justify-between items-center w-full max-w-7xl">
      <div className="flex items-center gap-2">
        <div className="bg-purple-600 p-1.5 rounded-lg">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <span className="font-bold text-xl">DepurApp</span>
      </div>

      <div className="flex gap-5">
        {isAuthPage ? (
          <Link
            href="/"
            className="text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg transition font-bold hover:bg-purple-600"
          >
            Inicio
          </Link>
        ) : (
          <Link
            href="/auth"
            className="text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg transition font-bold hover:bg-cyan-600"
          >
            Ingresar
          </Link>
        )}
      </div>
    </div>
  );
}
