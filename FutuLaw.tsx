"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarBlank, MapPin, Handshake, ArrowRight, Clock } from "@phosphor-icons/react";

// --- HOOK: COUNTDOWN TIMER ---
const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};

// --- COMPONENT: LIQUID GLASS TIMER CARD ---
const TimeBlock = ({ label, value }: { label: string; value: number }) => (
  <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <span className="font-mono text-4xl md:text-5xl font-light text-white tracking-tighter">
      {value.toString().padStart(2, "0")}
    </span>
    <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mt-2">
      {label}
    </span>
  </div>
);

// --- MAIN PAGE COMPONENT ---
export default function FutuLawEventPage() {
  // Target: Oct 30, 2026, 08:00 AM
  const eventDate = new Date("2026-10-30T08:00:00");
  const { days, hours, minutes, seconds } = useCountdown(eventDate);

  const staggerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 100, damping: 20 } 
    },
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#05010a] text-zinc-100 overflow-hidden font-sans selection:bg-[#ec4899] selection:text-white">
      {/* BACKGROUND: NEON MESH / GLOWS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep cyan glow left */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#00e6ff]/10 blur-[120px]" 
        />
        {/* Deep magenta glow right */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-[#ec4899]/15 blur-[150px]" 
        />
        {/* Overlay Noise */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* CONTENT GRID (Asymmetric Layout Variance: 8) */}
      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center min-h-[100dvh]">
        
        {/* LEFT COLUMN: TYPOGRAPHY & CONTEXT */}
        <motion.div 
          variants={staggerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 flex flex-col justify-center items-start pt-12 md:pt-0"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00e6ff] animate-pulse" />
            <span className="text-sm font-medium tracking-wide text-zinc-300">2ª EDIÇÃO CONFIRMADA</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
            FUTU<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#b01060]">LAW</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-zinc-400 font-light max-w-[50ch] leading-relaxed mb-10">
            Seminário de Gestão e de Inovação para Escritórios de Advocacia. A intersecção definitiva entre direito, tecnologia e controladoria.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-12 w-full">
            <div className="flex items-center gap-4 border-l-2 border-[#16D9E3] pl-4">
              <CalendarBlank size={28} weight="light" className="text-[#16D9E3]" />
              <div>
                <p className="font-mono text-lg text-zinc-200 uppercase tracking-widest">30 & 31</p>
                <p className="text-zinc-500 text-sm font-semibold uppercase tracking-wider">Outubro</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 border-l-2 border-zinc-700 pl-4">
              <MapPin size={28} weight="light" className="text-zinc-400" />
              <div>
                <p className="font-mono text-lg text-zinc-200 tracking-widest">OAB</p>
                <p className="text-zinc-500 text-sm font-semibold uppercase tracking-wider">Maringá</p>
              </div>
            </div>
          </motion.div>

          {/* Magnetic-like CTA */}
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-between gap-6 bg-zinc-100 text-zinc-950 px-8 py-5 rounded-full font-semibold tracking-wide text-lg overflow-hidden transition-all hover:bg-white hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.4)]"
          >
            <span className="relative z-10 inline-flex items-center gap-3">
              Garantir Credencial <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>

        {/* RIGHT COLUMN: COUNTDOWN & PARTNERS */}
        <motion.div 
          variants={staggerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-5 flex flex-col gap-8 w-full"
        >
          {/* LIQUID GLASS CARD: COUNTDOWN */}
          <motion.div variants={itemVariants} className="w-full relative rounded-[2rem] p-8 bg-zinc-900/40 border border-white/5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <h3 className="text-lg font-medium text-zinc-300 flex items-center gap-3">
                <Clock size={24} weight="duotone" className="text-[#ec4899]" />
                Início do Evento
              </h3>
              <span className="font-mono text-sm text-[#00e6ff] px-3 py-1 bg-[#00e6ff]/10 rounded-full border border-[#00e6ff]/20">
                Lote 1 Aberto
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3 md:gap-4">
              <TimeBlock label="Dias" value={days} />
              <TimeBlock label="Horas" value={hours} />
              <TimeBlock label="Min." value={minutes} />
              <TimeBlock label="Seg." value={seconds} />
            </div>
          </motion.div>

          {/* LIQUID GLASS CARD: PARTNERS */}
          <motion.div variants={itemVariants} className="w-full relative rounded-[2rem] p-8 bg-white/[0.01] border border-white/5 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-zinc-800/50 border border-white/5">
                <Handshake size={28} weight="duotone" className="text-zinc-300" />
              </div>
              <h3 className="text-xl font-medium tracking-tight">Patrocinadores & Parceiros</h3>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Agradecemos aos nossos expositores pela confiança no futuro da gestão advocatícia.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {/* Fake Partner skeleton blocks to demonstrate layout */}
              <div className="h-10 w-24 rounded-lg bg-zinc-800/50 animate-pulse border border-white/5" />
              <div className="h-10 w-32 rounded-lg bg-zinc-800/50 animate-pulse border border-white/5" />
              <div className="h-10 w-20 rounded-lg bg-zinc-800/50 animate-pulse border border-white/5" />
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
