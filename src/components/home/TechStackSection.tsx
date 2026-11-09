import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, Database, Sparkles, RefreshCw } from "lucide-react";

const categories = [
  {
    id: "frontend",
    name: "Frontend Development",
    shortName: "Frontend Stacks",
    themeColor: "orange",
    icon: Globe,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    shadow: "shadow-[0_0_35px_rgba(249,115,22,0.15)]",
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#ffffff" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "HTML5", color: "#E34F26" },
      { name: "CSS3", color: "#1572B6" },
    ],
  },
  {
    id: "backend",
    name: "Backend & Core Engines",
    shortName: "Backend Stacks",
    themeColor: "violet",
    icon: Server,
    gradient: "from-violet-500 via-primary to-pink-500",
    shadow: "shadow-[0_0_35px_rgba(139,92,246,0.15)]",
    technologies: [
      { name: "Node.js", color: "#339933" },
      { name: "Python", color: "#3776AB" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Redis", color: "#DC382D" },
      { name: "GraphQL", color: "#E10098" },
      { name: "REST APIs", color: "#FF6C37" },
    ],
  },
  {
    id: "rest",
    name: "Specialized Tech Stacks",
    shortName: "Specialized Stacks",
    themeColor: "cyan",
    icon: Database,
    gradient: "from-cyan-400 via-sky-500 to-blue-500",
    shadow: "shadow-[0_0_35px_rgba(6,182,212,0.15)]",
    technologies: [
      { name: "AWS Cloud", color: "#FF9900" },
      { name: "Docker", color: "#2496ED" },
      { name: "Kubernetes", color: "#326CE5" },
      { name: "TensorFlow", color: "#FF6F00" },
      { name: "PyTorch", color: "#EE4C2C" },
      { name: "OpenAI API", color: "#ffffff" },
      { name: "React Native", color: "#61DAFB" },
      { name: "Flutter SDK", color: "#02569B" },
      { name: "Figma UI/UX", color: "#F24E1E" },
    ],
  },
];

const TechStackSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryClick = (catId: string) => {
    if (activeCategory === catId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(catId);
    }
  };

  const getParentBubblePosition = (catId: string) => {
    if (activeCategory === null) {
      // Idle state: spaced side-by-side or stacked on mobile
      if (catId === "frontend") return { x: isMobile ? 0 : -250, y: isMobile ? -140 : 0, scale: 1, opacity: 1 };
      if (catId === "backend") return { x: 0, y: 0, scale: 1, opacity: 1 };
      if (catId === "rest") return { x: isMobile ? 0 : 250, y: isMobile ? 140 : 0, scale: 1, opacity: 1 };
    }

    if (activeCategory === catId) {
      // Active parent: centered in the view
      return { x: 0, y: isMobile ? 30 : 0, scale: 1.15, opacity: 1 };
    }

    // Inactive sibling positions (moved to top corners as mini controls)
    const siblings = categories.filter((c) => c.id !== activeCategory);
    const sibIndex = siblings.findIndex((c) => c.id === catId);

    if (sibIndex === 0) {
      return { x: isMobile ? -90 : -230, y: isMobile ? -190 : -180, scale: 0.7, opacity: 0.5 };
    } else {
      return { x: isMobile ? 90 : 230, y: isMobile ? -190 : -180, scale: 0.7, opacity: 0.5 };
    }
  };

  const getActiveTechs = () => {
    return categories.find((c) => c.id === activeCategory)?.technologies || [];
  };

  const getActiveCategoryColor = () => {
    const active = categories.find((c) => c.id === activeCategory);
    if (!active) return "text-primary";
    if (active.themeColor === "orange") return "text-orange-400";
    if (active.themeColor === "violet") return "text-violet-400";
    return "text-cyan-400";
  };

  return (
    <section className="section-padding bg-gradient-to-b from-background to-card/30 overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-tr from-primary/5 via-orange-500/5 to-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-sm text-primary font-medium uppercase tracking-wider">Our Expertise</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 mb-4">
            Technologies We <span className="bg-gradient-to-r from-orange-400 to-primary bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(249,115,22,0.1)]">Master</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on any stack domain to execute a secure query and expand its component sub-bubbles in real-time.
          </p>
        </motion.div>

        {/* Dynamic status/help tooltip */}
        <div className="text-center mb-6 h-6 flex items-center justify-center font-mono text-[10px] sm:text-xs text-muted-foreground/60 tracking-wider">
          <AnimatePresence mode="wait">
            {activeCategory ? (
              <motion.button
                key="reset"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"
              >
                <RefreshCw size={12} className="animate-spin-slow" />
                <span>COLLAPSE CONSOLE SYSTEM</span>
              </motion.button>
            ) : (
              <motion.div
                key="guide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5"
              >
                <Sparkles size={12} className="text-orange-400" />
                <span>SELECT CORE MODULE TO EXPAND ORBITAL BUBBLES</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Bubble Solar System */}
        <div className="relative w-full h-[520px] md:h-[580px] flex items-center justify-center select-none overflow-visible">
          
          {/* Orbital grid lines (visible only when active) */}
          <AnimatePresence>
            {activeCategory && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.15, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute w-[240px] h-[240px] md:w-[360px] md:h-[360px] rounded-full border-2 border-dashed border-white pointer-events-none -z-10 animate-[spin_60s_linear_infinite]"
              />
            )}
          </AnimatePresence>

          {/* Sub-Option Technology Bubbles */}
          <AnimatePresence>
            {activeCategory && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {getActiveTechs().map((tech, index) => {
                  const techCount = getActiveTechs().length;
                  const angle = (index * 2 * Math.PI) / techCount;
                  
                  // Adjust radius based on counts and screen sizes
                  const baseRadius = isMobile ? 120 : 180;
                  const targetX = Math.cos(angle) * baseRadius;
                  const targetY = Math.sin(angle) * baseRadius;

                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                      animate={{
                        x: targetX,
                        // Apply a gentle floating y offset to create drifting sub-bubbles
                        y: [targetY - 5, targetY + 5, targetY - 5],
                        scale: 1,
                        opacity: 1,
                      }}
                      exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 85,
                        damping: 14,
                        x: { delay: index * 0.04 },
                        y: {
                          // Drifting float animation looping
                          repeat: Infinity,
                          duration: 3 + (index % 3),
                          ease: "easeInOut",
                        },
                      }}
                      className="absolute z-30 pointer-events-auto cursor-default"
                    >
                      <div className="glass-card rounded-full px-4 py-2 border border-white/10 hover:border-white/30 backdrop-blur-md shadow-lg flex items-center gap-2 whitespace-nowrap text-xs md:text-sm font-semibold select-none group transition-all duration-300 hover:scale-105">
                        <div
                          className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full filter drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]"
                          style={{ backgroundColor: tech.color }}
                        />
                        <span className="text-foreground group-hover:text-white transition-colors">
                          {tech.name}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>

          {/* Main Parent Domain Bubbles */}
          {categories.map((category) => {
            const pos = getParentBubblePosition(category.id);
            const IconComponent = category.icon;
            const isActive = activeCategory === category.id;
            const isDimmed = activeCategory !== null && !isActive;

            return (
              <motion.div
                key={category.id}
                initial={false}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  opacity: pos.opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 15,
                }}
                className={`absolute z-20 cursor-pointer ${category.shadow}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {/* Floating parent bubble frame */}
                <motion.div
                  animate={
                    !activeCategory 
                      ? { y: [0, -10, 0] } // Floating only when idle
                      : { y: 0 }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 4 + (category.id === "frontend" ? 0 : category.id === "backend" ? 1 : 2),
                    ease: "easeInOut",
                  }}
                  className={`w-32 h-32 md:w-44 md:h-44 rounded-full border border-white/10 bg-[#09090b]/40 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center select-none transition-all duration-300 hover:border-white/30 relative overflow-hidden group`}
                  style={{
                    borderColor: isActive ? (category.themeColor === "orange" ? "#f97316" : category.themeColor === "violet" ? "#8b5cf6" : "#06b6d4") : "",
                  }}
                >
                  {/* Subtle inner animated ring indicator */}
                  <div className={`absolute inset-2 rounded-full border border-dashed border-white/5 opacity-50 ${isActive ? "animate-[spin_20s_linear_infinite]" : "group-hover:animate-[spin_30s_linear_infinite]"}`} />
                  
                  {/* Icon */}
                  <IconComponent 
                    className={`h-8 w-8 md:h-12 md:w-12 mb-3 transition-transform duration-300 group-hover:scale-110`} 
                    style={{
                      color: category.themeColor === "orange" ? "#f97316" : category.themeColor === "violet" ? "#8b5cf6" : "#06b6d4"
                    }}
                  />
                  
                  {/* Title */}
                  <h3 className="font-heading text-xs md:text-sm font-bold text-foreground">
                    {category.shortName}
                  </h3>

                  {/* Context Helper Text */}
                  <p className="hidden md:block absolute bottom-4 text-[9px] font-mono text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isActive ? "CLOSE CORE" : "DECRYPT STACK"}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
