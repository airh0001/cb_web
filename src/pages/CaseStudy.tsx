import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle, Globe } from "lucide-react";
import NotFound from "./NotFound";

type CaseStudyData = {
  slug: string;
  client: string;
  title: string;
  category: string;
  heroText: string;
  about: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  solution: string;
  results: string[];
  tech: string[];
  website?: string;
};

const caseStudies: Record<string, CaseStudyData> = {
  "oye-college": {
    slug: "oye-college",
    client: "OYe College",
    title: "OYe College E-Learning",
    category: "EdTech Platform",
    heroText: "Redefining Online Learning for 10,000+ Students Across India.",
    about: "OYe College is a leading educational platform in India providing high-quality digital learning resources to thousands of students, aiming to bridge the gap between traditional education and modern technology.",
    metrics: [
      { value: "200%", label: "Increase in Engagement" },
      { value: "10k+", label: "Active Students" },
      { value: "99.9%", label: "Platform Uptime" }
    ],
    challenge: "The client needed a highly scalable, interactive e-learning platform that could handle thousands of concurrent video streams, quizzes, and live classrooms without lag, especially on low-bandwidth networks in tier-2 and tier-3 cities.",
    solution: "We engineered a robust Next.js and Node.js architecture utilizing AWS cloud infrastructure. We implemented advanced CDN caching for video delivery, real-time WebSocket communication for live chat, and a highly responsive React frontend designed specifically for mobile-first users.",
    results: [
      "Successfully onboarded over 10,000 students within the first 3 months.",
      "Achieved a 200% increase in daily active user engagement.",
      "Reduced server costs by 40% through optimized content delivery networks.",
      "Implemented a secure, highly scalable microservices architecture."
    ],
    tech: ["Next.js", "Node.js", "AWS", "PostgreSQL", "Redis", "WebSockets"],
    website: "https://oyecollege.com/"
  },
  "rbs-tours": {
    slug: "rbs-tours",
    client: "RBS TOURS AND TRAVELS",
    title: "RBS Tours Automation",
    category: "Travel Software",
    heroText: "Automating Legacy Travel Systems to Scale Faster.",
    about: "RBS Tours and Travels is a premier travel agency offering custom travel packages and seamless booking experiences for over 50+ global destinations.",
    metrics: [
      { value: "150%", label: "More Bookings" },
      { value: "50+", label: "Global Destinations" },
      { value: "80%", label: "Time Saved on Admin" }
    ],
    challenge: "RBS Tours was relying on manual booking processes and legacy software that couldn't keep up with their rapid growth, leading to double bookings and inefficient customer service workflows.",
    solution: "We built a custom automated booking engine using Python and GraphQL, integrated directly with external flight and hotel APIs, encased in a beautiful React dashboard for their internal team to manage tours effortlessly.",
    results: [
      "Automated 100% of the manual booking workflows.",
      "Increased successful bookings by 150% in the first quarter.",
      "Eliminated all double-booking errors through transactional database logic.",
      "Expanded seamlessly into 50+ new travel destinations."
    ],
    tech: ["React", "Python", "GraphQL", "Docker", "PostgreSQL"],
    website: "https://rbstourandtravels.in/"
  },
  "dry-fruits-delight": {
    slug: "dry-fruits-delight",
    client: "Dry Fruits Delight",
    title: "Dry Fruits Delight Headless Commerce",
    category: "E-Commerce",
    heroText: "A Lightning-Fast Headless E-Commerce Experience.",
    about: "Dry Fruits Delight is a premium quality dry fruits retailer operating nationwide, focused on delivering the freshest products directly to consumers.",
    metrics: [
      { value: "50k+", label: "Orders Processed" },
      { value: "1.2s", label: "Page Load Time" },
      { value: "35%", label: "Higher Conversion Rate" }
    ],
    challenge: "Their previous monolithic e-commerce platform was slow, difficult to manage, and couldn't handle high spikes in traffic during holiday seasons, severely impacting sales.",
    solution: "We migrated them to a headless commerce architecture using Next.js on the frontend and Stripe for seamless checkout operations, utilizing TailwindCSS to ensure a pixel-perfect, highly responsive UI.",
    results: [
      "Reduced average page load time from 4.5s to 1.2s.",
      "Successfully processed over 50,000 orders.",
      "Achieved a 99.9% uptime during peak holiday traffic spikes.",
      "Increased overall conversion rate by 35%."
    ],
    tech: ["Next.js", "Stripe", "TailwindCSS", "AWS", "Vercel"],
    website: "https://www.dryfruitsdelight.com/"
  }
};

const CaseStudy = () => {
  const { slug } = useParams();
  const data = caseStudies[slug as string];

  if (!data) return <NotFound />;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding pt-32 lg:pt-40 relative border-b border-border/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[128px] mix-blend-screen" />
        </div>
        
        <div className="container-tight relative z-10">
          <Button variant="ghost" size="sm" asChild className="mb-8 hover:bg-white/[0.05]">
            <Link to="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
            </Link>
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4 block">Case Study • {data.category}</span>
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-sm max-w-4xl">
              {data.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl leading-relaxed">
              {data.heroText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="py-12 border-b border-border/30 bg-card/30">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.metrics.map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center md:text-left border-l-2 border-primary/20 pl-6"
              >
                <div className="font-heading text-4xl font-bold gradient-text mb-2 drop-shadow-sm">{metric.value}</div>
                <div className="text-sm uppercase tracking-wider font-semibold text-muted-foreground">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-16">
            
            <div className="space-y-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-heading text-3xl font-bold mb-6">The Challenge</h2>
                <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p>{data.challenge}</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-heading text-3xl font-bold mb-6">Our Solution</h2>
                <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p>{data.solution}</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-heading text-3xl font-bold mb-6">The Results</h2>
                <ul className="space-y-4">
                  {data.results.map((result, i) => (
                    <li key={i} className="flex gap-4 items-start text-lg text-muted-foreground">
                      <CheckCircle className="text-primary mt-1 shrink-0" size={24} />
                      <span className="leading-relaxed">{result}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="glass-card rounded-2xl p-8">
                <h3 className="font-heading text-xl font-bold mb-4">About {data.client}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {data.about}
                </p>
                <div className="pt-6 border-t border-border/50">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {data.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs font-medium text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  {data.website && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground" 
                      asChild
                    >
                      <a href={data.website} target="_blank" rel="noopener noreferrer">
                        Visit Site <Globe className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 text-center">
                <h3 className="font-heading text-xl font-bold mb-4">Ready to scale your business?</h3>
                <p className="text-sm text-muted-foreground mb-6">Let's build a solution engineered for growth.</p>
                <Button variant="hero" className="w-full" asChild>
                  <Link to="/contact">Get in Touch <ArrowRight size={16} className="ml-2" /></Link>
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudy;
