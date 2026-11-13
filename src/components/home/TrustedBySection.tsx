import { motion } from "framer-motion";

const clients = [
  {
    name: "United Tyre Group",
    logo: "/clients/unitedtyre.png",
    website: "https://unitedtyre.in",
    tagline: "Complete CRM & Tracker Software",
  },
  {
    name: "Tatva Agro Farms",
    logo: "/clients/tatvaagrofarms.png",
    website: "https://tatvaagrofarms.com",
    tagline: "Agro Farm Management & E-Commerce",
  },
  {
    name: "Heesab Keetab",
    logo: "/clients/heesabkeetab.png",
    website: "https://heesabkeetab.com",
    tagline: "Smart Poultry ERP & Mobile App",
  },
  {
    name: "OYe College",
    logo: "https://oyecollege.com/assets/images/logo2.png",
    website: "https://oyecollege.com",
    tagline: "EdTech Learning Platform",
  },
  {
    name: "RBS Tours & Travels",
    logo: "https://rbstourandtravels.in/assets/rbs_logo-Fp0bdru1.png",
    website: "https://rbstourandtravels.in",
    tagline: "Travel Booking & Automation Engine",
  },
];

const TrustedBySection = () => {
  return (
    <section className="py-10 sm:py-14 border-y border-white/10 bg-card/20 backdrop-blur-xl relative z-10">
      <div className="container-tight px-4">
        <p className="text-center text-[11px] sm:text-xs md:text-sm font-mono text-muted-foreground mb-6 sm:mb-8 uppercase tracking-widest">
          Trusted By Industry Leaders & High-Growth Companies
        </p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-10"
        >
          {clients.map((client) => (
            <a
              key={client.name}
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1.5 p-2.5 sm:p-4 rounded-2xl border border-white/5 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] backdrop-blur-lg transition-all duration-300 hover:scale-105 w-[calc(50%-0.5rem)] sm:w-auto"
            >
              <div className="h-11 sm:h-14 w-full sm:w-40 px-3 py-1.5 rounded-xl bg-white/[0.9] group-hover:bg-white border border-white/20 flex items-center justify-center transition-all shadow-sm">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain transition-all duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground/75 group-hover:text-muted-foreground transition-colors text-center truncate max-w-[130px] sm:max-w-none block">
                {client.tagline}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
