import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Calendar, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { openCalendlyPopup } from "@/lib/calendly";

const ContactFormSection = () => {
  const [loading, setLoading] = useState(false);
  const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL || "https://formspree.io/f/maqpbrbk";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      console.log('Submitting form to:', FORMSPREE_URL);
      console.log('Form data:', data);
      
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        toast.success("Message sent! We'll get back to you within 24 hours.");
        e.currentTarget.reset();
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Formspree error:', errorData);
        toast.error(errorData.errors?.map((e: any) => e.message).join(', ') || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error(`Network error: ${error instanceof Error ? error.message : "Please check your connection and try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding bg-card/50" id="contact">
      <div className="container-tight">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <span className="text-sm text-primary font-bold uppercase tracking-[0.2em] mb-4 block">Contact Us</span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-6 tracking-tight drop-shadow-sm">
              Let's Start a <br className="hidden md:block" />
              <span className="gradient-text">Conversation</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-medium">
              Have a project in mind? Fill out the form and our team will respond within 24 hours.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, text: "Codebytdigital@gmail.com", href: "mailto:Codebytdigital@gmail.com" },
                { icon: Phone, text: "+91 97184 17771", href: "tel:+919718417771" },
                { icon: Phone, text: "+91 99250 97911", href: "tel:+919925097911" },
                { icon: MapPin, text: "India" },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  {href ? (
                    <a href={href} className="text-sm hover:text-primary transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm">{text}</span>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-border/30">
              <h3 className="font-heading font-semibold text-foreground mb-4">Want to talk immediately?</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  onClick={() => {
                    console.log('Opening Calendly popup...');
                    openCalendlyPopup('https://calendly.com/mukprabhakar/30min');
                  }}
                  className="cursor-pointer"
                >
                  <Calendar size={16} className="mr-2" /> Book a Discovery Call
                </Button>
                <Button variant="outline" className="border-green-500/20 text-green-500 hover:bg-green-500/10 hover:text-green-400" asChild>
                  <a href="https://wa.me/919718417771?text=Hi!%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={16} className="mr-2" /> WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-10 space-y-6 border border-border/50 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 ml-1">Full Name</label>
                <Input name="name" placeholder="John Doe" required className="bg-background/40 border-border/40 focus:bg-background/80 focus:ring-2 focus:ring-primary/30 h-12 rounded-xl transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 ml-1">Email Address</label>
                <Input name="email" placeholder="john@example.com" type="email" required className="bg-background/40 border-border/40 focus:bg-background/80 focus:ring-2 focus:ring-primary/30 h-12 rounded-xl transition-all" />
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 ml-1">Company (Optional)</label>
                <Input name="company" placeholder="Example Inc." className="bg-background/40 border-border/40 focus:bg-background/80 focus:ring-2 focus:ring-primary/30 h-12 rounded-xl transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 ml-1">Project Budget (Optional)</label>
                <Input name="budget" placeholder="$10k - $50k" className="bg-background/40 border-border/40 focus:bg-background/80 focus:ring-2 focus:ring-primary/30 h-12 rounded-xl transition-all" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80 ml-1">Tell us about your project</label>
              <Textarea name="message" placeholder="We are looking to build..." rows={5} required className="bg-background/40 border-border/40 focus:bg-background/80 focus:ring-2 focus:ring-primary/30 rounded-xl transition-all resize-none p-4" />
            </div>
            
            <Button type="submit" variant="hero" size="lg" className="w-full rounded-xl h-14 text-base font-bold shadow-glow mt-2" disabled={loading}>
              {loading ? "Sending..." : <>Send Message <Send size={18} className="ml-2" /></>}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
