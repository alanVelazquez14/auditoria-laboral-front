"use client";
import PageTransition from "@/components/PageTransition";
import { ImpactCard } from "@/components/supportPage/ImpactCard";
import { PayPalButton } from "@/components/supportPage/PayPalButton";
import { TransparencyItem } from "@/components/supportPage/TransparencyItem";
import {
  Heart,
  Users,
  Shield,
  Sparkles,
  Lock,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SupportPage() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number | string | null>(
    1000,
  );
  const [isCustom, setIsCustom] = useState(false);
  const [currency, setCurrency] = useState<"ARS" | "USD">("ARS");

  const quickAmounts = [1000, 2500, 5000, 10000];

  const handleQuickSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
  };

  const handleCustomChange = (value: string) => {
    const numValue = value.replace(/\D/g, "");
    setSelectedAmount(numValue ? parseInt(numValue) : null);
    setIsCustom(true);
  };

  const handleMPPayment = async () => {
    if (!selectedAmount || Number(selectedAmount) <= 0) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: Number(selectedAmount) }),
        },
      );

      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Error en Mercado Pago:", error);
    }
  };

  return (
    <PageTransition>
      <div className="text-white flex flex-col items-center py-5">
        {/* Header */}
        <div className="flex flex-col items-center max-w-7xl mb-12">
          <div className="w-16 h-16 bg-card-bg border border-white/5 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
            <Heart
              size={32}
              className="text-brand-purple fill-brand-purple/20"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Con tu ayuda podemos ayudar a más personas
          </h1>
          <p className="text-gray-400 text-lg">
            Es gratuito y siempre lo será. Pero mantenerlo activo tiene costos
            reales.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl mb-16">
          <ImpactCard
            icon={Users}
            value="1.2K+"
            label="Personas diagnosticadas"
          />
          <ImpactCard icon={Shield} value="100%" label="Gratuito siempre" />
          <ImpactCard
            icon={Sparkles}
            value="87%"
            label="Mejoraron su búsqueda"
          />
        </div>

        {/* Payment Section */}
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Amount Selector */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-gray-500 uppercase">
              Elige un monto
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleQuickSelect(amount)}
                  className={`
                p-6 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1
                ${
                  !isCustom && selectedAmount === amount
                    ? "bg-brand-purple/10 border-brand-purple shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                    : "bg-card-bg border-white/5 hover:border-white/10"
                }
                `}
                >
                  <span className="text-2xl font-black">
                    ${amount.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-gray-500 font-bold uppercase">
                    ARS
                  </span>
                </button>
              ))}

              {/* Input de Monto Personalizado */}
              <div
                className={`
                col-span-2 p-4 rounded-2xl border transition-all flex items-center gap-2
                ${isCustom ? "bg-brand-purple/10 border-brand-purple shadow-[0_0_20px_rgba(124,58,237,0.05)]" : "bg-card-bg border-white/5"}
                `}
              >
                <span className="text-xl font-black text-gray-500 ml-2">$</span>
                <input
                  type="text"
                  placeholder="Otro monto..."
                  value={isCustom ? selectedAmount || "" : ""}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-xl font-black w-full placeholder:text-gray-700 placeholder:font-bold"
                />

                {/* Selector de Moneda */}
                <div className="relative border-l border-white/10 pl-2">
                  <select
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value as "ARS" | "USD");
                      setIsCustom(true);
                    }}
                    className="bg-transparent text-[10px] font-black text-gray-400 border-none focus:ring-0 cursor-pointer "
                  >
                    <option value="ARS" className="bg-card-bg">
                      ARS
                    </option>
                    <option value="USD" className="bg-card-bg">
                      USD
                    </option>
                  </select>
                  <ChevronDown
                    size={12}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Checkout & Transparency */}
          <div className="space-y-8">
            <div className="space-y-4">
              {currency === "ARS" ? (
                // BOTÓN MERCADO PAGO
                <button
                  onClick={handleMPPayment}
                  className="w-full bg-brand-purple hover:bg-[#6d28d9] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]"
                >
                  <Heart size={18} className="fill-white" />
                  Apoyar con ${Number(selectedAmount).toLocaleString()}
                </button>
              ) : (
                // BOTÓN PAYPAL (Aparece solo si elige USD)
                <div className="w-full">
                  <PayPalButton
                    amount={Number(selectedAmount)}
                    onSuccess={() => router.push("/support/success")}
                  />
                </div>
              )}
              <p className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Lock size={12} /> Pago seguro. Tu aporte es anónimo y
                voluntario.
              </p>
            </div>

            {/* Transparency Box */}
            <div className="bg-card-bg border border-white/5 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Transparencia
              </h4>
              <ul className="space-y-3">
                <TransparencyItem text="Cada peso se destina a mantener la plataforma gratuita" />
                <TransparencyItem text="No hay inversores ni intereses comerciales" />
                <TransparencyItem text="Tu aporte ayuda a desarrollar nuevas funcionalidades" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
