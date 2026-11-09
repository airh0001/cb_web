import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [animationStep, setAnimationStep] = useState<"assemble" | "cursorMove" | "click" | "fade">("assemble");
  const [isClickRippleActive, setIsClickRippleActive] = useState(false);
  const [isOActive, setIsOActive] = useState(false);

  useEffect(() => {
    // Stage 1: Assemble symbol and letters (0s - 0.9s)
    
    // Stage 2: Move cursor to letter O (0.9s - 1.5s)
    const cursorTimer = setTimeout(() => {
      setAnimationStep("cursorMove");
    }, 900);

    // Stage 3: Click and ripple (1.5s - 2.3s)
    const clickTimer = setTimeout(() => {
      setAnimationStep("click");
      setIsClickRippleActive(true);
      setIsOActive(true);
    }, 1600);

    // Stage 4: Fade out welcome screen (2.4s - 3.2s)
    const fadeTimer = setTimeout(() => {
      setAnimationStep("fade");
    }, 2400);

    // Complete loader (3.2s)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(cursorTimer);
      clearTimeout(clickTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Framer Motion variants for flying components
  const slideInLeft = {
    hidden: { x: -80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 60, damping: 12 } }
  };

  const slideInRight = {
    hidden: { x: 80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 60, damping: 12 } }
  };

  const fadeInScale = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay: 0.3, duration: 0.5 } }
  };

  const letterVariants = (startX: number, startY: number, delay: number = 0) => ({
    hidden: { 
      x: startX, 
      y: startY, 
      opacity: 0,
      scale: 0.5
    },
    visible: { 
      x: 0, 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 14,
        duration: 0.8,
        delay: delay
      }
    }
  });

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#09090b]/80 backdrop-blur-md select-none overflow-hidden">
      
      {/* Dynamic scanlines overlay for retro-tech grid feel */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,6px_100%]" />
      
      {/* Subtle radial glow matching brand colors */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-gradient-to-tr from-primary/10 to-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Glassmorphic Panel Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative px-8 py-12 sm:px-16 sm:py-16 rounded-3xl border border-white/10 bg-[#09090b]/40 backdrop-blur-xl shadow-[0_0_80px_-20px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center overflow-hidden max-w-lg mx-4"
      >
        {/* Sleek tech corner bracket indicators */}
        <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-orange-500/40" />
        <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-cyan-500/40" />
        <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-cyan-500/40" />
        <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-orange-500/40" />

        {/* Diagonal high-tech line accent across card */}
        <div className="absolute top-0 right-0 w-24 h-px bg-gradient-to-r from-transparent to-cyan-500/30" />
        <div className="absolute bottom-0 left-0 w-24 h-px bg-gradient-to-r from-orange-500/30 to-transparent" />

        {/* Minimalist System Status Header */}
        <div className="flex items-center gap-2 mb-6 font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-cyan-400/80 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>ESTABLISHING SECURE CONNECTION</span>
          <span className="text-muted-foreground">//</span>
          <span className="text-orange-500 font-bold">V1.02</span>
        </div>

        {/* ========================================================================= */}
        {/* 1. TOP LOGO SYMBOL: < { 101... } >                                        */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-5 md:gap-7 mb-8 scale-90 sm:scale-100 select-none">
          {/* Left Brackets < { (Orange to Yellow Gradient) */}
          <motion.div 
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="flex items-center text-5xl sm:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 filter drop-shadow-[0_0_12px_rgba(249,115,22,0.2)]"
          >
            <span className="font-heading">&lt;</span>
            <span className="ml-1 font-mono">{`{`}</span>
          </motion.div>
          
          {/* Middle Binary Stack (Cyan/Blue) */}
          <motion.div 
            variants={fadeInScale}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center font-mono text-[8px] sm:text-[10px] leading-none text-cyan-400 gap-0.5 tracking-[0.25em] py-1 px-2 border-y border-white/5"
          >
            <span>101</span>
            <span>0 1</span>
            <span className="text-blue-400 font-bold">1011</span>
            <span>0 1</span>
            <span>101</span>
          </motion.div>

          {/* Right Brackets } > (Cyan to Blue Gradient) */}
          <motion.div 
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex items-center text-5xl sm:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 filter drop-shadow-[0_0_12px_rgba(6,182,212,0.2)]"
          >
            <span className="font-mono">{`}`}</span>
            <span className="ml-1 font-heading">&gt;</span>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TEXT LOGO: C O D E B Y T                                               */}
        {/* ========================================================================= */}
        <div className="relative flex items-center justify-center select-none mb-6">
          <div className="flex items-center gap-1.5 md:gap-3 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wider font-heading">
            
            {/* Letter C (Orange) */}
            <motion.span
              variants={letterVariants(-150, -80, 0.1)}
              initial="hidden"
              animate="visible"
              className="text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-orange-500 filter drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]"
            >
              C
            </motion.span>

            {/* Letter O (Special Interactive Click Target) */}
            <div className="relative flex items-center justify-center mx-1 sm:mx-2 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16">
              
              {/* Ripple Ring Effect on Click */}
              <AnimatePresence>
                {isClickRippleActive && (
                  <motion.div
                    initial={{ scale: 0.6, opacity: 1 }}
                    animate={{ scale: 3.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute rounded-full border-2 border-cyan-400 w-full h-full pointer-events-none shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                  />
                )}
              </AnimatePresence>

              {/* Styled Circle representing 'O' in Codebyt */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 10, delay: 0.3 }}
                className="relative flex items-center justify-center w-full h-full rounded-full border-2 sm:border-[3px]"
                style={{
                  borderColor: "#06b6d4", // Cyan color
                  boxShadow: isOActive 
                    ? "0 0 35px rgba(6, 182, 212, 0.7), inset 0 0 15px rgba(6, 182, 212, 0.4)" 
                    : "0 0 10px rgba(6, 182, 212, 0.15)",
                }}
              >
                {/* Circular dashes overlay */}
                <div className="absolute inset-0.5 rounded-full border border-dashed border-cyan-400/30 animate-[spin_12s_linear_infinite]" />
                
                {/* Core inside dot */}
                <motion.div 
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-cyan-400" 
                  animate={{
                    scale: isOActive ? [1, 1.4, 1.1] : 1,
                    backgroundColor: isOActive ? "#22d3ee" : "#0891b2"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* iconic cursor target pointing to O */}
              <AnimatePresence>
                {animationStep !== "assemble" && (
                  <motion.div
                    initial={{ x: 150, y: 150, opacity: 0 }}
                    animate={
                      animationStep === "cursorMove"
                        ? { x: 10, y: 10, opacity: 1 } // Land on O
                        : animationStep === "click"
                        ? { x: 10, y: 10, scale: 0.8, opacity: 1 } // Click
                        : { x: 10, y: 10, scale: 1.1, opacity: 0 } // Fly off / Fade
                    }
                    exit={{ opacity: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 90, 
                      damping: 14,
                      scale: { duration: 0.12 } 
                    }}
                    className="absolute z-10 bottom-0 right-0 pointer-events-none"
                  >
                    <svg
                      className="w-5 h-5 sm:w-8 sm:h-8 text-white fill-white stroke-cyan-500 stroke-[1.5] filter drop-shadow-[0_0_15px_rgba(6,182,212,0.9)]"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                      <path d="M13 13l6 6" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* D */}
            <motion.span
              variants={letterVariants(-120, 120, 0.15)}
              initial="hidden"
              animate="visible"
              className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            >
              D
            </motion.span>

            {/* E */}
            <motion.span
              variants={letterVariants(80, -120, 0.2)}
              initial="hidden"
              animate="visible"
              className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            >
              E
            </motion.span>

            {/* B */}
            <motion.span
              variants={letterVariants(120, 120, 0.25)}
              initial="hidden"
              animate="visible"
              className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            >
              B
            </motion.span>

            {/* Y */}
            <motion.span
              variants={letterVariants(40, -180, 0.3)}
              initial="hidden"
              animate="visible"
              className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            >
              Y
            </motion.span>

            {/* T */}
            <motion.span
              variants={letterVariants(100, 180, 0.35)}
              initial="hidden"
              animate="visible"
              className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            >
              T
            </motion.span>
          </div>
        </div>

        {/* System Loading Bar */}
        <div className="w-full flex flex-col items-center gap-2 mt-4 px-2">
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] text-muted-foreground uppercase">
            {isOActive ? "SECURE INSTANCE RUNNING" : "LOADING DIGITAL ENVIRONMENT"}
          </span>
          <div className="w-full h-[3px] bg-white/5 border border-white/10 overflow-hidden rounded-full relative">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-orange-500 via-cyan-400 to-blue-500"
            />
          </div>
        </div>
      </motion.div>
      
      {/* HUD footer designators outside card */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-8 flex flex-col items-center gap-1 font-mono text-[9px] text-muted-foreground/50 uppercase"
      >
        <span>SECURE HANDSHAKE // CODEBYT DIGITAL NETWORK</span>
        <span>ALL CHANNELS OPERATIONAL</span>
      </motion.div>
    </div>
  );
};
