import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden section-padding min-h-[90vh] flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[128px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/20 rounded-full blur-[128px] mix-blend-screen" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-8 font-mono"
          >
            <Sparkles size={14} className="text-orange-400" />
            <span>SYSTEM CONSOLE // AGENTIC AI & CORE ENGINE DEPLOYMENT</span>
          </motion.div>
 
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 drop-shadow-sm flex flex-col items-center">
            <span className="relative overflow-hidden inline-block py-1">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ ease: [0.215, 0.61, 0.355, 1], duration: 0.8, delay: 0.1 }}
                className="inline-block text-white"
              >
                Compile & Scale
              </motion.span>
            </span>
            <span className="relative overflow-hidden inline-block py-1">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ ease: [0.215, 0.61, 0.355, 1], duration: 0.8, delay: 0.25 }}
                className="inline-block bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(249,115,22,0.15)] animate-pulse-slow"
              >
                Digital Infrastructure
              </motion.span>
            </span>
            <span className="relative overflow-hidden inline-block py-1">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ ease: [0.215, 0.61, 0.355, 1], duration: 0.8, delay: 0.4 }}
                className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(59,130,246,0.15)]"
              >
                With Neural Automation
              </motion.span>
            </span>
          </h1>
 
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
          >
            We design high-throughput software architectures, integrate agentic LLM inference pipelines, and engineer low-latency web systems to accelerate your product's release velocity.
          </motion.p>
 
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Initiate Project <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/portfolio">Inspect Codebase</Link>
            </Button>
          </motion.div>
 
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-3xl mx-auto glass-card rounded-2xl p-6"
          >
            {[
              { value: "150M+", label: "API Operations Handled" },
              { value: "99.99%", label: "Cloud Service Uptime" },
              { value: "500k+", label: "Lines of Code Compiled" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center p-4">
                <div className="font-heading text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-primary to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">{stat.value}</div>
                <div className="text-sm text-foreground/80 mt-2 font-medium text-center">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
