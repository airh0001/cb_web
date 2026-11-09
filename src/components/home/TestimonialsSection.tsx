import { motion } from "framer-motion";
import { Star } from "lucide-react";

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

const TestimonialsSection = () => {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-primary font-medium uppercase tracking-wider">Testimonials</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3">
            Loved by <span className="bg-gradient-to-r from-orange-400 to-primary bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(249,115,22,0.1)]">Industry Leaders</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
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
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed flex-1 mb-6 text-base relative z-10 italic">"{t.quote}"</p>
              <div className="border-t border-border/50 pt-6 mt-auto relative z-10">
                <div className="font-heading font-bold text-foreground text-lg tracking-wide">{t.name}</div>
                <div className="text-sm text-primary font-medium">{t.role}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
