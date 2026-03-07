"use client";
import { LogOut, X } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card-bg border border-white/10 w-full max-w-sm rounded-2xl shadow-2xl animate-in zoom-in duration-200">
        <div className="p-6 text-center">
          <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="text-red-500" size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">¿Cerrar sesión?</h3>
          <p className="text-gray-400 text-sm mb-8">
            Tendrás que volver a ingresar tus credenciales para acceder a tu
            perfil.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={onConfirm}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all active:scale-95 cursor-pointer"
            >
              Sí, cerrar sesión
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 bg-transparent text-gray-400 hover:text-white transition-colors text-sm font-medium cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
