import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/nav/Footer";
import { Hero } from "@/components/hero/Hero";
import { StackMarquee } from "@/components/skills/StackMarquee";
import { SawtSection } from "@/components/sawt/SawtSection";
import { About } from "@/components/about/About";
import { SkillsMatrix } from "@/components/skills/SkillsMatrix";
import { FeaturedBento } from "@/components/projects/FeaturedBento";
import { Timeline } from "@/components/experience/Timeline";
import { CertGrid } from "@/components/certifications/CertGrid";
import { Contact } from "@/components/contact/Contact";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StackMarquee />
        <SawtSection />
        <About />
        <SkillsMatrix />
        <FeaturedBento />
        <Timeline />
        <CertGrid />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
