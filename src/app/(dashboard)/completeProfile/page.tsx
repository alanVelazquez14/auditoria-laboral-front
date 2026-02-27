// "use client";
// import { useState } from "react";
// import { ChevronLeft, Upload, CheckCircle2, ArrowRight } from "lucide-react";

// export default function ProfileWizard() {
//   const [step, setStep] = useState(1);
//   const [cvFile, setCvFile] = useState<File | null>(null);

//   // Estado para todos los datos del perfil
//   const [formData, setFormData] = useState({
//     location: "",
//     seniority: "",
//     targetRoles: "",
//     applicationType: "",
//     recentApplications: 0,
//     interviews: 0,
//     recentRejections: 0,
//   });

//   const nextStep = () => setStep((prev) => Math.min(prev + 1, 7));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

//   const inputClasses =
//     "w-full bg-[#1a1a24] border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none transition-all";

//   return (
//     <div className="max-w-5xl flex flex-col py-10 px-6 space-y-20">
//       {/* Header con Progreso */}
//       <div className="flex justify-between items-center mb-4">
//         <button
//           onClick={prevStep}
//           className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
//         >
//           <ChevronLeft size={16} /> Salir
//         </button>
//         <span className="text-gray-500 text-xs font-medium">{step} / 7</span>
//       </div>

//       {/* Barra de progreso superior */}
//       <div className="h-1 w-full bg-white/5 rounded-full mb-12 overflow-hidden">
//         <div
//           className="h-full bg-purple-600 transition-all duration-500 shadow-[0_0_10px_rgba(147,51,234,0.5)]"
//           style={{ width: `${(step / 7) * 100}%` }}
//         />
//       </div>

//       {/* Renderizado Dinámico de Pasos */}
//       <div className="flex-1 space-y-8">
//         {step === 1 && (
//           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//             <div className="bg-purple-600/10 p-3 rounded-xl w-fit">
//               <Upload className="text-purple-400" size={24} />
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold text-white mb-2">Tu CV</h2>
//               <p className="text-gray-400">
//                 Súbelo para que podamos analizarlo.
//               </p>
//             </div>

//             <label
//               className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all ${cvFile ? "border-cyan-500/50 bg-cyan-500/5" : "border-white/10 hover:border-purple-500/50 bg-[#111118]"}`}
//             >
//               <input
//                 type="file"
//                 className="hidden"
//                 accept=".pdf,.doc,.docx"
//                 onChange={(e) => setCvFile(e.target.files?.[0] || null)}
//               />
//               {cvFile ? (
//                 <>
//                   <CheckCircle2 className="text-cyan-400 mb-4" size={40} />
//                   <p className="text-cyan-400 font-bold">
//                     CV cargado correctamente
//                   </p>
//                   <p className="text-gray-500 text-xs mt-2">{cvFile.name}</p>
//                 </>
//               ) : (
//                 <>
//                   <Upload
//                     className="text-gray-500 mb-4 group-hover:text-purple-400 transition-colors"
//                     size={40}
//                   />
//                   <p className="text-white font-medium">
//                     Toca para subir tu CV
//                   </p>
//                   <p className="text-gray-500 text-xs mt-2">
//                     PDF, DOC o DOCX - Max 5MB
//                   </p>
//                 </>
//               )}
//             </label>

//             <div className="bg-[#1a1a24] p-4 rounded-xl border border-white/5">
//               <p className="text-purple-400/80 text-xs text-center">
//                 Este dato suele ser clave para detectar bloqueos invisibles.
//               </p>
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
//             <h2 className="text-3xl font-bold text-white">Ubicación</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm text-gray-400 mb-2 block">
//                   Ubicación
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Ej: Buenos Aires, Argentina"
//                   className={inputClasses}
//                   value={formData.location}
//                   onChange={(e) =>
//                     setFormData({ ...formData, location: e.target.value })
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Agrega aquí los pasos 3 a 7 siguiendo el mismo patrón... */}
//       </div>

//       {/* Botón Continuar */}
//       <div className="flex justify-end">
//         <button
//           onClick={nextStep}
//           disabled={step === 1 && !cvFile}
//           className={`group p-4 px-10 rounded-xl font-bold flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer ${
//             step === 1 && !cvFile
//               ? "bg-gray-800 text-gray-500 cursor-not-allowed"
//               : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20"
//           }`}
//         >
//           Continuar{" "}
//           <ArrowRight
//             size={18}
//             className="transition-transform duration-300 group-hover:translate-x-1.5"
//           />
//         </button>
//       </div>
//     </div>
//   );
// }

import ProfileWizard from "@/components/profile-wizard/ProfileWizard";

export default function CompleteProfilePage() {
  return (
    <main className="flex">
      <ProfileWizard />
    </main>
  );
}
