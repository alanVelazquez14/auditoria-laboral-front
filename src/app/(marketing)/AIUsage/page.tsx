"use client";
import { BrainCircuit, Cpu, Zap, Search, ShieldAlert, Layers } from "lucide-react";
import Link from "next/link";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-[#11111a] border border-gray-800 p-6 rounded-2xl hover:border-brand-purple/40 transition-all group">
    <div className="w-12 h-12 bg-brand-purple/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="text-brand-purple" size={24} />
    </div>
    <h3 className="text-white font-bold mb-2 italic">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default function AIUsage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-purple/10 border border-brand-purple/20 px-4 py-1.5 rounded-full text-brand-purple text-xs font-bold uppercase tracking-widest mb-4">
            <BrainCircuit size={14} />
            Powered by AI Engine
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            Uso de <span className="text-brand-purple">Inteligencia Artificial</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            DepurApp utiliza modelos de lenguaje avanzados para desglosar tu perfil profesional y optimizarlo para los estándares actuales de reclutamiento (ATS).
          </p>
        </div>

        {/* Grid de Funcionamiento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Search} 
            title="Escaneo Profundo"
            description="Procesamos automáticamente el texto de tu CV buscando patrones de experiencia, habilidades y formación académica."
          />
          <FeatureCard 
            icon={Layers} 
            title="Análisis de Estructura"
            description="Evaluamos si la arquitectura de tu información es legible para los algoritmos de filtrado de las empresas."
          />
          <FeatureCard 
            icon={Zap} 
            title="Sugerencias Instantáneas"
            description="Generamos recomendaciones estratégicas para fortalecer tus puntos débiles y resaltar tus logros."
          />
        </div>

        {/* Sección de Limitaciones y Responsabilidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card-bg border border-gray-800 p-8 rounded-3xl space-y-4">
            <div className="flex items-center gap-3 text-yellow-500 font-bold italic">
              <ShieldAlert size={24} />
              <h2>Limitaciones del Análisis</h2>
            </div>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex gap-2">
                <span className="text-yellow-500">•</span>
                Los análisis son automatizados y pueden contener imprecisiones.
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-500">•</span>
                Deben interpretarse como recomendaciones orientativas, no verdades absolutas.
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-500">•</span>
                DepurApp no garantiza resultados laborales ni éxito en procesos de selección.
              </li>
            </ul>
          </div>

          <div className="bg-card-bg border border-gray-800 p-8 rounded-3xl space-y-4">
            <div className="flex items-center gap-3 text-cyan-500 font-bold italic">
              <Cpu size={24} />
              <h2>Servicios de Terceros</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Para realizar este análisis de alto nivel, DepurApp utiliza servicios de IA de terceros. 
            </p>
            <p className="text-gray-400 text-sm leading-relaxed italic border-l-2 border-cyan-500 pl-4">
              El procesamiento de datos se realiza únicamente con el propósito de generar tu reporte. No compartimos tus datos para fines comerciales.
            </p>
          </div>
        </div>

        {/* Footer de la página */}
        <div className="text-center pt-8 space-y-6">
          <p className="text-gray-500 text-sm italic">
            "La IA es tu copiloto, pero tú eres el capitán de tu carrera profesional."
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/" 
              className="bg-brand-purple hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20"
            >
              Ingresar para Análisis de CV
            </Link>
          </div>
          <p className="text-[10px] text-gray-700 uppercase tracking-[0.2em] pt-8">
            Sistema de Auditoría de Talento v1.0
          </p>
        </div>
      </div>
    </main>
  );
}