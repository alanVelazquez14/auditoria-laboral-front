"use client";

import { useState } from "react";
import { ChevronLeft, ArrowRight } from "lucide-react";
import StepLocation from "./StepLocation";
import StepCV from "./StepCV";
import StepSeniority from "./StepSeniority";
import StepStack from "./StepStack";
import StepApplicationStrategy from "./StepApplicationStrategy";
import StepFinal from "./StepFinal";
import StepNetworks from "./StepNetworks";

export default function ProfileWizard() {
  const [step, setStep] = useState(1);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<{
    location: string;
    seniority: string;
    targetRole: string;
    yearsExperience: string;
    applicationType: string[];
    recentApplications: string;
    interviews: string;
    recentRejections: string;
    isRoleOptimized: "complete" | "partial" | "no" | null;
    workPreference: "REMOTO" | "PRESENCIAL" | "HIBRIDO" | null;
    englishLevel: "Básico" | "Intermedio" | "Avanzado" | "Nativo" | null;
    stack: string[];
    stackYears: string;
    stackExperienceType: string[];
    stackMatchesCV: boolean | null;
    portfolioLinks: { portfolio: string; linkedin: string; github: string };
    linkStatus: {
      portfolio: "yes" | "no" | null;
      linkedin: "yes" | "no" | "unknown" | null;
      github: "yes" | "no" | "unknown" | null;
    };
    consentToShareData: boolean | null;
    additionalNotes: string;
  }>({
    location: "",
    seniority: "",
    targetRole: "",
    yearsExperience: "",
    applicationType: [],
    recentApplications: "",
    interviews: "",
    recentRejections: "",
    isRoleOptimized: null,
    workPreference: null,
    englishLevel: null,
    stack: [],
    stackYears: "",
    stackExperienceType: [],
    stackMatchesCV: null,
    portfolioLinks: { portfolio: "", linkedin: "", github: "" },
    linkStatus: { portfolio: null, linkedin: null, github: null },
    consentToShareData: null,
    additionalNotes: "",
  });

  const nextStep = async () => {
    if (!isStepValid()) return;

    if (step === 7) {
      await handleFinish();
    } else {
      setStep((prev) => Math.min(prev + 1, 7));
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepCV
            cvFile={cvFile}
            setCvFile={setCvFile}
            isRoleOptimized={formData.isRoleOptimized}
            setIsRoleOptimized={(value) =>
              setFormData({ ...formData, isRoleOptimized: value })
            }
          />
        );

      case 2:
        return (
          <StepLocation
            value={formData.location}
            onChange={(value: string) =>
              setFormData({ ...formData, location: value })
            }
            workPreference={formData.workPreference}
            setWorkPreference={(value) =>
              setFormData({ ...formData, workPreference: value })
            }
            englishLevel={formData.englishLevel}
            setEnglishLevel={(value) =>
              setFormData({ ...formData, englishLevel: value })
            }
          />
        );

      case 3:
        return (
          <StepSeniority
            targetRole={formData.targetRole}
            setTargetRole={(value) =>
              setFormData((prev) => ({ ...prev, targetRole: value }))
            }
            seniority={formData.seniority}
            setSeniority={(value) =>
              setFormData((prev) => ({ ...prev, seniority: value }))
            }
            yearsExperience={formData.yearsExperience}
            setYearsExperience={(value) =>
              setFormData((prev) => ({ ...prev, yearsExperience: value }))
            }
            recommendedSeniority={getRecommendedSeniority()}
            isCoherent={isExperienceCoherent()}
          />
        );

      case 4:
        return (
          <StepStack
            stack={formData.stack}
            setStack={(value) =>
              setFormData((prev) => ({ ...prev, stack: value }))
            }
            stackYears={formData.stackYears}
            setStackYears={(value) =>
              setFormData((prev) => ({ ...prev, stackYears: value }))
            }
            stackExperienceType={formData.stackExperienceType}
            setStackExperienceType={(value) =>
              setFormData((prev) => ({ ...prev, stackExperienceType: value }))
            }
            stackMatchesCV={formData.stackMatchesCV}
            setStackMatchesCV={(value) =>
              setFormData((prev) => ({ ...prev, stackMatchesCV: value }))
            }
          />
        );

      case 5:
        return (
          <StepApplicationStrategy
            recentApplications={formData.recentApplications}
            setRecentApplications={(value) =>
              setFormData((prev) => ({ ...prev, recentApplications: value }))
            }
            interviews={formData.interviews}
            setInterviews={(value) =>
              setFormData((prev) => ({ ...prev, interviews: value }))
            }
            recentRejections={formData.recentRejections}
            setRecentRejections={(value) =>
              setFormData((prev) => ({ ...prev, recentRejections: value }))
            }
            applicationType={formData.applicationType}
            setApplicationType={(value) =>
              setFormData((prev) => ({ ...prev, applicationType: value }))
            }
          />
        );

      case 6:
        return (
          <StepNetworks
            portfolioLinks={formData.portfolioLinks}
            setPortfolioLinks={(value) =>
              setFormData((prev) => ({ ...prev, portfolioLinks: value }))
            }
            linkStatus={formData.linkStatus}
            setLinkStatus={(value) =>
              setFormData((prev) => ({ ...prev, linkStatus: value }))
            }
          />
        );

      case 7:
        return (
          <StepFinal
            consentToShareData={formData.consentToShareData}
            setConsentToShareData={(value) =>
              setFormData((prev) => ({ ...prev, consentToShareData: value }))
            }
            additionalNotes={formData.additionalNotes}
            setAdditionalNotes={(value) =>
              setFormData((prev) => ({ ...prev, additionalNotes: value }))
            }
          />
        );
    }
  };

  const getRecommendedSeniority = () => {
    const { yearsExperience } = formData;

    if (!yearsExperience) return null;

    const map: Record<string, string> = {
      "0-1": "Trainee",
      "1-3": "Junior",
      "3-5": "Semi Senior",
      "5+": "Senior",
    };

    return map[yearsExperience] || null;
  };

  const isExperienceCoherent = () => {
    const recommended = getRecommendedSeniority();
    if (!recommended || !formData.seniority) return true;

    return formData.seniority === recommended;
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return cvFile !== null && formData.isRoleOptimized !== null;

      case 2:
        return (
          formData.location?.trim().length > 0 &&
          formData.workPreference !== null &&
          formData.englishLevel !== null
        );

      case 3:
        return (
          formData.targetRole?.trim() !== "" &&
          formData.seniority !== "" &&
          formData.yearsExperience !== ""
        );

      case 4:
        return (
          formData.stack.length > 0 &&
          formData.stackYears !== "" &&
          formData.stackExperienceType.length > 0 &&
          formData.stackMatchesCV !== null
        );

      case 5:
        return (
          formData.recentApplications.length > 0 &&
          formData.applicationType.length > 0
        );

      case 6:
        const { portfolio, linkedin, github } = formData.portfolioLinks;
        const { linkStatus } = formData;

        return (
          (linkStatus.portfolio !== "yes" || portfolio.trim() !== "") &&
          (linkStatus.linkedin !== "yes" || linkedin.trim() !== "") &&
          (linkStatus.github !== "yes" || github.trim() !== "")
        );

      case 7:
        return formData.consentToShareData === true;
    }
  };

  const handleFinish = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("No se encontró el usuario logueado.");
      return;
    }

    const roleMapping: Record<string, string> = {
      frontend: "frontend",
      backend: "backend",
      fullstack: "fullstack",
      "full stack": "fullstack",
      mobile: "mobile",
      devops: "devops",
      data: "data",
    };

    const seniorityMap: Record<string, string> = {
      trainee: "tr",
      junior: "jr",
      semisenior: "ssr",
      senior: "sr",
    };

    try {
      const finalCvUrl = "https://mi-cv.com/archivo-subido.pdf"; // temporal

      const { linkStatus, portfolioLinks, ...restOfFormData } = formData;

      const rawRole = formData.targetRole.trim().toLowerCase();
      const finalRole = roleMapping[rawRole] || "fullstack";

      const payload = {
        ...restOfFormData,
        portfolioLinks,
        cvUrl: "https://mi-cv.com/archivo-subido.pdf",
        cvType: "file",
        targetRole: finalRole,
        seniority: seniorityMap[formData.seniority.toLowerCase()] || "jr",
      };

      const validRoles = [
        "frontend",
        "backend",
        "fullstack",
        "mobile",
        "devops",
        "data",
      ];
      if (!validRoles.includes(payload.targetRole)) {
        console.error("TargetRole inválido:", payload.targetRole);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        await response.json();
        alert("¡Perfil completado con éxito!");
      } else {
        await response.json();
      }
    } catch (error: any) {
      alert("Hubo un error al guardar tus datos: " + error.message);
    }
  };

  return (
    <div className="w-6xl flex flex-col py-10 px-6 space-y-20">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={step === 1 ? prevStep : prevStep}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          {step === 1 ? (
            <>
              <ChevronLeft size={16} /> Salir
            </>
          ) : (
            <>
              <ChevronLeft size={16} /> Atrás
            </>
          )}
        </button>

        <span className="text-gray-500 text-xs font-medium">{step} / 7</span>
      </div>

      <div className="h-1 w-full bg-white/5 rounded-full mb-12 overflow-hidden">
        <div
          className="h-full bg-purple-600 transition-all duration-500 shadow-[0_0_10px_rgba(147,51,234,0.5)]"
          style={{ width: `${(step / 7) * 100}%` }}
        />
      </div>
      {/* Paso dinámico */}
      <div className="flex-1 space-y-8">{renderStep()}</div>

      {/* Botón Continuar */}
      <div className="flex justify-end">
        <button
          onClick={nextStep}
          className={`group p-4 px-10 rounded-xl font-bold flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer ${
            !isStepValid()
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20"
          }`}
        >
          {step === 7 ? "Finalizar" : "Continuar"}
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </button>
      </div>
    </div>
  );
}
