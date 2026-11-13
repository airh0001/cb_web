import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Activity, Layers, Cpu, Zap, ShieldCheck } from "lucide-react";

const HeroSection = () => {
  // Antigravity Typewriter headline sequence
  const line1Text = "Compile, Scale & Orchestrate";
  const line2Text = "Next-Gen Digital Infrastructure";
  const [typed1, setTyped1] = useState("");
  const [typed2, setTyped2] = useState("");
  const [done1, setDone1] = useState(false);
  const [done2, setDone2] = useState(false);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped1(line1Text.slice(0, i));
      if (i >= line1Text.length) {
        clearInterval(t);
        setDone1(true);
      }
    }, 32);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!done1) return;
    let j = 0;
    const t2 = setInterval(() => {
      j++;
      setTyped2(line2Text.slice(0, j));
      if (j >= line2Text.length) {
        clearInterval(t2);
        setDone2(true);
      }
    }, 32);
    return () => clearInterval(t2);
  }, [done1]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center section-padding pt-24 md:pt-32 pb-16 w-full overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center w-full"
        >
          {/* Centered Antigravity Orbiting Prism Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mb-5 flex items-center justify-center group"
          >
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/25 via-orange-500/25 to-amber-500/25 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-12 w-12 rounded-2xl border border-white/20 bg-card/80 backdrop-blur-2xl flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/80 animate-spin"
                  style={{ animationDuration: "14s" }}
                />
                <div
                  className="absolute inset-1 rounded-full border border-orange-400/80 animate-spin"
                  style={{ animationDuration: "9s", animationDirection: "reverse" }}
                />
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-blue-500 shadow-[0_0_10px_#f97316]" />
              </div>
            </div>
          </motion.div>

          {/* Majestic Antigravity Headline matching responsive curve */}
          <h1 className="font-heading text-2xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.12] mb-5 sm:mb-6 max-w-5xl mx-auto flex flex-col items-center px-2">
            {/* Line 1: Pure crisp white */}
            <span className="relative inline-flex items-center text-center py-0.5 text-white drop-shadow-[0_2px_14px_rgba(255,255,255,0.18)]">
              <span>{typed1}</span>
              {!done1 && (
                <span className="inline-block w-[3px] sm:w-[3.5px] h-[0.88em] ml-1.5 sm:ml-2 bg-blue-400 animate-pulse rounded-full shadow-[0_0_10px_#60a5fa]" />
              )}
            </span>

            {/* Line 2: Vibrant Google Antigravity Spectral Gradient */}
            <span className="relative inline-flex items-center text-center py-0.5 bg-gradient-to-r from-blue-500 via-orange-400 to-amber-300 bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(249,115,22,0.22)]">
              <span>{typed2}</span>
              {done1 && !done2 && (
                <span className="inline-block w-[3px] sm:w-[3.5px] h-[0.88em] ml-1.5 sm:ml-2 bg-orange-400 animate-pulse rounded-full shadow-[0_0_10px_#f97316]" />
              )}
            </span>

            {/* Line 3: Autonomous Neural Automation */}
            <span className="relative inline-flex items-center text-center py-0.5 text-base sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-foreground/85 mt-2">
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                With Autonomous Neural Automation
              </span>
              {done2 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.85, ease: "easeInOut" }}
                  className="inline-block w-[3px] sm:w-[3.5px] h-[0.8em] ml-2 bg-gradient-to-b from-blue-400 via-orange-400 to-amber-400 rounded-full shadow-[0_0_10px_#38bdf8]"
                />
              )}
            </span>
          </h1>

          {/* Antigravity Pill Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mt-2 mb-8 sm:mb-12"
          >
            {/* Primary Action Button (Google Antigravity Pill) */}
            <Link
              to="/contact"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 sm:px-9 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-[0_0_32px_-4px_rgba(37,99,235,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_42px_-4px_rgba(249,115,22,0.5)] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 45%, #ea580c 100%)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Initiate Project
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </Link>

            {/* Secondary Action Button (Frosted Glass Pill) */}
            <Link
              to="/portfolio"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl px-7 sm:px-9 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-foreground hover:bg-white/[0.12] hover:border-white/25 transition-all duration-300 hover:scale-105 shadow-md"
            >
              <Terminal size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span>Inspect Codebase</span>
            </Link>
          </motion.div>

          {/* Antigravity Metrics & Telemetry Dock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-card/45 backdrop-blur-2xl p-4 sm:p-6 md:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
          >
            {/* Top Status Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-border/40 gap-2 text-xs md:text-sm font-mono text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-foreground font-semibold tracking-wide text-[11px] sm:text-xs md:text-sm">
                  SYSTEM STATUS // OPERATIONAL
                </span>
              </div>
              <div className="flex items-center gap-3 sm:gap-3.5 text-[11px] sm:text-xs font-mono">
                <span className="flex items-center gap-1.5 text-foreground/80">
                  <Zap size={13} className="text-amber-400" />
                  12ms EDGE LATENCY
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-foreground/80">
                  <ShieldCheck size={13} className="text-blue-400" />
                  HIGH AVAILABILITY
                </span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
              {[
                { value: "150M+", label: "API Operations Handled", icon: Cpu },
                { value: "99.99%", label: "Cloud Service Uptime", icon: Activity },
                { value: "500k+", label: "Lines of Code Compiled", icon: Layers },
                { value: "<15ms", label: "Median Response Latency", icon: Zap },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-3 sm:p-4 flex flex-col items-center justify-center text-center transition-all hover:border-white/15 hover:bg-white/[0.04]"
                >
                  <div className="font-heading text-xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-orange-400 to-amber-300 bg-clip-text text-transparent drop-shadow-sm">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs md:text-sm text-muted-foreground mt-1 text-center font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Capability Chips */}
            <div className="mt-5 pt-4 border-t border-border/40 flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono text-muted-foreground">
              {[
                "MOBILE APPS (IOS & ANDROID)",
                "CUSTOM ERP & CRM SOFTWARE",
                "PERFORMANCE WEBSITES",
                "REAL-TIME INVENTORY TRACKERS",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.04] text-foreground/75"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
