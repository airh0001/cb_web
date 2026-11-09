import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Requirements Parsing", desc: "We map out system parameters, define schema relationships, and structure backend contracts." },
  { num: "02", title: "Prototyping & Layouts", desc: "Visual designers wireframe interfaces, construct layout tokens, and assemble interactive flows." },
  { num: "03", title: "Compilation & Dev", desc: "Our developers compile structured, type-safe modules, integrate Unit tests, and build API layers." },
  { num: "04", title: "CI/CD & Monitoring", desc: "We build Docker containers, launch to serverless clouds, and run real-time telemetry checks." },
];

const ProcessSection = () => {
  return (
    <section className="section-padding bg-card/50">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-primary font-medium uppercase tracking-wider">Our Process</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3">
            How We <span className="bg-gradient-to-r from-orange-400 to-primary bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(249,115,22,0.1)]">Work</span>
          </h2>
        </motion.div>
 
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:bg-white/[0.02] hover:border-primary/30 hover:-translate-y-1 hover:shadow-glow transition-all duration-500">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
                <span className="font-heading text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-orange-500/40 to-primary/10 group-hover:from-orange-500 group-hover:to-primary transition-all duration-500">{step.num}</span>
                <h3 className="font-heading text-xl font-bold text-foreground mt-4 mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-gradient-to-r from-orange-400/20 to-primary/60 rounded-full" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
