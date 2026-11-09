import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import TrustedBySection from "@/components/home/TrustedBySection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ProcessSection from "@/components/home/ProcessSection";
import TechStackSection from "@/components/home/TechStackSection";
import CTASection from "@/components/home/CTASection";
import ContactFormSection from "@/components/home/ContactFormSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrustedBySection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <TechStackSection />
      <CTASection />
      <ContactFormSection />
    </Layout>
  );
};

export default Index;
