"use client";
import {
  Cookie,
  MousePointer2,
  ShieldCheck,
  Settings2,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const CookieSection = ({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="bg-card-bg border border-gray-800 p-6 rounded-2xl space-y-4 hover:border-blue-500/30 transition-all">
    <div className="flex items-center gap-3 text-blue-400 font-bold text-lg italic">
      <Icon size={22} />
      <h2>{title}</h2>
    </div>
    <div className="text-gray-400 text-sm leading-relaxed space-y-3">
      {children}
    </div>
  </section>
);

export default function CookiesPolicy() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 border border-blue-500/20">
              <Cookie size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white italic tracking-tight">
            Política de <span className="text-blue-500">Cookies</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">
            En DepurApp utilizamos cookies para que tu experiencia de
            optimización de CV sea más fluida, segura y personalizada.
          </p>
        </div>

        {/* 1. ¿Qué son? */}
        <CookieSection icon={ShieldCheck} title="¿Qué son las cookies?">
          <p>
            Las cookies son pequeños archivos que los sitios web almacenan en el
            navegador del usuario para mejorar la experiencia de uso.
          </p>
          <p>
            Permiten recordar información sobre tu navegación, como el estado de
            tu sesión, facilitando funcionalidades críticas de la plataforma.
          </p>
        </CookieSection>

        {/* 2. Cómo las usamos */}
        <CookieSection icon={MousePointer2} title="Cómo usamos las cookies">
          <p>DepurApp utiliza cookies técnicas y funcionales para:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
            <li className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              Mantener tu sesión activa
            </li>
            <li className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              Recordar preferencias
            </li>
            <li className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              Mejorar el rendimiento
            </li>
            <li className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              Analizar el uso del sitio
            </li>
          </ul>
        </CookieSection>

        {/* 3. Terceros */}
        <CookieSection icon={Settings2} title="Cookies de terceros">
          <p>
            Algunos servicios integrados en DepurApp pueden utilizar sus propias
            cookies para funcionar correctamente:
          </p>
          <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-xl text-xs space-y-2 italic">
            <p>• Servicios de autenticación (Login).</p>
            <p>• Servicios de infraestructura (Hosting y Base de Datos).</p>
            <p>• Herramientas de análisis de tráfico.</p>
          </div>
        </CookieSection>

        {/* 4. Control de cookies */}
        <CookieSection icon={AlertTriangle} title="Control y configuración">
          <p>
            Puedes configurar tu navegador para bloquear o eliminar cookies
            existentes. Sin embargo, ten en cuenta que:
          </p>
          <p className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl font-medium">
            Desactivar las cookies puede afectar el funcionamiento de partes
            esenciales de DepurApp, como el inicio de sesión o el análisis de
            CV.
          </p>
        </CookieSection>

        {/* 5. Actualizaciones */}
        <CookieSection icon={RefreshCw} title="Cambios en esta política">
          <p>
            DepurApp puede actualizar esta Política de Cookies en cualquier
            momento. Cualquier cambio relevante será publicado inmediatamente en
            esta página.
          </p>
        </CookieSection>

        {/* Botón de Retorno */}
        <div className="flex justify-center pt-8">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold italic"
          >
            Volver al Panel de Control
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        <footer className="text-center py-12 border-t border-gray-900">
          <p className="text-[10px] text-gray-700 uppercase tracking-[0.5em]">
            DepurApp Legal Framework 2026
          </p>
        </footer>
      </div>
    </main>
  );
}
