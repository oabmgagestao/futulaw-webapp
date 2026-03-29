"use client";

import React, { useState, useEffect } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { Handshake, CalendarBlank, MapPin, ArrowRight } from "@phosphor-icons/react";

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

// --- COMPONENT: LIQUID GLASS TIMER BLOCK ---
const TimeBlock = ({ label, value }: { label: string; value: number }) => (
  <div className="relative flex flex-col items-center justify-center p-4 md:p-6 rounded-[1.5rem] bg-white/[0.01] border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <span className="font-mono text-3xl md:text-5xl font-light text-white tracking-tighter">
      {value.toString().padStart(2, "0")}
    </span>
    <span className="text-[10px] md:text-xs font-semibold tracking-widest text-[#00e6ff] uppercase mt-2 opacity-80">
      {label}
    </span>
  </div>
);

// --- MAIN NEXT.JS PAGE ---
export default function FutuLawPage() {
  const eventDate = new Date("2026-10-30T08:00:00");
  const { days, hours, minutes, seconds } = useCountdown(eventDate);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#05010a] text-zinc-100 overflow-hidden font-sans selection:bg-[#ec4899] selection:text-white flex flex-col items-center">
      
      {/* 1. LAYER: TECHNICAL MESH (MALHA TECNOLÓGICA) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Perspective Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 w-[200vw] h-[200vh] -left-[50vw] -top-[50vh] bg-[linear-gradient(to_right,rgba(236,72,153,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,230,255,0.25)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [transform:perspective(100vh)_rotateX(60deg)_translateY(-100px)] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_20%,transparent_80%)]"
        />
        {/* Soft Noise Texture to prevent banding */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
      </div>

      {/* 2 & 3. LAYER: HERO CONTENT & NEON CIRCLE (Structurally Centered) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-24">
        
        {/* HERO SECTION: Circle + Typography perfectly aligned */}
        <div className="relative w-full flex flex-col items-center justify-center py-24 mb-8 mt-12">
          
          {/* Neon Tech Circle background - Let it stay behind but WITHOUT solid bg inside! */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] sm:w-[85vw] md:w-[70vw] max-w-[800px] aspect-square z-0 rounded-full border-[3px] border-transparent pointer-events-none"
            style={{
              background: 'linear-gradient(#05010a, #05010a) padding-box, linear-gradient(to top right, #00e6ff, #8b5cf6, #ec4899) border-box',
              boxShadow: '0 0 140px -20px rgba(236,72,153,0.3), inset 0 0 100px -20px rgba(0,230,255,0.1)'
            }}
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full"
          >
            {/* Typographic Core */}
            <motion.div variants={itemVariants} className="mb-4">
              {/* Using the Orbitron Google Font that closely mimics the "Square tech" look of FUTULAW */}
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] font-tech text-white">
                FUTU<span className="text-[#e22fa1]">L</span><span className="text-[#cd2891]">A</span><span className="text-[#b92182]">W</span>
              </h1>
              <div className="flex items-center justify-center gap-4 mt-8">
                <span className="text-[#ec4899] font-tech text-xl md:text-3xl font-light tracking-widest px-8 py-2 rounded-full relative">
                  <span className="opacity-90">2ª EDIÇÃO</span>
                </span>
              </div>
            </motion.div>

            {/* Subtext and Info Setup */}
            <motion.p variants={itemVariants} className="text-base md:text-xl text-zinc-400 font-light max-w-[60ch] leading-relaxed mt-8">
              Seminário de Gestão e de Inovação para Escritórios de Advocacia.
            </motion.p>
          </motion.div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-20 flex flex-col items-center w-full"
        >
          {/* Interactive Bento Row: Timer & Details */}
          <motion.div variants={itemVariants} className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
            
            {/* Countdown Master Card */}
            <div className="md:col-span-8 p-6 md:p-8 rounded-[2rem] bg-white/[0.015] border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_40px_-15px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
               <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#00e6ff] animate-pulse" />
                   <span className="text-sm font-semibold tracking-wide text-zinc-300 uppercase">Tempo Restante</span>
                 </div>
                 <span className="font-mono text-xs text-[#ec4899] px-3 py-1 bg-[#ec4899]/10 rounded-full border border-[#ec4899]/20">
                   30 e 31 de Outubro
                 </span>
               </div>
               <div className="grid grid-cols-4 gap-3 md:gap-4">
                 <TimeBlock label="Dias" value={days} />
                 <TimeBlock label="Horas" value={hours} />
                 <TimeBlock label="Min" value={minutes} />
                 <TimeBlock label="Seg" value={seconds} />
               </div>
            </div>

            {/* Event Meta Details Card */}
            <div className="md:col-span-4 p-6 md:p-8 flex flex-col justify-center rounded-[2rem] bg-white/[0.015] border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/5">
                  <MapPin size={24} weight="duotone" className="text-zinc-400" />
                </div>
                <div>
                  <p className="font-mono text-lg text-zinc-200 tracking-widest leading-none">OAB</p>
                  <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-1">Maringá</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/5">
                  <CalendarBlank size={24} weight="duotone" className="text-[#00e6ff]" />
                </div>
                <div>
                  <p className="text-zinc-200 text-sm font-medium tracking-wide">30 e 31/10</p>
                  <p className="text-zinc-500 text-xs mt-1">Programação Oficial</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Special Appretiation Row (Poster Reference) */}
          <motion.div variants={itemVariants} className="w-full mt-6 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 backdrop-blur-lg">
            <Handshake size={48} weight="light" className="text-zinc-300 mb-6" />
            <h2 className="text-xl md:text-2xl font-semibold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 max-w-2xl leading-snug">
              Agradecemos nossos patrocinadores, expositores e parceiros
            </h2>
            
            <p className="mt-4 text-sm text-zinc-500">Unindo inovação e tecnologia ao futuro do direito.</p>

            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 group relative flex items-center gap-4 bg-zinc-100 text-zinc-950 px-8 py-4 rounded-full font-semibold tracking-wide overflow-hidden transition-shadow hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.4)]"
            >
              Inscreva-se Agora
              <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
