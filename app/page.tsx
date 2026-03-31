"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
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
  useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  // Se o vídeo já carregou os metadados antes do React estar pronto
  if (video.readyState >= 1) { 
    handleLoadedMetadata();
  }

  // Fallback: se o vídeo demorar, garantimos que ele não fique travado
  // Algumas vezes o vídeo precisa de um "empurrão" para renderizar o primeiro frame
  video.currentTime = 0.001; 
  }, []);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  const eventDate = new Date("2026-09-17T17:30:00");
  const { days, hours, minutes, seconds } = useCountdown(eventDate);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Mágica para não travar: Transformar o vídeo em um Blob na memória
  useEffect(() => {
    let objectUrl = "";
    
    // Agora usando o vídeo re-renderizado com FFmpeg para scrubbing liso
    const loadVideo = async () => {
      try {
        const response = await fetch("/videos/gavel_scrub.mp4");
        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);
        if (videoRef.current) {
          videoRef.current.src = objectUrl;
          videoRef.current.load();
        }
      } catch (err) {
        console.error("Erro ao carregar o vídeo para o buffer", err);
      }
    };
    
    loadVideo();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    restDelta: 0.001
  });

let lastUpdate = 0;

useMotionValueEvent(smoothProgress, "change", (latest) => {
  if (!videoRef.current || duration === 0 || !isVideoLoaded) return;
  if (isMobile) return;
  const now = performance.now();
  if (now - lastUpdate < 30) return; // limita ~30fps

  lastUpdate = now;

  const targetTime = Math.min(
    duration,
    Math.max(0, latest * duration)
  );

  videoRef.current.currentTime += 
  (targetTime - videoRef.current.currentTime) * 0.2;
});

  const handleLoadedMetadata = () => {
  if (videoRef.current) {
    setDuration(videoRef.current.duration);
    setIsVideoLoaded(true);
    
    // Força o vídeo a se posicionar no início para evitar tela preta
    videoRef.current.currentTime = 0;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  return (
    <div className="relative min-w-full bg-[#05010a] text-zinc-100 font-sans selection:bg-[#ec4899] selection:text-white">
      
      {/* HEADER MODERN */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-2 bg-[#05010a]/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center cursor-pointer group">
          {/* Logotipo Oficial */}
          <div className="relative flex items-center justify-center transition-all duration-300 ease-out hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            <Image 
              src="/videos/images/logo.png" 
              alt="Logo Oficial OAB" 
              width={180} 
              height={50} 
              quality={100}
              priority
              className="object-contain h-10 w-auto transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
            />
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-xs font-semibold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors">O Evento</a>
          <a href="#" className="text-xs font-semibold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors">Programação</a>
          <a href="#" className="text-xs font-semibold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors">Local</a>
        </nav>
        <button className="group relative px-6 py-2 rounded-full text-xs font-bold tracking-widest text-white border border-[#ec4899]/50 bg-[#ec4899]/10 hover:bg-[#ec4899] transition-all uppercase shadow-[0_0_20px_-5px_rgba(236,72,153,0.3)] hover:shadow-[0_0_20px_0px_rgba(236,72,153,0.5)] cursor-default">
          Inscreva-se
          {/* Tooltip */}
          <span className="absolute top-full mt-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-900 text-zinc-200 text-xs whitespace-nowrap rounded-md border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl normal-case tracking-normal font-medium z-50">
            Inscrição em breve
          </span>
        </button>
      </header>

      {/* SCROLL-DRIVEN VIDEO HERO SECTION */}
      <div ref={containerRef} className="relative h-[400vh] w-full">
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#05010a]">
          
          {/* 1. LAYER: Video Container (Full screen width, object pushed to right) */}
          <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-[#05010a]">
            {/* O vídeo deve estar focado à direita em telas grandes */}
            <div className="absolute inset-0 w-full h-full lg:w-[70%] lg:left-auto lg:right-0">
              <video 
                ref={videoRef}
                src="/videos/gavel_scrub.mp4"
                className={`w-full h-full object-cover transition-opacity duration-1000 ${
                  isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                muted
                playsInline
                preload="auto" // Força o carregamento prévio
                onLoadedMetadata={handleLoadedMetadata}
              />
            </div>
            {/* Loading Indicator elegante com transition e fallback bonito para atraso de rede */}
            <AnimatePresence>
              {!isVideoLoaded && (
                <motion.div 
                  initial={{ opacity: 1, backdropFilter: "blur(10px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 1.5, ease: "easeInOut" } }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#05010a]/50 backdrop-blur-md overflow-hidden lg:w-[70%] lg:left-auto lg:right-0"
                >
                  <motion.div
                    animate={{ scale: [0.98, 1.02, 0.98], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(236,72,153,0.15)] bg-white/5">
                      <div className="w-8 h-8 border-2 border-transparent border-t-[#ec4899] border-b-[#00e6ff] rounded-full animate-spin" />
                    </div>
                    <span className="text-xs font-semibold tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-500 animate-pulse">
                      Iniciando Experiência
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Smooth transition gradients from dark left to video right - Esconde o lado esquerdo do vídeo perfeitamente */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#05010a] from-30% via-[#05010a]/80 to-transparent lg:w-[60%]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#05010a] via-transparent to-[#05010a]" />
          </div>

          {/* 2. LAYER: Background Mesh (Restricted via mask to fade out over the video smoothly) */}
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ maskImage: 'linear-gradient(to right, black 30%, transparent 60%)', WebkitMaskImage: 'linear-gradient(to right, black 30%, transparent 60%)' }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 w-[200vw] h-[200vh] -left-[50vw] -top-[50vh] bg-[linear-gradient(to_right,rgba(236,72,153,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,230,255,0.25)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [transform:perspective(100vh)_rotateX(60deg)_translateY(-100px)] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_20%,transparent_80%)]"
            >
              <div className="absolute inset-0 h-[200vh] w-[200vw] bg-gradient-to-b from-transparent via-[#00e6ff]/10 to-transparent animate-[scanline_8s_linear_infinite]" />
            </motion.div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
          </div>

          {/* 3. LAYER: Hero Typography (Contained in a Glassmorphism Box for max contrast "preto para o texto") */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left mt-20 p-8 md:p-10 rounded-[2.5rem] bg-[#05010a]/60 backdrop-blur-xl border border-white/5 shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              {/* Inner subtle glow for the elegant text box */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col w-full">
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[#ec4899] font-semibold text-sm md:text-base font-medium tracking-widest px-4 py-1.5 rounded-full border border-[#ec4899]/30 bg-[#ec4899]/10 backdrop-blur-sm shadow-[0_0_15px_-5px_rgba(236,72,153,0.4)]">
                      3ª EDIÇÃO
                    </span>
                    <span className="text-zinc-400 text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold">
                      Role a página para avançar
                    </span>
                  </div>
                  
                  <h1 className="text-6xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] font-bold tracking-[0.05em] leading-none font-tech flex flex-col items-start w-full drop-shadow-2xl">
                    <span className="relative text-white flex">
                      F
                      <span className="absolute left-[-2%] top-[30%] w-[50%] h-[12%] bg-[#05010a]" />
                      <span className="ml-[-1%]">UTU</span>
                    </span>
                    <span className="text-[#de299d] mt-2">LAW</span>
                  </h1>
                </motion.div>

                <motion.p variants={itemVariants} className="text-base md:text-lg text-zinc-300 font-light max-w-[35ch] leading-relaxed border-l-2 border-[#00e6ff] pl-5 opacity-90 mt-2">
                  Congresso de Gestão e de Inovação na Advocacia.
                  <br /><br />
                  A próxima revolução no direito já começou.
                </motion.p>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>

      {/* REMAINDER OF PAGE CONTENT */}
      <div className="relative z-20 w-full bg-[#05010a] pb-24 overflow-hidden">
        {/* Additional gradient separator */}
        <div className="w-full h-32 bg-gradient-to-b from-transparent to-[#05010a] -mt-32 relative z-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 flex flex-col items-center">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
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
                    <p className="text-zinc-200 text-sm font-medium tracking-wide">17 e 18/09</p>
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
                className="mt-10 group relative flex items-center gap-4 bg-zinc-100 text-zinc-950 px-8 py-4 rounded-full font-semibold tracking-wide transition-shadow hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.4)] cursor-default"
              >
                Inscreva-se Agora
                <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                {/* Tooltip */}
                <span className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-900 text-zinc-200 text-xs whitespace-nowrap rounded-md border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl normal-case tracking-normal font-medium z-50">
                  Inscrição em breve
                </span>
              </motion.button>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
