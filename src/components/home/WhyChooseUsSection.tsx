import { motion } from "framer-motion";
import { Shield, Rocket, Users, HeartHandshake } from "lucide-react";

const benefits = [
  { icon: Rocket, title: "Continuous Delivery", desc: "Robust automated pipeline structures and modern tooling to keep development velocity high." },
  { icon: Shield, title: "Zero-Trust Security", desc: "AES-256 data encryption at rest, secure API gateways, and rigorous repository vulnerability testing." },
  { icon: Users, title: "Embedded Stack Engineers", desc: "Senior software developers and interface architects fully integrated into your Git codebase." },
  { icon: HeartHandshake, title: "SLA Support & Scaling", desc: "Post-deployment service level agreements, uptime telemetries, and seamless framework upgrades." },
];

const WhyChooseUsSection = () => {
  return (
    <section className="section-padding bg-card/50">
      <div className="container-tight">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm text-primary font-medium uppercase tracking-wider">Why CODEBYT</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-6">
              Built by Engineers,<br />
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                Driven by Results
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We combine deep technical expertise with a relentless focus on business outcomes.
              Every solution we deliver is engineered to create measurable impact.
            </p>
            <div className="grid gap-6">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl hover:bg-white/[0.03] hover:border hover:border-primary/20 transition-all duration-300 border border-transparent cursor-default group"
                >
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <b.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground">{b.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <div className="h-3 w-3 rounded-full bg-accent" />
                <div className="h-3 w-3 rounded-full bg-primary" />
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-primary/10 rounded w-3/4" />
                <div className="h-4 bg-primary/5 rounded w-full" />
                <div className="h-4 bg-primary/10 rounded w-1/2" />
                <div className="h-8 bg-gradient-to-r from-orange-400/20 to-primary/20 rounded w-2/3 mt-4" />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="glass-card rounded-lg p-4 text-center">
                  <div className="font-heading text-2xl font-bold bg-gradient-to-r from-orange-400 to-primary bg-clip-text text-transparent">3x</div>
                  <div className="text-xs text-muted-foreground">Faster Delivery</div>
                </div>
                <div className="glass-card rounded-lg p-4 text-center">
                  <div className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">40%</div>
                  <div className="text-xs text-muted-foreground">Cost Savings</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
