import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="container-tight px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="CODEBYT Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
              <span className="font-heading text-xl font-bold text-foreground">CODEBYT</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transforming businesses through innovative technology solutions and digital excellence.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Mobile Apps</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">AI & Automation</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Cloud & SaaS</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">UI/UX Design</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/clients" className="hover:text-primary transition-colors">Clients</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex flex-col gap-1">
                <a
                  href="mailto:Codebytdigital@gmail.com"
                  className="hover:text-primary transition-colors block"
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

        <div className="mt-12 border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 CODEBYT. All rights reserved.</p>
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-muted-foreground">
            <span>Made with ❤️ by </span>
            <a
              href="https://www.linkedin.com/in/mukprabhakar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary transition-colors font-medium"
            >
              Mukesh Pal
              <Linkedin className="h-3 w-3" />
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
