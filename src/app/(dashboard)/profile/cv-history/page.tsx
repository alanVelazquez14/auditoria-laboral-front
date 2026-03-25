"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { useSession } from "next-auth/react";
import CvVersions from "@/components/cvHistoryPage/CvVersions";

export interface EvolutionPoint {
  date: string;
  score: number;
  cvUrl?: string;
}

export interface ConversionPoint {
  score: number;
  efficiency: number;
  totalApplied: number;
}

export default function CvHistoryPage() {
  const { data: session } = useSession();
  const [evolutionData, setEvolutionData] = useState<EvolutionPoint[]>([]);
  const [conversionData, setConversionData] = useState<ConversionPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.accessToken) return;

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        };

        const [evol, conv] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cv-history/evolution`, {
            headers,
          }).then((res) => {
            if (!res.ok) throw new Error("Error en evolución");
            return res.json();
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cv-history/conversion`,
            { headers },
          ).then((res) => {
            if (!res.ok) throw new Error("Error en conversión");
            return res.json();
          }),
        ]);

        const dataFormateada = evol.map((item: any) => ({
          ...item,
          cvUrl: item.cvURL || item.cvUrl,
        }));

        setEvolutionData(dataFormateada);
        setConversionData(conv);
      } catch (error) {
        console.error("Error en la petición:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session]);

  return (
    <div className="p-8 max-w-8xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Análisis de Evolución
          </h1>
          <p className="text-gray-400 mt-1">
            Monitorea cómo cada mejora en tu CV impacta en tus resultados.
          </p>
        </div>
        <div className="bg-purple-600/10 border border-purple-500/20 rounded-2xl p-4 flex items-center gap-4">
          <div className="bg-purple-600 p-2 rounded-lg">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-purple-300 uppercase font-bold tracking-wider">
              Puntaje Máximo
            </p>
            <p className="text-2xl font-mono font-bold text-white">
              {evolutionData.length > 0
                ? `${Math.max(...evolutionData.map((d) => d.score))}%`
                : "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico de Evolución de Score */}
        <div className="lg:col-span-2 bg-[#0a0a0f] border border-white/5 rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">
            Progreso del Score ATS
          </h3>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolutionData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ffffff05"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(str) => new Date(str).toLocaleDateString()}
                />
                <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0a0a0f",
                    border: "1px solid #ffffff10",
                    borderRadius: "12px",
                  }}
                  itemStyle={{ color: "#a855f7" }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{
                    r: 6,
                    fill: "#a855f7",
                    strokeWidth: 2,
                    stroke: "#0a0a0f",
                  }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Conversión */}
        <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">
            Eficiencia por Versión
          </h3>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
                <XAxis
                  dataKey="score"
                  stroke="#6b7280"
                  fontSize={12}
                  label={{
                    value: "Score CV",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <Tooltip
                  cursor={{ fill: "#ffffff05" }}
                  contentStyle={{
                    backgroundColor: "#0a0a0f",
                    border: "1px solid #ffffff10",
                  }}
                />
                <Bar
                  dataKey="efficiency"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="Eficiencia %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lista de Versiones */}
      <CvVersions evolutionData={evolutionData} />
    </div>
  );
}
