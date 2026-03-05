"use client";
import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* LOGO */}
        <div className="w-24 h-24 bg-brand-purple rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.3)]">
          <span className="text-white font-bold text-4xl">D</span>
        </div>
      </motion.div>

      <div className="mt-8 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-full h-full bg-brand-purple"
        />
      </div>

      <p className="mt-4 text-xs tracking-[0.2em] text-gray-500 uppercase font-medium">
        Iniciando DepurApp
      </p>
    </div>
  );
}
