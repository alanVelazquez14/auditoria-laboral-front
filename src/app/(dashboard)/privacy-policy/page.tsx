"use client";
import { ShieldCheck, Lock, Eye, FileText, Trash2, Mail } from "lucide-react";
import Link from "next/link";

const Section = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
  <section className="bg-card-bg border border-gray-800 p-6 rounded-2xl space-y-4 hover:border-brand-purple/30 transition-colors">
    <div className="flex items-center gap-3 text-brand-purple font-bold text-lg italic">
      <Icon size={22} />
      <h2>{title}</h2>
    </div>
    <div className="text-gray-400 text-sm leading-relaxed space-y-3">
      {children}
    </div>
  </section>
);

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header de la Página */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-extrabold text-white italic tracking-tight">
            Política de <span className="text-brand-purple">Privacidad</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            En DepurApp valoramos y respetamos tu privacidad. Esta política detalla cómo protegemos tu información y cómo la utilizamos para mejorar tu carrera profesional.
          </p>
          <div className="flex justify-center">
             <span className="text-[10px] bg-brand-purple/10 text-brand-purple px-3 py-1 rounded-full border border-brand-purple/20 uppercase tracking-widest font-bold">
               Última actualización: Marzo 2026
             </span>
          </div>
        </div>

        {/* 1. Introducción */}
        <Section icon={ShieldCheck} title="1. Introducción">
          <p>
            Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información que los usuarios proporcionan al utilizar nuestra plataforma.
          </p>
          <p>
            Al utilizar DepurApp, el usuario acepta las prácticas descritas en esta política, diseñada para garantizar un entorno seguro y profesional.
          </p>
        </Section>

        {/* 2. Información que recopilamos */}
        <Section icon={FileText} title="2. Información que recopilamos">
          <p>DepurApp puede recopilar la siguiente información proporcionada voluntariamente por el usuario:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>Nombre o nombre completo.</li>
            <li>Dirección de correo electrónico.</li>
            <li>Curriculum Vitae (CV) cargado en la plataforma.</li>
            <li>Información profesional contenida dentro del CV (experiencia, habilidades, formación, etc.).</li>
          </ul>
        </Section>

        {/* 3 y 4. Uso de Datos e IA */}
        <Section icon={Eye} title="3. Uso de la información e Inteligencia Artificial">
          <p>La información se utiliza únicamente para:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>Analizar el contenido del CV mediante herramientas de IA.</li>
            <li>Generar observaciones y sugerencias estratégicas.</li>
            <li>Mostrar resultados dentro de la plataforma.</li>
          </ul>
          <p className="bg-brand-purple/5 border-l-2 border-brand-purple p-3 italic">
            DepurApp no vende ni comparte información personal con terceros para fines comerciales externos. El procesamiento por IA de terceros se realiza exclusivamente para generar el análisis solicitado.
          </p>
        </Section>

        {/* 5. Protección de la información */}
        <Section icon={Lock} title="4. Protección y Almacenamiento">
          <p>
            Implementamos medidas técnicas razonables para evitar el acceso no autorizado, alteración o pérdida de datos. Los datos se almacenan de forma segura en servicios de infraestructura profesional.
          </p>
          <p className="text-xs text-gray-500">
            Nota: Ningún sistema en internet puede garantizar seguridad absoluta.
          </p>
        </Section>

        {/* 7 y 8. Control y Responsabilidad */}
        <Section icon={Trash2} title="5. Control del Usuario y Responsabilidad">
          <p>
            El usuario puede solicitar en cualquier momento la eliminación de su información, CV o cuenta completa.
          </p>
          <p className="font-bold text-red-400/80">
            Recomendación importante: No incluyas datos sensibles como número de identidad, dirección exacta o datos bancarios en tu CV. El usuario es responsable del contenido que decide subir.
          </p>
        </Section>

        {/* 10. Contacto */}
        <div className="bg-linear-to-r from-brand-purple/20 to-cyan-500/20 p-8 rounded-2xl border border-white/5 text-center space-y-4">
          <Mail className="mx-auto text-white" size={32} />
          <h2 className="text-xl font-bold text-white italic">¿Tienes dudas sobre tus datos?</h2>
          <p className="text-gray-400 text-sm">
            Si tienes preguntas sobre esta política o quieres ejercer tus derechos de eliminación de datos, contáctanos.
          </p>
          <div className="pt-4">
            <Link 
              href="/dashboard" 
              className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors inline-block"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>

        <footer className="text-center pb-12">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            DepurApp © 2026 - Todos los derechos reservados
          </p>
        </footer>
      </div>
    </main>
  );
}