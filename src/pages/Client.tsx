import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Users, Star, TrendingUp, Award, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const clients = [
  { 
    name: "OYe College", 
    industry: "Education Technology", 
    desc: "Innovative online learning platform connecting students with quality education across India", 
    logo: "https://oyecollege.com/assets/images/logo2.png",
    website: "https://oyecollege.com/",
    results: ["10K+ students", "500+ courses", "95% satisfaction"] 
  },
  { 
    name: "RBS TOURS AND TRAVELS", 
    industry: "Travel & Tourism", 
    desc: "Premium travel agency offering customized tour packages and unforgettable travel experiences", 
    logo: "https://rbstourandtravels.in/assets/rbs_logo-Fp0bdru1.png",
    website: "https://rbstourandtravels.in/",
    results: ["5K+ happy travelers", "50+ destinations", "4.9★ rating"] 
  },
  { 
    name: "Dry Fruits Delight", 
    industry: "E-commerce / Food", 
    desc: "Premium online store for high-quality dry fruits and nuts delivered fresh to your doorstep", 
    logo: "https://static.wixstatic.com/media/c6b2f0_332d9aa4fb51435eae15f3c52b54e2cb~mv2.png/v1/fill/w_414,h_392,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c6b2f0_332d9aa4fb51435eae15f3c52b54e2cb~mv2.png",
    website: "https://www.dryfruitsdelight.com/",
    results: ["50K+ orders", "Premium quality", "Pan-India delivery"] 
  },
  { 
    name: "Just Mewa", 
    industry: "E-commerce / Food", 
    desc: "Leading online retailer specializing in premium dry fruits, nuts, and healthy snacks", 
    logo: "https://justmewa.com/static/images/dry%20fruits%20logo.png",
    website: "https://justmewa.com/",
    results: ["100K+ customers", "Organic products", "Fast delivery"] 
  },
];

const stats = [
  { icon: Users, value: "5+", label: "Happy Clients" },
  { icon: Globe, value: "1+", label: "Countries Served" },
  { icon: Award, value: "98%", label: "Client Retention" },
  { icon: TrendingUp, value: "10M+", label: "Users Impacted" },
];

const testimonials = [
  {
    quote: "CODEBYT built an exceptional online learning platform for us. Student engagement increased by 200% and we now serve over 10,000 students across India.",
    name: "Shivam Gupta",
    role: "Founder, OYe College",
    stars: 5,
    company: "OYe College",
  },
  {
    quote: "Our travel booking system is now fully automated. Customer bookings increased by 150% and we've expanded to 50+ destinations seamlessly.",
    name: "Krishkant Bhardwaj",
    role: "Owner, RBS TOURS AND TRAVELS",
    stars: 5,
    company: "RBS TOURS AND TRAVELS",
  },
  {
    quote: "The e-commerce platform CODEBYT developed for us has been phenomenal. We've processed over 50,000 orders with 99.9% uptime and outstanding customer satisfaction.",
    name: "Priya Mehta",
    role: "CEO, Dry Fruits Delight",
    stars: 5,
    company: "Dry Fruits Delight",
  },
];

const Client = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-tight text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sm text-primary font-medium uppercase tracking-wider">Our Clients</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mt-3 mb-6">
              Trusted by <span className="gradient-text">Industry Leaders</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From ambitious startups to Fortune 500 companies, we partner with organizations that demand excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding pt-8 bg-card/50">
        <div className="container-tight">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="mx-auto h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Featured <span className="gradient-text">Clients</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-6 group hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <a href={client.website} target="_blank" rel="noopener noreferrer" className="h-14 w-14 rounded-xl bg-white flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity">
                    <img src={client.logo} alt={`${client.name} logo`} className="h-full w-full object-contain p-2" />
                  </a>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{client.name}</h3>
                    <p className="text-xs text-muted-foreground">{client.industry}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{client.desc}</p>
                <div className="space-y-2 mb-4">
                  {client.results.map((result) => (
                    <div key={result} className="flex items-center gap-2 text-xs">
                      <Zap className="h-3 w-3 text-primary" />
                      <span className="text-muted-foreground">{result}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground" 
                  asChild
                >
                  <a href={client.website} target="_blank" rel="noopener noreferrer">
                    Visit Site <Globe className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-card/50">
        <div className="container-tight">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
          >
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 flex flex-col h-full border border-border/50 hover:border-primary/40 hover:-translate-y-1 hover:shadow-glow relative overflow-hidden group transition-all duration-500"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Star size={64} className="fill-primary text-primary" />
                </div>
                <div className="flex gap-1 mb-6 relative z-10">
                  {Array.from({ length: testimonial.stars }).map((_, j) => (
                    <Star key={j} size={16} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed flex-1 mb-6 text-base relative z-10 italic">"{testimonial.quote}"</p>
                <div className="border-t border-border/50 pt-6 mt-auto relative z-10">
                  <div className="font-heading font-bold text-foreground text-lg tracking-wide">{testimonial.name}</div>
                  <div className="text-sm text-primary font-medium">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground mt-1">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
                Ready to Join Our Success Stories?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Let's discuss how we can help transform your business with cutting-edge technology solutions.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Start Your Project <ArrowRight size={16} /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Client;
