"use client";

interface Props {
  portfolioLinks: { portfolio: string; linkedin: string; github: string };
  setPortfolioLinks: (value: {
    portfolio: string;
    linkedin: string;
    github: string;
  }) => void;
  linkStatus: {
    portfolio: "yes" | "no" | null;
    linkedin: "yes" | "no" | "unknown" | null;
    github: "yes" | "no" | "unknown" | null;
  };
  setLinkStatus: (value: {
    portfolio: "yes" | "no" | null;
    linkedin: "yes" | "no" | "unknown" | null;
    github: "yes" | "no" | "unknown" | null;
  }) => void;
}

export default function StepNetworks({
  portfolioLinks,
  setPortfolioLinks,
  linkStatus,
  setLinkStatus,
}: Props) {
  const inputClasses =
    "w-full bg-[#1a1a24] border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none transition-all";

  const buttonClasses = (selected: boolean) =>
    `px-4 py-2 rounded-xl border transition-all ${
      selected
        ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
        : "bg-[#111118] border-white/10 text-gray-400 hover:border-purple-500/50"
    }`;

  const handleLinkChange = (
    field: keyof typeof portfolioLinks,
    value: string,
  ) => {
    setPortfolioLinks({ ...portfolioLinks, [field]: value });
  };

  const handleStatusChange = (
    field: keyof typeof linkStatus,
    value: "yes" | "no" | "unknown",
  ) => {
    setLinkStatus({ ...linkStatus, [field]: value });
    if (field === "portfolio" && value === "no") handleLinkChange(field, "");
  };

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold text-white">
        Redes y Presencia Profesional
      </h2>

      <div className="space-y-6">
        {/* Portfolio */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">
            ¿Cuentas con un portfolio donde mostrar tus proyectos?
          </h3>
          <div className="flex gap-4 mb-2">
            {["yes", "no"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => handleStatusChange("portfolio", status as any)}
                className={buttonClasses(linkStatus.portfolio === status)}
              >
                {status === "yes" ? "Sí" : "No"}
              </button>
            ))}
          </div>
          {linkStatus.portfolio === "yes" && (
            <input
              type="text"
              placeholder="Ingresá el link del portfolio"
              value={portfolioLinks.portfolio}
              onChange={(e) => handleLinkChange("portfolio", e.target.value)}
              className={inputClasses}
            />
          )}
        </div>

        {/* LinkedIn */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">
            ¿Tu perfil de LinkedIn está optimizado?
          </h3>
          <div className="flex gap-4 mb-2">
            {["yes", "no", "unknown"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => handleStatusChange("linkedin", status as any)}
                className={buttonClasses(linkStatus.linkedin === status)}
              >
                {status === "yes"
                  ? "Sí"
                  : status === "no"
                    ? "No"
                    : "Desconozco"}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Ingresá el link de LinkedIn"
            value={portfolioLinks.linkedin}
            onChange={(e) => handleLinkChange("linkedin", e.target.value)}
            className={inputClasses}
          />
        </div>

        {/* GitHub */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">
            ¿Tu cuenta de GitHub está optimizada?
          </h3>
          <div className="flex gap-4 mb-2">
            {["yes", "no", "unknown"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => handleStatusChange("github", status as any)}
                className={buttonClasses(linkStatus.github === status)}
              >
                {status === "yes"
                  ? "Sí"
                  : status === "no"
                    ? "No"
                    : "Desconozco"}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Ingresá el link de GitHub"
            value={portfolioLinks.github}
            onChange={(e) => handleLinkChange("github", e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="bg-[#1a1a24] p-4 rounded-xl border border-white/5">
        <p className="text-purple-400/80 text-[15px] text-center">
          Un portfolio actualizado, un LinkedIn optimizado y un GitHub activo
          muestran tu profesionalismo y tus proyectos de manera concreta.
        </p>
      </div>
    </div>
  );
}
