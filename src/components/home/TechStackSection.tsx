import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, Smartphone, Sparkles, RefreshCw } from "lucide-react";

const categories = [
  {
    id: "mobile",
    name: "Mobile App Development",
    shortName: "Mobile Apps",
    themeColor: "orange",
    icon: Smartphone,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    shadow: "shadow-[0_0_35px_rgba(249,115,22,0.18)]",
    technologies: [
      { name: "React Native", color: "#61DAFB" },
      { name: "Flutter SDK", color: "#02569B" },
      { name: "Swift / iOS", color: "#F05138" },
      { name: "Kotlin / Android", color: "#7F52FF" },
      { name: "Expo Ecosystem", color: "#ffffff" },
      { name: "Firebase & APNs", color: "#FFCA28" },
    ],
  },
  {
    id: "erp",
    name: "Custom ERP & Business Software",
    shortName: "Custom ERP & Software",
    themeColor: "violet",
    icon: Server,
    gradient: "from-violet-500 via-primary to-pink-500",
    shadow: "shadow-[0_0_35px_rgba(139,92,246,0.18)]",
    technologies: [
      { name: "Node.js & NestJS", color: "#339933" },
      { name: "Python & FastAPI", color: "#3776AB" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Redis Caching", color: "#DC382D" },
      { name: "Docker & Microservices", color: "#2496ED" },
      { name: "GraphQL & REST", color: "#E10098" },
    ],
  },
  {
    id: "web",
    name: "High-Performance Websites",
    shortName: "Custom Websites",
    themeColor: "cyan",
    icon: Globe,
    gradient: "from-cyan-400 via-sky-500 to-blue-500",
    shadow: "shadow-[0_0_35px_rgba(6,182,212,0.18)]",
    technologies: [
      { name: "Next.js", color: "#ffffff" },
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "Vite Engine", color: "#646CFF" },
      { name: "AWS & Cloudflare", color: "#FF9900" },
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
      if (catId === "mobile") return { x: isMobile ? 0 : -250, y: isMobile ? -140 : 0, scale: 1, opacity: 1 };
      if (catId === "erp") return { x: 0, y: 0, scale: 1, opacity: 1 };
      if (catId === "web") return { x: isMobile ? 0 : 250, y: isMobile ? 140 : 0, scale: 1, opacity: 1 };
    }

    if (activeCategory === catId) {
      return { x: 0, y: isMobile ? 30 : 0, scale: 1.15, opacity: 1 };
    }

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
          <span className="text-sm text-primary font-medium uppercase tracking-wider">Our Core Capabilities</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 mb-4">
            Technologies We <span className="bg-gradient-to-r from-orange-400 to-primary bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(249,115,22,0.1)]">Master</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            We build mobile apps, custom ERP/CRM trackers, and high-performance software websites using industry-leading modern architectures.
          </p>
        </motion.div>

        {/* Dynamic status/help tooltip (Desktop only) */}
        <div className="hidden md:flex text-center mb-6 h-6 items-center justify-center font-mono text-[10px] sm:text-xs text-muted-foreground/60 tracking-wider">
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

        {/* ========================================================= */}
        {/* MOBILE VIEW (< md): Touch-Friendly Segmented Glass Deck   */}
        {/* ========================================================= */}
        <div className="md:hidden flex flex-col gap-5 mt-2">
          {/* Segment Selector */}
          <div className="flex p-1.5 rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl gap-1">
            {categories.map((cat) => {
              const isSelected = (activeCategory || "mobile") === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-all duration-300 relative cursor-pointer ${
                    isSelected
                      ? "text-white shadow-lg"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeMobileTechTab"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-xl border border-white/20 bg-gradient-to-br from-primary/30 to-accent/20 backdrop-blur-md"
                    />
                  )}
                  <Icon size={16} className={`relative z-10 ${isSelected ? "text-primary" : ""}`} />
                  <span className="relative z-10 font-heading text-[11px] leading-tight text-center">{cat.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Active Domain Card */}
          {(() => {
            const current = categories.find((c) => c.id === (activeCategory || "mobile"))!;
            const Icon = current.icon;

            return (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="glass-card rounded-3xl p-5 border border-white/15 shadow-xl relative overflow-hidden"
              >
                <div className="flex items-center gap-3.5 mb-4 pb-4 border-b border-white/10">
                  <div className="h-11 w-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-foreground">
                      {current.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      Production Engineering Stack
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {current.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-medium text-foreground/90 shadow-sm"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                        style={{ backgroundColor: tech.color }}
                      />
                      <span className="truncate">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })()}
        </div>

        {/* ========================================================= */}
        {/* DESKTOP VIEW (>= md): Interactive Bubble Solar System      */}
        {/* ========================================================= */}
        <div className="hidden md:flex relative w-full h-[520px] md:h-[580px] items-center justify-center select-none overflow-visible">
          
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
                  
                  const baseRadius = isMobile ? 120 : 180;
                  const targetX = Math.cos(angle) * baseRadius;
                  const targetY = Math.sin(angle) * baseRadius;

                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                      animate={{
                        x: targetX,
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
                          repeat: Infinity,
                          duration: 3 + (index % 3),
                          ease: "easeInOut",
                        },
                      }}
                      className="absolute z-30 pointer-events-auto cursor-default"
                    >
                      <div className="liquid-glass rounded-full px-4 py-2 border border-white/15 hover:border-white/35 backdrop-blur-xl shadow-lg flex items-center gap-2 whitespace-nowrap text-xs md:text-sm font-semibold select-none group transition-all duration-300 hover:scale-105">
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
                      ? { y: [0, -10, 0] }
                      : { y: 0 }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 4 + (category.id === "mobile" ? 0 : category.id === "erp" ? 1 : 2),
                    ease: "easeInOut",
                  }}
                  className={`w-36 h-36 md:w-48 md:h-48 rounded-full border border-white/15 bg-[#09090b]/50 backdrop-blur-xl flex flex-col items-center justify-center p-4 text-center select-none transition-all duration-300 hover:border-white/35 relative overflow-hidden group shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.25)]`}
                  style={{
                    borderColor: isActive ? (category.themeColor === "orange" ? "#f97316" : category.themeColor === "violet" ? "#8b5cf6" : "#06b6d4") : "",
                  }}
                >
                  <div className={`absolute inset-2 rounded-full border border-dashed border-white/10 opacity-60 ${isActive ? "animate-[spin_20s_linear_infinite]" : "group-hover:animate-[spin_30s_linear_infinite]"}`} />
                  
                  <IconComponent 
                    className={`h-8 w-8 md:h-12 md:w-12 mb-2 transition-transform duration-300 group-hover:scale-110`} 
                    style={{
                      color: category.themeColor === "orange" ? "#f97316" : category.themeColor === "violet" ? "#8b5cf6" : "#06b6d4"
                    }}
                  />
                  
                  <h3 className="font-heading text-xs md:text-sm font-bold text-foreground">
                    {category.shortName}
                  </h3>

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
