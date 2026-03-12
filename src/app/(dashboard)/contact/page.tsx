"use client";
import { Mail, MessageSquare, Globe, ArrowRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";

const ContactCard = ({ icon: Icon, title, detail, link, label }: { icon: any, title: string, detail: string, link: string, label: string }) => (
  <div className="bg-card-bg border border-gray-800 p-8 rounded-3xl hover:border-brand-purple/40 transition-all group flex flex-col h-full">
    <div className="w-12 h-12 bg-brand-purple/10 rounded-2xl flex items-center justify-center mb-6">
      <Icon className="text-brand-purple" size={24} />
    </div>
    <h3 className="text-white font-bold text-xl mb-2 italic">{title}</h3>
    <p className="text-gray-500 text-sm mb-6 grow">{detail}</p>
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-brand-purple font-bold text-sm hover:gap-3 transition-all"
    >
      {label} <ArrowRight size={16} />
    </a>
  </div>
);

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header con estilo Dashboard */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <span className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold">
              Support Center
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-white italic tracking-tighter">
            Hablemos de tu <span className="text-brand-purple">Futuro</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            ¿Tienes dudas sobre los términos, sugerencias para el motor de IA o simplemente quieres saludarnos? Estamos aquí para ayudarte a optimizar tu camino profesional.
          </p>
        </div>

        {/* Grid de Medios de Contacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactCard 
            icon={Mail}
            title="Correo Electrónico"
            detail="Para consultas legales, problemas técnicos o soporte directo sobre tu cuenta."
            link="mailto:soporte@depurapp.com"
            label="soporte@depurapp.com"
          />
          <ContactCard 
            icon={MessageSquare}
            title="Redes Sociales"
            detail="Síguenos para tips de CV, actualizaciones del algoritmo y novedades del mundo tech."
            link="https://linkedin.com"
            label="Conectar en LinkedIn"
          />
        </div>

        {/* Sección Inferior: Comunidad */}
        <div className="bg-[#11111a] border border-gray-800 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white italic">Únete a la comunidad</h2>
            <p className="text-gray-500 text-sm">Feedback directo y transparencia en el desarrollo.</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors text-white">
              <Github size={20} />
            </a>
            <a href="#" className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors text-white">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors text-white">
              <Globe size={20} />
            </a>
          </div>
        </div>

        {/* Footer simple */}
        <div className="text-center pt-8">
          <Link 
            href="/dashboard" 
            className="text-gray-600 hover:text-brand-purple text-xs uppercase tracking-widest transition-colors"
          >
            ← Volver al Panel de Control
          </Link>
          <p className="text-[9px] text-gray-800 uppercase tracking-[0.4em] mt-12">
            DepurApp Deployment 2026_V1
          </p>
        </div>

      </div>
    </main>
  );
}