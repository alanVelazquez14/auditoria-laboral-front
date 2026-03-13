"use client";
import {
  Gavel,
  Info,
  UserCheck,
  Cpu,
  AlertTriangle,
  RefreshCcw,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const TermSection = ({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="bg-card-bg border border-gray-800 p-6 rounded-2xl space-y-4 hover:border-cyan-500/30 transition-colors">
    <div className="flex items-center gap-3 text-cyan-500 font-bold text-lg italic">
      <Icon size={22} />
      <h2>{title}</h2>
    </div>
    <div className="text-gray-400 text-sm leading-relaxed space-y-3">
      {children}
    </div>
  </section>
);

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Términos y <span className="text-cyan-500">Condiciones</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Bienvenido a DepurApp. Estos términos rigen el uso de nuestra
            plataforma y servicios de optimización profesional.
          </p>
        </div>

        {/* 1. Aceptación */}
        <TermSection icon={UserCheck} title="1. Aceptación de los Términos">
          <p>
            Al acceder o utilizar DepurApp, el usuario acepta estos Términos y
            Condiciones de uso. Si el usuario no está de acuerdo con alguna
            parte de estos términos, se recomienda no utilizar la plataforma.
          </p>
        </TermSection>

        {/* 2. Descripción */}
        <TermSection icon={Info} title="2. Descripción del Servicio">
          <p>DepurApp es una plataforma que permite a los usuarios:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>Cargar su Curriculum Vitae (CV).</li>
            <li>
              Analizar su perfil profesional mediante herramientas
              automatizadas.
            </li>
            <li>
              Recibir observaciones y sugerencias para mejorar su perfil
              laboral.
            </li>
          </ul>
        </TermSection>

        {/* 3. Uso Adecuado */}
        <TermSection icon={Gavel} title="3. Uso Adecuado de la Plataforma">
          <p>El usuario se compromete a no:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>Subir contenido ilegal, ofensivo o fraudulento.</li>
            <li>Subir información que no le pertenezca.</li>
            <li>Intentar vulnerar la seguridad de la plataforma.</li>
          </ul>
          <p className="text-xs italic text-cyan-500/70">
            DepurApp se reserva el derecho de suspender o eliminar cuentas que
            incumplan estas condiciones.
          </p>
        </TermSection>

        {/* 5. Análisis Automatizado */}
        <TermSection
          icon={Cpu}
          title="4. Análisis mediante IA y Responsabilidad"
        >
          <p>
            Los análisis generados por DepurApp mediante inteligencia artificial
            son <strong>orientativos</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>No garantizan resultados laborales ni contrataciones.</li>
            <li>No sustituyen asesoramiento profesional especializado.</li>
          </ul>
          <p>
            El usuario es el único responsable de interpretar y decidir cómo
            utilizar las recomendaciones generadas.
          </p>
        </TermSection>

        {/* 6. Limitación de Responsabilidad */}
        <TermSection
          icon={AlertTriangle}
          title="5. Limitación de Responsabilidad"
        >
          <p>DepurApp no se hace responsable por:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>Decisiones laborales tomadas por los usuarios.</li>
            <li>Resultados en procesos de selección externos.</li>
            <li>Interpretaciones incorrectas del análisis generado.</li>
          </ul>
        </TermSection>

        {/* 7 y 8. Modificaciones */}
        <TermSection
          icon={RefreshCcw}
          title="6. Disponibilidad y Modificaciones"
        >
          <p>
            DepurApp no garantiza que el servicio esté libre de interrupciones.
            Podemos realizar actualizaciones o mantenimiento sin previo aviso.
          </p>
          <p>
            Estos términos pueden actualizarse en cualquier momento para
            reflejar mejoras en el servicio.
          </p>
        </TermSection>

        {/* Contacto Final */}
        <div className="bg-card-bg border border-gray-800 p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-cyan-500/10 rounded-full text-cyan-500">
            <MessageSquare size={30} />
          </div>
          <h2 className="text-xl font-bold text-white italic">
            ¿Consultas Legales?
          </h2>
          <p className="text-gray-400 text-sm max-w-md">
            Si tienes dudas sobre estos términos, comunícate con nosotros a
            través de los canales de contacto en la plataforma.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20"
            >
              Entendido
            </Link>
          </div>
        </div>

        <footer className="text-center pb-12">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            DepurApp © 2026 - Mentoría Tech Automatizada
          </p>
        </footer>
      </div>
    </main>
  );
}
