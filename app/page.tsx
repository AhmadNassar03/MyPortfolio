import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/nav/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { SkillsMatrix } from "@/components/skills/SkillsMatrix";
import { FeaturedBento } from "@/components/projects/FeaturedBento";
import { Timeline } from "@/components/experience/Timeline";
import { CertGrid } from "@/components/certifications/CertGrid";
import { GithubFeed } from "@/components/projects/GithubFeed";
import { Contact } from "@/components/contact/Contact";

export const revalidate = 3600; // refresh GitHub feed hourly

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <SkillsMatrix />
        <FeaturedBento />
        <Timeline />
        <CertGrid />
        <GithubFeed />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
