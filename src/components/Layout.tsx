import Navbar from "./Navbar";
import Footer from "./Footer";
import { MessageCircle } from "lucide-react";
import { InteractiveBackground } from "./InteractiveBackground";
import { motion } from "framer-motion";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
      transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
      className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-primary-foreground"
    >
      {/* Top tech laser scan transition bar */}
      <motion.div
        initial={{ width: "0%", left: "0%" }}
        animate={{ width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-orange-500 via-primary to-cyan-400 z-[9999] shadow-[0_0_10px_#f97316]"
      />

      <InteractiveBackground />
      
      <div className="relative z-10">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </div>
      
      {/* Floating WhatsApp Widget */}
      <a
        href="https://wa.me/919718417771?text=Hi!%20I'm%20interested%20in%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 hover:shadow-[0_0_40px_-10px_#25D366] transition-all duration-300 pointer-events-auto"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </motion.div>
  );
};

export default Layout;
