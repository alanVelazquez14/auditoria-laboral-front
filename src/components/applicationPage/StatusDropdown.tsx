"use client";
import { useState } from "react";
import type { JobApplicationStatus } from "@/types/backend";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  APPLIED: { label: "Aplicada", color: "bg-purple-500/10 text-purple-400" },
  REVIEWING: { label: "En proceso", color: "bg-blue-500/10 text-blue-400" },
  INTERVIEW: { label: "Entrevista", color: "bg-cyan-500/10 text-cyan-400" },
  REJECTED: { label: "Rechazada", color: "bg-red-500/10 text-red-400" },
  HIRED: { label: "Oferta", color: "bg-green-500/10 text-green-400" },
};

export function StatusDropdown({
  currentStatus,
  onChange,
}: {
  currentStatus: string;
  onChange: (val: JobApplicationStatus) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const statusInfo = STATUS_MAP[currentStatus] || {
    label: currentStatus,
    color: "bg-gray-500/10 text-gray-400",
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all border border-white/5 hover:border-white/20 ${statusInfo.color}`}
      >
        {statusInfo.label}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 cursor-default"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          ></div>
          <div className="absolute left-0 mt-2 w-36 rounded-xl bg-card-bg border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 overflow-hidden cursor-pointer">
            <div className="py-1">
              {Object.entries(STATUS_MAP).map(([value, { label, color }]) => (
                <button
                  key={value}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(value as JobApplicationStatus);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-[11px] font-bold hover:bg-white/5 transition-colors cursor-pointer ${color.split(" ").find((c) => c.startsWith("text-"))}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
