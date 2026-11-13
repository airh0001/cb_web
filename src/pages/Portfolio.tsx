import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Globe } from "lucide-react";

const projects = [
  { 
    slug: "unitedtyre", 
    title: "United Tyre - CRM & Business Tracker", 
    category: "Custom ERP & CRM Software", 
    desc: "Complete business management CRM and real-time inventory tracker for United Tyre. Streamlines multi-location inventory, warehouse logistics, and automated billing.", 
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "Tailwind CSS", "Docker"], 
    website: "https://unitedtyre.in/",
    logo: "/clients/unitedtyre.png"
  },
  { 
    slug: "heesab-keetab", 
    title: "Heesab Keetab - Poultry App & Cloud ERP", 
    category: "Mobile App & Web ERP", 
    desc: "Comprehensive poultry farm management system featuring cross-platform mobile apps for field staff and web ERP for flock lifecycle, feed tracking, mortality logs, and accounting.", 
    tech: ["React Native", "Flutter", "Node.js", "FastAPI", "PostgreSQL", "Firebase"], 
    website: "https://heesabkeetab.com/",
    logo: "/clients/heesabkeetab.png"
  },
  { 
    slug: "tatva-agro-farms", 
    title: "Tatva Agro Farms - Agro ERP & Store", 
    category: "Custom Software & Modern Web", 
    desc: "End-to-end farm management portal and high-velocity digital storefront for mushroom cultivation. Provides harvest batch logs, automated dispatch, and D2C commerce.", 
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "AWS"], 
    website: "https://tatvaagrofarms.com/",
    logo: "/clients/tatvaagrofarms.png"
  },
  { 
    slug: "oye-college", 
    title: "OYe College E-Learning", 
    category: "EdTech Platform", 
    desc: "Built an exceptional online learning platform serving over 10,000 students across India. Increased student engagement by 200%.", 
    tech: ["Next.js", "Node.js", "AWS", "PostgreSQL", "Redis"], 
    website: "https://oyecollege.com/",
    logo: "https://oyecollege.com/assets/images/logo2.png"
  },
  { 
    slug: "rbs-tours", 
    title: "RBS Tours Automation", 
    category: "Travel Software", 
    desc: "Automated a legacy travel booking system. Increased customer bookings by 150% and expanded to 50+ destinations seamlessly.", 
    tech: ["React", "Python", "GraphQL", "Docker"], 
    website: "https://rbstourandtravels.in/",
    logo: "https://rbstourandtravels.in/assets/rbs_logo-Fp0bdru1.png"
  },
  { 
    slug: "dry-fruits-delight", 
    title: "Dry Fruits Delight", 
    category: "E-Commerce", 
    desc: "Headless commerce platform processing over 50,000 orders with a 99.9% uptime and outstanding customer satisfaction.", 
    tech: ["Next.js", "Stripe", "TailwindCSS", "AWS"], 
    website: "https://www.dryfruitsdelight.com/",
    logo: "https://static.wixstatic.com/media/c6b2f0_332d9aa4fb51435eae15f3c52b54e2cb~mv2.png/v1/fill/w_414,h_392,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c6b2f0_332d9aa4fb51435eae15f3c52b54e2cb~mv2.png"
  },
];

const Portfolio = () => {
  return (
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-tight text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <span className="text-sm text-primary font-bold uppercase tracking-[0.2em]">Our Selected Cases</span>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl font-extrabold mt-3 sm:mt-4 mb-4 sm:mb-6 tracking-tight drop-shadow-sm">
              Our <span className="gradient-text">Best Work</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Explore how we've engineered scalable solutions and transformative digital experiences for industry leaders.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-6 sm:pt-8">
        <div className="container-tight grid md:grid-cols-2 gap-5 sm:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl overflow-hidden group hover:border-primary/40 hover:-translate-y-1 hover:shadow-glow transition-all duration-500 border border-border/50"
            >
              <Link to={`/portfolio/${project.slug}`} className="block h-40 sm:h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 flex flex-col items-center justify-center relative overflow-hidden group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-500 cursor-pointer p-4 sm:p-6">
                <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {project.logo ? (
                  <div className="h-16 sm:h-20 max-w-[180px] sm:max-w-[220px] w-auto bg-white/95 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 relative z-10">
                    <img src={project.logo} alt={project.title} className="max-h-full max-w-full object-contain" />
                  </div>
                ) : (
                  <ExternalLink className="h-9 w-9 sm:h-10 sm:w-10 text-primary/40 group-hover:text-primary group-hover:scale-110 transition-all duration-500 relative z-10" />
                )}
                <span className="absolute bottom-2.5 sm:bottom-3 right-3 sm:right-4 text-xs text-primary/70 group-hover:text-primary flex items-center gap-1 font-medium transition-colors">
                  View Case Study <ArrowRight size={12} />
                </span>
              </Link>
              <div className="p-5 sm:p-8">
                <span className="text-xs text-primary font-bold uppercase tracking-wider">{project.category}</span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mt-2 mb-2.5 tracking-wide">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 sm:mb-6 leading-relaxed relative z-10">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs rounded-full border border-border/40 bg-secondary/30 px-3 py-1 text-muted-foreground font-medium">{t}</span>
                  ))}
                </div>
                {project.website !== "#" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground" 
                    asChild
                  >
                    <a href={project.website} target="_blank" rel="noopener noreferrer">
                      Visit Site <Globe className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight text-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Start Your Project <ArrowRight size={16} /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
