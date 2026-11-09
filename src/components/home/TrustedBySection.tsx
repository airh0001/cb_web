import { motion } from "framer-motion";

const logos = ["OYe College", "RBS Tours & Travels", "Dry Fruits Delight", "TechCorp", "InnovateLab"];

const TrustedBySection = () => {
  return (
    <section className="py-12 border-y border-border/30">
      <div className="container-tight px-4">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider">
          Trusted by innovative companies worldwide
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {logos.map((name) => (
            <span
              key={name}
              className="font-heading text-lg font-semibold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
