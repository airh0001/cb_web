import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Home,
  User,
  Briefcase,
  Layers,
  Users,
  Mail,
  Zap,
} from "lucide-react";

const navLinks = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: User },
  { label: "Services", path: "/services", icon: Briefcase },
  { label: "Portfolio", path: "/portfolio", icon: Layers },
  { label: "Clients", path: "/clients", icon: Users },
  { label: "Contact", path: "/contact", icon: Mail },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  // Auto-close on page navigation
  useEffect(() => {
    setIsOpen(false);
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Open immediately when cursor enters (Desktop only)
  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  // Graceful auto-close when cursor leaves
  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <>
      {/* Mobile Dimmed Backdrop Overlay (Click outside to close) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-40 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Floating Island Dynamic Liquid Glass Navbar */}
      <header className="fixed top-3.5 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        {/* ========================================================= */}
        {/* MOBILE VIEW (< md): Dynamic Island Expandable Capsule     */}
        {/* ========================================================= */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className={`md:hidden pointer-events-auto w-full max-w-sm sm:max-w-md border border-white/25 bg-[#08080c]/95 backdrop-blur-3xl shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.3)] relative overflow-hidden transition-all duration-200 ${
            isMobileOpen ? "rounded-3xl p-3" : "rounded-full py-1.5 px-3.5"
          }`}
        >
          {/* Ambient Glow behind capsule */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-orange-500/25 to-amber-500/20 blur-sm pointer-events-none -z-10 animate-pulse" />
          <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60" />

          {/* Top Header Row of Mobile Capsule */}
          <div className="relative z-10 flex items-center justify-between w-full">
            {/* Logo on Left */}
            <Link
              to="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center cursor-pointer py-0.5"
              title="CODEBYT Home"
            >
              <img
                src="/logo.png"
                alt="CODEBYT"
                className="h-9 sm:h-10 w-auto object-contain drop-shadow-[0_2px_8px_rgba(249,115,22,0.35)]"
              />
            </Link>

            {/* Menu / Close Button on Right */}
            {isMobileOpen ? (
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close Navigation Menu"
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white/15 hover:bg-white/20 border border-white/25 text-white font-mono text-xs font-semibold active:scale-95 transition-all cursor-pointer shadow-[0_0_12px_rgba(249,115,22,0.25)]"
              >
                <span className="tracking-wider text-orange-400 font-bold">CLOSE</span>
                <X size={16} className="text-orange-400" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open Navigation Menu"
                className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs font-semibold shadow-[0_0_15px_rgba(249,115,22,0.2)] active:scale-95 transition-all cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                </span>
                <span className="tracking-wider font-bold">MENU</span>
                <Menu size={16} className="text-orange-400" />
              </button>
            )}
          </div>

          {/* Expanded Content: Options List + CTA + Telemetry */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative z-10 flex flex-col pt-3"
              >
                {/* Thin glowing divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-2.5" />

                {/* The 6 Menu Options (100% Guaranteed High Contrast Visibility) */}
                <div className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto py-1 pr-0.5">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    const IconComponent = link.icon;

                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-150 active:scale-[0.98] ${
                          isActive
                            ? "border-orange-500/50 bg-orange-500/20 text-white font-bold shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                            : "border-white/10 bg-white/[0.05] text-white hover:text-white hover:bg-white/[0.1] hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`p-1.5 rounded-lg ${
                              isActive
                                ? "bg-orange-500/30 text-orange-400"
                                : "bg-white/10 text-orange-400"
                            }`}
                          >
                            <IconComponent size={16} />
                          </div>
                          <span className="font-heading font-semibold text-sm tracking-wide text-white">
                            {link.label}
                          </span>
                        </div>
                        <ArrowRight
                          size={14}
                          className={isActive ? "text-orange-400 opacity-100" : "text-white/40"}
                        />
                      </Link>
                    );
                  })}
                </div>

                {/* Bottom CTA Button & Telemetry */}
                <div className="flex flex-col gap-2 pt-2.5 mt-1.5 border-t border-white/10">
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileOpen(false)}
                    className="w-full py-2.5 rounded-xl font-semibold text-center text-white text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                    style={{
                      background:
                        "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #ea580c 100%)",
                    }}
                  >
                    <span>Initiate Project</span>
                    <ArrowRight size={14} />
                  </Link>

                  <div className="flex items-center justify-between text-[10px] font-mono text-white/70 px-1 pt-0.5">
                    <span className="flex items-center gap-1.5 text-white/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      OPERATIONAL
                    </span>
                    <span className="flex items-center gap-1 text-orange-400 font-semibold">
                      <Zap size={10} /> 12ms LATENCY
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ========================================================= */}
        {/* DESKTOP VIEW (>= md): Dynamic Hover-Stretching Island     */}
        {/* ========================================================= */}
        <motion.nav
          layout
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 27,
            mass: 0.75,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`hidden md:flex pointer-events-auto relative items-center rounded-full border border-white/25 shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.4),inset_0_-1px_1.5px_rgba(0,0,0,0.5),0_20px_45px_-12px_rgba(0,0,0,0.8)] backdrop-blur-3xl backdrop-saturate-[200%] overflow-hidden ${
            isOpen
              ? "py-2 px-5 bg-background/70 gap-6 w-full max-w-5xl justify-between"
              : "py-1.5 px-4 bg-background/60 cursor-pointer gap-3"
          }`}
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)",
          }}
        >
          {/* Subtle Ambient Refractive Glow around closed pill */}
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/25 via-orange-500/25 to-amber-500/25 blur-sm pointer-events-none animate-pulse"
            />
          )}

          {/* Liquid Glass Edge Reflection */}
          <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-70" />

          {/* 1. Left Section: Logo & Brand Title */}
          <div className="relative z-10 flex items-center gap-2 group flex-shrink-0">
            {/* The Logo */}
            <Link
              to="/"
              className="relative flex items-center justify-center cursor-pointer select-none py-0.5 px-0.5"
              title="CODEBYT Home"
            >
              <img
                src="/logo.png"
                alt="CODEBYT"
                className="h-10 sm:h-11 md:h-12 w-auto object-contain drop-shadow-[0_2px_10px_rgba(249,115,22,0.35)]"
              />
            </Link>

            {/* When CLOSED: Show the prominent interactive MENU ▾ indicator */}
            <AnimatePresence>
              {!isOpen && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  onClick={() => setIsOpen(true)}
                  className="flex items-center gap-2 pl-1 overflow-hidden cursor-pointer bg-transparent border-0"
                >
                  <span className="h-4 w-px bg-white/20" />
                  <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-white/90 tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                    </span>
                    <span className="text-white drop-shadow-sm font-semibold">MENU</span>
                    <ChevronDown size={14} className="text-orange-400 group-hover:translate-y-0.5 transition-transform" />
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Middle Section: Desktop Nav Links (Stretches open with fluid spring) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
                transition={{ duration: 0.22, delay: 0.05, ease: "easeOut" }}
                className="flex items-center gap-1 relative z-10"
              >
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const isHovered = hoveredPath === link.path;

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onMouseEnter={() => setHoveredPath(link.path)}
                      onMouseLeave={() => setHoveredPath(null)}
                      className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-150 rounded-full flex items-center gap-1.5 ${
                        isActive
                          ? "text-white font-semibold"
                          : "text-muted-foreground hover:text-white"
                      }`}
                    >
                      {/* Active Route Liquid Glass Glow */}
                      {isActive && (
                        <motion.div
                          layoutId="activeLiquidTab"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          className="absolute inset-0 rounded-full border border-white/20 bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_18px_rgba(249,115,22,0.18)] backdrop-blur-md"
                        />
                      )}

                      {/* Hover Sliding Pill */}
                      {isHovered && !isActive && (
                        <motion.div
                          layoutId="hoverLiquidTab"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/10"
                        />
                      )}

                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Right Action CTA Button & Close Toggle */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                transition={{ duration: 0.22, delay: 0.05, ease: "easeOut" }}
                className="relative z-10 flex items-center gap-2 flex-shrink-0"
              >
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-center rounded-full font-medium text-white overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105 px-5 py-2 text-sm whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #ea580c 100%)",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>Get Started</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </Link>

                {/* Close Button on Desktop */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  title="Close menu"
                  className="flex items-center justify-center h-8 w-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-muted-foreground hover:text-white transition-colors"
                >
                  <X size={15} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>
    </>
  );
};

export default Navbar;
