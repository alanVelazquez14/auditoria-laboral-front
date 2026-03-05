import { motion } from "framer-motion";

export function PillarCard({ icon, title, value, description, color }: any) {
  return (
    <div className="bg-card-bg border border-gray-800 p-6 rounded-2xl hover:border-gray-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-800/50 rounded-lg">{icon}</div>
          <h3 className="font-bold text-white text-lg">{title}</h3>
        </div>
        <span className="text-2xl font-mono font-bold" style={{ color }}>
          {Math.round(value)}%
        </span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {description}
      </p>
      {/* Barra de progreso simple */}
      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
