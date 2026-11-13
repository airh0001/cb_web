import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-card/30 backdrop-blur-2xl relative z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
      <div className="container-tight px-4 py-10 sm:py-16">
        <div className="grid gap-8 sm:gap-12 grid-cols-2 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="CODEBYT Logo" className="h-12 md:h-14 w-auto object-contain drop-shadow-[0_2px_10px_rgba(249,115,22,0.35)]" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transforming businesses through innovative technology solutions and digital excellence.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-primary transition-colors">Mobile Apps</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Custom ERP & CRM</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Cloud & SaaS</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">AI & Automation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/clients" className="hover:text-primary transition-colors">Clients</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-heading font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Get in Touch</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li className="flex flex-col gap-1">
                <a
                  href="mailto:Codebytdigital@gmail.com"
                  className="hover:text-primary transition-colors block truncate"
                >
                  Codebytdigital@gmail.com
                </a>
                <a
                  href="mailto:harit@codebyt.in"
                  className="hover:text-primary transition-colors block"
                >
                  harit@codebyt.in
                </a>
              </li>
              <li>+91 97184 17771</li>
              <li>+91 99250 97911</li>
              <li>India</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 border-t border-border/50 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-muted-foreground">© 2026 CODEBYT. All rights reserved.</p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <span>Made with ❤️ by</span>
            <a
              href="https://www.linkedin.com/in/harshit-prajapati-9723b6311/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary transition-colors font-medium text-foreground/90"
            >
              Harshit Prajapati
              <Linkedin className="h-3 w-3 text-blue-400" />
            </a>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
