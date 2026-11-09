import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] glow-border p-12 md:p-24 text-center glass-card"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-cyan-500/5 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="font-heading text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-sm">
              Ready to Build Something <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-orange-400 via-primary to-pink-500 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(249,115,22,0.15)]">Extraordinary?</span>
            </h2>
            <p className="text-muted-foreground/90 max-w-xl mx-auto mb-10 text-xl font-medium">
              Join top-tier companies shifting their trajectory with our cutting-edge tech solutions.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Schedule a Free Consultation <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
