import Layout from "@/components/Layout";
import ContactFormSection from "@/components/home/ContactFormSection";
import { motion } from "framer-motion";
import { useCalendly } from "@/lib/calendly";

const faqs = [
  { q: "How long does a typical project take?", a: "Most projects range from 6-16 weeks depending on scope. We provide detailed timelines during the discovery phase." },
  { q: "What's your pricing model?", a: "We offer both fixed-price and time-and-materials models. We'll recommend the best approach based on your project requirements." },
  { q: "Do you offer ongoing support?", a: "Yes! We provide maintenance plans, SLAs, and dedicated support teams for all our clients." },
  { q: "Can you work with our existing tech stack?", a: "Absolutely. We're technology-agnostic and can work with your current infrastructure or recommend optimal alternatives." },
];

const Contact = () => {
  // Load Calendly widget
  useCalendly();

  return (
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-tight text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <span className="text-sm text-primary font-bold uppercase tracking-[0.2em]">Get in Touch</span>
            <h1 className="font-heading text-4xl md:text-7xl font-extrabold mt-4 mb-6 tracking-tight drop-shadow-sm">
              Let's Build Something <br className="hidden md:block" />
              <span className="gradient-text">Great Together</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <ContactFormSection />

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-tight max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 hover:bg-white/[0.02] hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
              >
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-base">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
