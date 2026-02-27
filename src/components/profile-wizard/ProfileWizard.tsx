"use client";

import { useState } from "react";
import { ChevronLeft, ArrowRight } from "lucide-react";
import StepLocation from "./StepLocation";
import StepCV from "./StepCV";
import StepSeniority from "./StepSeniority";

export default function ProfileWizard() {
  const [step, setStep] = useState(1);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    location: "",
    seniority: "",
    targetRole: "",
    yearsExperience: "",
    applicationType: "",
    recentApplications: 0,
    interviews: 0,
    recentRejections: 0,
    isRoleOptimized: null as boolean | null,
    isOpenToRemote: null as boolean | null,
  });

  const nextStep = () => {
    if (!isStepValid()) return;
    setStep((prev) => Math.min(prev + 1, 7));
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
            isOpenToRemote={formData.isOpenToRemote}
            setIsOpenToRemote={(value) =>
              setFormData({ ...formData, isOpenToRemote: value })
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

      default:
        return null;
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
          formData.location.trim() !== "" && formData.isOpenToRemote !== null
        );

      case 3:
        return (
          formData.targetRole?.trim() !== "" &&
          formData.seniority !== "" &&
          formData.yearsExperience !== ""
        );

      default:
        return true;
    }
  };

  return (
    <div className="w-6xl flex flex-col py-10 px-6 space-y-20">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ChevronLeft size={16} /> Salir
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
          Continuar
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </button>
      </div>
    </div>
  );
}
