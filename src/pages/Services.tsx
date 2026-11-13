import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Code, Smartphone, Brain, Cloud, Palette, BarChart3, Globe, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  { 
    icon: Smartphone, 
    title: "Mobile App Development", 
    desc: "Production-grade native and cross-platform mobile applications for iOS and Android engineered with modern architectures, seamless offline sync, and fluid 60fps animations.", 
    features: ["iOS & Android Apps", "React Native & Flutter", "Offline-First Sync", "App Store & Play Store CI/CD"] 
  },
  { 
    icon: Code, 
    title: "Custom ERP & CRM Software", 
    desc: "Bespoke enterprise resource planning (ERP) and customer relationship management (CRM) systems designed around your operational workflows, real-time inventory tracking, and multi-branch logistics.", 
    features: ["Real-time Inventory Trackers", "Multi-branch Workflow Automation", "GST & Invoicing Engines", "Custom Role-Based Portals"] 
  },
  { 
    icon: Globe, 
    title: "Custom Software & Modern Websites", 
    desc: "High-performance web applications and digital platforms built with Next.js, React, and TypeScript. Optimized for sub-second load times, dynamic search indexing, and resilient scaling.", 
    features: ["Modern Next.js & React Web", "High-Throughput SaaS Platforms", "Interactive Headless E-Commerce", "API & Webhook Integrations"] 
  },
  { 
    icon: Cloud, 
    title: "Cloud & Backend Infrastructure", 
    desc: "Scalable cloud-native architectures, low-latency API gateways, and distributed databases designed for 99.99% availability.", 
    features: ["Node.js & FastAPI Microservices", "PostgreSQL & Redis Caching", "Docker Containerization", "AWS & Cloudflare CDN"] 
  },
  { 
    icon: Brain, 
    title: "AI & Workflow Automation", 
    desc: "Automate complex business operations and data processing with integrated agentic LLM pipelines, computer vision, and predictive analytics.", 
    features: ["Workflow Automations", "Smart OCR & Document Extraction", "Predictive Analytics", "Custom AI Assistants"] 
  },
  { 
    icon: Palette, 
    title: "UI/UX & Liquid Design Systems", 
    desc: "User-centered visual systems and interactive design interfaces that elevate brand credibility and drive conversion.", 
    features: ["Design Systems & Prototypes", "Liquid Glass Aesthetics", "Responsive Mobile Layouts", "Usability Testing"] 
  },
];

const Services = () => {
  return (
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-tight text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <span className="text-sm text-primary font-bold uppercase tracking-[0.2em]">Our Services</span>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl font-extrabold mt-3 sm:mt-4 mb-4 sm:mb-6 tracking-tight drop-shadow-sm">
              Full-Spectrum <span className="gradient-text">Engineering</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              From concept to scale, we provide the architectural foundation and execution needed to dominate your digital market.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-6 sm:pt-8">
        <div className="container-tight space-y-4 sm:space-y-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl p-5 sm:p-8 md:p-10 border border-border/50 hover:border-primary/40 hover:-translate-y-1 hover:bg-white/[0.02] hover:shadow-glow transition-all duration-500 group"
            >
              <div className="flex flex-col md:flex-row gap-4 sm:gap-8 md:items-start">
                <div className="flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                  <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary group-hover:text-accent transition-colors" />
                </div>
                <div className="flex-1">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">{service.title}</h2>
                  <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{service.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((f) => (
                      <span key={f} className="text-xs font-semibold rounded-full border border-border/40 bg-secondary/30 px-3 py-1.5 text-muted-foreground group-hover:border-primary/20 transition-colors">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glow-border rounded-2xl p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Every business is unique. Let's discuss how we can tailor our services to your specific needs.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Get a Free Quote <ArrowRight size={16} /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
