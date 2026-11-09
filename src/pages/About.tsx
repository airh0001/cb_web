import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Users, Target, Award, Globe, Linkedin } from "lucide-react";

const values = [
  { icon: Target, title: "Mission-Driven", desc: "Every project we take on is aligned with creating real business impact." },
  { icon: Users, title: "People First", desc: "We invest in our team so they can deliver their best work for you." },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards in code quality and design." },
  { icon: Globe, title: "Global Reach", desc: "Serving clients across 20+ countries with distributed, agile teams." },
];

const team = [
  { name: "Harit Garg", role: "Co-founder & CEO", bio: "Visionary leader driving innovation", linkedin: "https://www.linkedin.com/in/harit-garg1707/", image: "/harit.jpeg" },
  { name: "Mukesh Pal", role: "Co-founder & CTO", bio: "Technology architect and systems expert ", linkedin: "https://www.linkedin.com/in/mukprabhakar/", image: "https://res.cloudinary.com/dddmyjevn/image/upload/v1775017930/mukesh_russan_ambassi_mmnusg.jpg" },
  { name: "Harshit", role: "Co-founder & CMO", bio: "Marketing strategist and growth driver", linkedin: "https://www.linkedin.com/in/harshit-prajapati-9723b6311/", image: "/harshit.jpeg" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-tight text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <span className="text-sm text-primary font-bold uppercase tracking-[0.2em]">Our Story</span>
            <h1 className="font-heading text-4xl md:text-7xl font-extrabold mt-4 mb-6 tracking-tight drop-shadow-sm">
              Building the Future of <br className="hidden md:block" />
              <span className="gradient-text">Digital Innovation</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Founded in 2011, CODEBYT has grown from a specialized engineering team into a full-service technology powerhouse, trusted by ambitious startups and global enterprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card/50">
        <div className="container-tight">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Our <span className="gradient-text">Values</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center border border-border/50 hover:border-primary/40 hover:-translate-y-1 hover:shadow-glow transition-all duration-500 group"
              >
                <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <v.icon className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Leadership <span className="gradient-text">Team</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center hover:bg-white/[0.02] border border-border/50 hover:border-primary/40 hover:-translate-y-1 hover:shadow-glow transition-all duration-500 group"
              >
                <div className="h-20 w-20 rounded-full mx-auto mb-6 overflow-hidden group-hover:scale-110 transition-all duration-500">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover bg-gradient-to-br from-primary/20 to-accent/20"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground">{member.name}</h3>
                <p className="text-sm font-medium text-primary mt-1 mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>Connect on LinkedIn</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
