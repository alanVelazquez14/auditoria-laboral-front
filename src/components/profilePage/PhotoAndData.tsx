import {
  Briefcase,
  Camera,
  Edit2,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";

export default function PhotoAndData({
  userData,
  onEdit,
}: {
  userData: any;
  onEdit: () => void;
}) {
  return (
    <section className="bg-card-bg border border-gray-800 p-6 rounded-2xl text-center shadow-xl relative group">
      <button
        onClick={onEdit}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-brand-purple bg-background/50 rounded-lg border border-gray-800 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
        title="Editar información básica"
      >
        <Edit2 size={16} />
      </button>
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className="w-full h-full rounded-full bg-background border-2 border-brand-purple/30 flex items-center justify-center overflow-hidden">
          <span className="text-3xl font-bold text-brand-purple uppercase">
            {userData.fullName?.charAt(0)}
          </span>
        </div>
        <button className="absolute bottom-0 right-0 p-2 bg-brand-purple rounded-full text-white hover:scale-110 transition-transform shadow-lg cursor-pointer">
          <Camera size={16} />
        </button>
      </div>

      {/* Identidad */}
      <h2 className="text-xl font-bold text-white uppercase tracking-tight">
        {userData.fullName}
      </h2>
      <p className="text-sm text-brand-purple font-medium mb-1 uppercase">
        {userData.roleTarget || "Developer"} • {userData.seniority}
      </p>

      {/* Detalles Informativos */}
      <div className="space-y-2 text-left mt-10">
        <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-gray-800/50">
          <Mail size={16} className="text-gray-500" />
          <span className="text-xs text-gray-300 truncate">
            {userData.email}
          </span>
        </div>

        <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-gray-800/50">
          <MapPin size={16} className="text-gray-500" />
          <span className="text-xs text-gray-300 line-clamp-1">
            {userData.location}
          </span>
        </div>

        {/* Nuevo: Nivel de Inglés */}
        <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-gray-800/50">
          <Globe size={16} className="text-gray-500" />
          <span className="text-xs text-gray-300">
            Inglés:{" "}
            <span className="text-brand-purple font-semibold">
              {userData.englishLevel}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-gray-800/50">
          <Briefcase size={16} className="text-gray-500" />
          <span className="text-xs text-gray-300 uppercase">
            Modalidad: {userData.workPreference}
          </span>
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-gray-800">
        {userData.portfolioLinks?.linkedin && (
          <a
            href={userData.portfolioLinks.linkedin}
            target="_blank"
            className="text-gray-400 hover:text-brand-purple transition-colors"
          >
            <Linkedin size={20} />
          </a>
        )}
        {userData.portfolioLinks?.github && (
          <a
            href={userData.portfolioLinks.github}
            target="_blank"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
        )}
        {userData.portfolioLinks?.portfolio && (
          <a
            href={userData.portfolioLinks.portfolio}
            target="_blank"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <Globe size={20} />
          </a>
        )}
      </div>
    </section>
  );
}
