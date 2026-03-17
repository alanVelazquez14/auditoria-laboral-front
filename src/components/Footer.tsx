"use client";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800/50 pt-16 pb-8 w-full">
      <div className="w-full px-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Marca */}
          <div className="col-span-1 md:col-span-2 space-y-4">
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
              <span className="font-bold text-xl text-white">DepurApp</span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Toma el control de tu búsqueda laboral. Registra tus aplicaciones
              y mejora tu empleabilidad con análisis de CV y asesoría
              inteligente basada en datos.
            </p>
          </div>

          {/* Plataforma */}
          <div className="md:pl-10">
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Plataforma
            </h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-brand-purple transition-colors"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/analisis"
                  className="hover:text-brand-purple transition-colors"
                >
                  Análisis de CV
                </Link>
              </li>

              <li>
                <Link
                  href="/AIUsage"
                  className="hover:text-brand-purple transition-colors italic flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-brand-purple rounded-full"></span>
                  Uso de IA
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:pl-5">
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Legal
            </h3>

            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacidad
                </Link>
              </li>

              <li>
                <Link
                  href="/TermsAndConditions"
                  className="hover:text-white transition-colors"
                >
                  Términos
                </Link>
              </li>

              <li>
                <Link
                  href="/cookies"
                  className="hover:text-white transition-colors"
                >
                  Cookies
                </Link>
              </li>

              <li>
                <Link
                  href="/AIUsage"
                  className="hover:text-white transition-colors"
                >
                  Uso de IA
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:pl-5">
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Contacto
            </h3>

            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Soporte técnico
                </Link>
              </li>

              <li className="flex gap-4 pt-2">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-brand-purple transition-colors"
                >
                  <Github size={20} />
                </a>

                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-brand-purple transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-gray-300 text-[12px] uppercase text-center">
            © {currentYear} DepurApp. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
