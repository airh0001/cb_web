import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Globe } from "lucide-react";

const projects = [
  { slug: "oye-college", title: "OYe College E-Learning", category: "EdTech Platform", desc: "Built an exceptional online learning platform serving over 10,000 students across India. Increased student engagement by 200%.", tech: ["Next.js", "Node.js", "AWS", "PostgreSQL", "Redis"], website: "https://oyecollege.com/" },
  { slug: "rbs-tours", title: "RBS Tours Automation", category: "Travel Software", desc: "Automated a legacy travel booking system. Increased customer bookings by 150% and expanded to 50+ destinations seamlessly.", tech: ["React", "Python", "GraphQL", "Docker"], website: "https://rbstourandtravels.in/" },
  { slug: "dry-fruits-delight", title: "Dry Fruits Delight", category: "E-Commerce", desc: "Headless commerce platform processing over 50,000 orders with a 99.9% uptime and outstanding customer satisfaction.", tech: ["Next.js", "Stripe", "TailwindCSS", "AWS"], website: "https://www.dryfruitsdelight.com/" },
  { slug: "innovatelab-ai", title: "InnovateLab AI Tools", category: "Mobile / AI", desc: "Cross-platform mobile app with AI-powered recommendations, serving 500K+ active users globally.", tech: ["React Native", "TensorFlow", "Firebase"], website: "#" },
];

const Portfolio = () => {
  return (
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-tight text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <span className="text-sm text-primary font-bold uppercase tracking-[0.2em]">Our Selected Cases</span>
            <h1 className="font-heading text-4xl md:text-7xl font-extrabold mt-4 mb-6 tracking-tight drop-shadow-sm">
              Our <span className="gradient-text">Best Work</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Explore how we've engineered scalable solutions and transformative digital experiences for industry leaders.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-tight grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl overflow-hidden group hover:border-primary/40 hover:-translate-y-1 hover:shadow-glow transition-all duration-500 border border-border/50"
            >
              <Link to={`/portfolio/${project.slug}`} className="block h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex flex-col items-center justify-center relative overflow-hidden group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <ExternalLink className="h-10 w-10 text-primary/40 group-hover:text-primary group-hover:scale-110 transition-all duration-500 relative z-10" />
              </Link>
              <div className="p-8">
                <span className="text-xs text-primary font-bold uppercase tracking-wider">{project.category}</span>
                <h3 className="font-heading text-xl font-bold text-foreground mt-2 mb-3 tracking-wide">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed relative z-10">{project.desc}</p>
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
